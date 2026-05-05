const Comment = require('../models/Comment');
const User = require('../models/User');

// @desc    Add a comment
// @route   POST /api/comments
const addComment = async (req, res, next) => {
  try {
    const { issueId, text, isAnonymous } = req.body;
    const authorId = isAnonymous ? null : req.user.id;
    
    let authorName = 'Anonymous';
    if (!isAnonymous && req.user) {
      const user = await User.findById(req.user.id);
      authorName = user.name;
    }

    const comment = await Comment.create({
      issueId,
      authorId,
      authorName,
      text,
    });

    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all comments for an issue
// @route   GET /api/comments/:issueId
const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ issueId: req.params.issueId })
      .sort({ createdAt: 1 });
    res.json(comments);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a comment
// @route   DELETE /api/comments/:id
const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ success: false, message: 'Comment not found' });

    // Auth check: Author or Authority
    if (comment.authorId?.toString() === req.user.id || req.user.role === 'authority') {
      await comment.deleteOne();
      return res.json({ success: true, message: 'Comment deleted' });
    }

    res.status(403).json({ success: false, message: 'Not authorized to delete this comment' });
  } catch (error) {
    next(error);
  }
};

module.exports = { addComment, getComments, deleteComment };
