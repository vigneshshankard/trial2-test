const mongoose = require('mongoose');

const leaderboardLogicSchema = new mongoose.Schema({
  logic: { type: Object, required: true } // Define logic as a flexible object
});

module.exports = mongoose.model('LeaderboardLogic', leaderboardLogicSchema);