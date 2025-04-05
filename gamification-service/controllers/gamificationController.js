const Badge = require('../models/badgeModel');
const Leaderboard = require('../models/leaderboardModel');
const Points = require('../models/pointsModel');

// Fetch user achievements
exports.getUserAchievements = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const achievements = await Badge.find({ userId });
    res.status(200).json(achievements);
  } catch (error) {
    next(error);
  }
};

// Fetch leaderboard
exports.getLeaderboard = async (req, res, next) => {
  try {
    const leaderboard = await Leaderboard.find().sort({ score: -1 }).limit(10);
    res.status(200).json(leaderboard);
  } catch (error) {
    next(error);
  }
};

// Fetch user points
exports.getUserPoints = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const points = await Points.findOne({ userId });
    res.status(200).json(points);
  } catch (error) {
    next(error);
  }
};