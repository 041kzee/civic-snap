const Department = require('../models/Department');
const Issue = require('../models/Issue');

// @desc    Get all departments
// @route   GET /api/departments
const getDepartments = async (req, res, next) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (error) {
    next(error);
  }
};

// @desc    Create department
// @route   POST /api/departments
const createDepartment = async (req, res, next) => {
  try {
    const dept = await Department.create(req.body);
    res.status(201).json(dept);
  } catch (error) {
    next(error);
  }
};

// @desc    Update department
// @route   PATCH /api/departments/:id
const updateDepartment = async (req, res, next) => {
  try {
    const dept = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(dept);
  } catch (error) {
    next(error);
  }
};

// @desc    Reassign issue to different department
// @route   PATCH /api/departments/reassign/:issueId
const assignIssueToDepartment = async (req, res, next) => {
  try {
    const { departmentId } = req.body;
    const issue = await Issue.findById(req.params.issueId);
    if (!issue) return res.status(404).json({ success: false, message: 'Issue not found' });

    const dept = await Department.findById(departmentId);
    if (!dept) return res.status(404).json({ success: false, message: 'Department not found' });

    issue.department = dept._id;
    // Recalculate SLA based on new department's slaHours
    const slaHours = dept.slaHours || 48;
    issue.slaDue = new Date(issue.createdAt.getTime() + slaHours * 60 * 60 * 1000);
    
    await issue.save();
    res.json(issue);
  } catch (error) {
    next(error);
  }
};

module.exports = { getDepartments, createDepartment, updateDepartment, assignIssueToDepartment };
