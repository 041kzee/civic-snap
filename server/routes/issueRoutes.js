const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  createIssue,
  getIssues,
  getIssueById,
  updateIssueStatus,
  upvoteIssue,
  getIssuesNearby,
} = require('../controllers/issueController');
const protect = require('../middleware/auth');
const requireRole = require('../middleware/roleGuard');

// Multer setup (memory storage)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Public Routes
router.get('/', getIssues);
router.get('/nearby', getIssuesNearby);
router.get('/:id', getIssueById);

// Protected Routes (Citizen)
router.post('/', protect, requireRole('citizen'), upload.single('image'), createIssue);
router.patch('/:id/upvote', protect, requireRole('citizen'), upvoteIssue);

// Protected Routes (Authority)
router.patch('/:id/status', protect, requireRole('authority'), updateIssueStatus);

module.exports = router;
