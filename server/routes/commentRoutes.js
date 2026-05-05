const express = require('express');
const router = express.Router();
const { addComment, getComments, deleteComment } = require('../controllers/commentController');
const protect = require('../middleware/auth');

router.post('/', protect, addComment);
router.get('/:issueId', getComments);
router.delete('/:id', protect, deleteComment);

module.exports = router;
