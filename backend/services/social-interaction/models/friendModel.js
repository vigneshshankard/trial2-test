const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  friend_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  created_at: { type: Date, default: Date.now },
}, { timestamps: true });

friendSchema.index({ user_id: 1, friend_id: 1 }, { unique: true });

module.exports = mongoose.model('Friend', friendSchema);