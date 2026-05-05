const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    issueId: { type: mongoose.Schema.Types.ObjectId, ref: 'Issue' },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Compound index for efficient fetching of unread notifications
notificationSchema.index({ userId: 1, read: 1, createdAt: 1 });

module.exports = mongoose.model('Notification', notificationSchema);
