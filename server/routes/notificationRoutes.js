const express = require('express');
const router = express.Router();
const { getNotifications, markAsRead, markAllRead } = require('../controllers/notificationController');
const protect = require('../middleware/auth');

router.use(protect);
router.get('/', getNotifications);
router.patch('/read', markAsRead);
router.patch('/read-all', markAllRead);

module.exports = router;
