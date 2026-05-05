const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['citizen', 'authority'], default: 'citizen' },
    ward: { type: String },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    badges: [{ type: String }],
    streakCount: { type: Number, default: 0 },
    reportCount: { type: Number, default: 0 },
    refreshToken: { type: String, default: null },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('passwordHash')) return next();
  const salt = await bcrypt.genSalt(10);
  this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
  next();
});

// Compare password method
userSchema.methods.matchPassword = async function (plainText) {
  return await bcrypt.compare(plainText, this.passwordHash);
};

module.exports = mongoose.model('User', userSchema);
