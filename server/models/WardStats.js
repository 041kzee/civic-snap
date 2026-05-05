const mongoose = require('mongoose');

const wardStatsSchema = new mongoose.Schema(
  {
    ward: { type: String, required: true, unique: true },
    civicScore: { type: Number, default: 100 },
    totalReported: { type: Number, default: 0 },
    resolvedThisMonth: { type: Number, default: 0 },
    avgResolutionDays: { type: Number, default: 0 },
    topCategory: { type: String },
    lastUpdated: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model('WardStats', wardStatsSchema);
