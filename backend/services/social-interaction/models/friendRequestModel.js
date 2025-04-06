const mongoose = require('mongoose');

const friendRequestSchema = new mongoose.Schema({
  sender_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiver_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected', 'canceled'], default: 'pending' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
}, { timestamps: true });

friendRequestSchema.index({ sender_id: 1, receiver_id: 1 }, { unique: true });

module.exports = mongoose.model('FriendRequest', friendRequestSchema);