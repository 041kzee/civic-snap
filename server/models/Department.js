const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    icon: { type: String },
    slaHours: { type: Number, default: 48 },
    assignedOfficerIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    performance: { type: String, enum: ['excellent', 'good', 'poor'], default: 'good' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Department', departmentSchema);
