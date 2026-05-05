const Issue = require('../models/Issue');
const Department = require('../models/Department');
const Notification = require('../models/Notification');
const { uploadImage } = require('../services/cloudinaryService');
const { analyzeIssuePhoto } = require('../services/geminiService');

// @desc    Create a new issue
// @route   POST /api/issues
const createIssue = async (req, res, next) => {
  try {
    const { latitude, longitude, ward } = req.body;
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Image is required' });
    }

    // 1. Upload to Cloudinary
    const { photoUrl, thumbnailUrl } = await uploadImage(req.file.buffer);

    // 2. Call Gemini for analysis
    const aiAnalysis = await analyzeIssuePhoto(photoUrl);

    // 3. Duplicate check (50 meters radius)
    const existingIssue = await Issue.findOne({
      category: aiAnalysis.category,
      status: { $ne: 'resolved' },
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [lng, lat] },
          $maxDistance: 50,
        },
      },
    });

    if (existingIssue) {
      return res.status(200).json({ duplicate: true, existingIssue });
    }

    // 4. Fetch Department for SLA hours
    const dept = await Department.findOne({ name: aiAnalysis.suggested_department });
    const slaHours = dept ? dept.slaHours : 48; // Default 48h
    const slaDue = new Date(Date.now() + slaHours * 60 * 60 * 1000);

    // 5. Create Issue
    const issue = await Issue.create({
      photoUrl,
      thumbnailUrl,
      location: { type: 'Point', coordinates: [lng, lat] },
      category: aiAnalysis.category,
      severity: aiAnalysis.severity,
      aiDescription: aiAnalysis.description,
      ward,
      department: dept ? dept._id : null,
      reportedBy: req.user ? req.user.id : null,
      slaDue,
    });

    // 6. Socket.io emit
    const io = req.app.get('io');
    if (io) {
      io.emit('issue:new', issue);
    }

    res.status(201).json(issue);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all issues with filters
// @route   GET /api/issues
const getIssues = async (req, res, next) => {
  try {
    const { status, category, ward, department, page = 1, limit = 20 } = req.query;
    
    const filter = {};
    if (status) filter.status = status;
    if (category) filter.category = category;
    if (ward) filter.ward = ward;
    if (department) filter.department = department;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const totalCount = await Issue.countDocuments(filter);
    const issues = await Issue.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('department', 'name');

    res.json({
      success: true,
      totalCount,
      page: parseInt(page),
      issues,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single issue
// @route   GET /api/issues/:id
const getIssueById = async (req, res, next) => {
  try {
    const issue = await Issue.findById(req.params.id)
      .populate('reportedBy', 'name')
      .populate('department', 'name');

    if (!issue) return res.status(404).json({ success: false, message: 'Issue not found' });

    res.json(issue);
  } catch (error) {
    next(error);
  }
};

// @desc    Update issue status (Authority only)
// @route   PATCH /api/issues/:id/status
const updateIssueStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const issue = await Issue.findById(req.params.id);
    if (!issue) return res.status(404).json({ success: false, message: 'Issue not found' });

    issue.status = status;
    if (status === 'resolved') {
      issue.resolvedAt = new Date();
    }
    await issue.save();

    const io = req.app.get('io');
    if (io) {
      io.emit('issue:statusUpdate', { id: issue._id, status });
    }

    // Notify reporter
    if (issue.reportedBy) {
      const notification = await Notification.create({
        userId: issue.reportedBy,
        issueId: issue._id,
        message: `Your reported issue for "${issue.category}" has been updated to ${status}.`,
      });

      if (io) {
        io.to(issue.reportedBy.toString()).emit('notification:new', notification);
      }
    }

    res.json(issue);
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle upvote
// @route   PATCH /api/issues/:id/upvote
const upvoteIssue = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const issue = await Issue.findById(req.params.id);
    if (!issue) return res.status(404).json({ success: false, message: 'Issue not found' });

    const isUpvoted = issue.upvoterIds.includes(userId);

    if (isUpvoted) {
      issue.upvoterIds.pull(userId);
      issue.upvoteCount -= 1;
    } else {
      issue.upvoterIds.push(userId);
      issue.upvoteCount += 1;
    }

    await issue.save();
    res.json({ upvoteCount: issue.upvoteCount });
  } catch (error) {
    next(error);
  }
};

// @desc    Get nearby issues
// @route   GET /api/issues/nearby
const getIssuesNearby = async (req, res, next) => {
  try {
    const { lat, lng, radius = 500 } = req.query;

    const issues = await Issue.find({
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: parseInt(radius),
        },
      },
    }).limit(50);

    res.json(issues);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createIssue,
  getIssues,
  getIssueById,
  updateIssueStatus,
  upvoteIssue,
  getIssuesNearby,
};
