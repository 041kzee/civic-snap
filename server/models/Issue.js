const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema(
  {
    photoUrl: { type: String, required: true },
    thumbnailUrl: { type: String },
    location: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], required: true }, // [longitude, latitude]
    },
    geohash: { type: String },
    category: {
      type: String,
      enum: ['pothole', 'streetlight', 'garbage', 'manhole', 'waterlogging', 'other'],
    },
    severity: { type: Number, min: 1, max: 5 },
    aiDescription: { type: String },
    status: { type: String, enum: ['open', 'in-progress', 'resolved'], default: 'open' },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }, // Null for anonymous
    ward: { type: String },
    upvoteCount: { type: Number, default: 0 },
    upvoterIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    slaDue: { type: Date },
    escalated: { type: Boolean, default: false },
    resolvedAt: { type: Date },
  },
  { timestamps: true }
);

// Indexes
issueSchema.index({ location: '2dsphere' });
issueSchema.index({ ward: 1, status: 1, createdAt: 1 });
issueSchema.index({ department: 1, status: 1, slaDue: 1 });

module.exports = mongoose.model('Issue', issueSchema);
