const mongoose = require('mongoose');

const badgeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: { type: String },
  dateEarned: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Badge', badgeSchema);