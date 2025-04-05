const mongoose = require('mongoose');

const pointsSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true, 
    index: true // Added index for faster queries
  },
  totalPoints: { 
    type: Number, 
    default: 0 
  },
  history: [
    {
      action: { type: String, required: true },
      points: { type: Number, required: true },
      date: { type: Date, default: Date.now }
    }
  ],
  lastUpdated: {
    type: Date,
    default: Date.now, // Added field to track the last update time
  }
});

module.exports = mongoose.model('Points', pointsSchema);