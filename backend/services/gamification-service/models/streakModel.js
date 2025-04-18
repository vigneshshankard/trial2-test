const mongoose = require('mongoose');

const streakSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
    index: true
  },
  currentStreak: { 
    type: Number, 
    default: 0 
  },
  longestStreak: { 
    type: Number, 
    default: 0 
  },
  lastActivityDate: { 
    type: Date 
  },
  streakHistory: [{
    date: { type: Date },
    completed: { type: Boolean, default: false }
  }],
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Streak', streakSchema);