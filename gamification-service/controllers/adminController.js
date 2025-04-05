const BadgeCriteria = require('../models/badgeCriteriaModel');
const LeaderboardLogic = require('../models/leaderboardLogicModel');
const PointRules = require('../models/pointRulesModel');

// Set badge criteria
exports.setBadgeCriteria = async (req, res, next) => {
  try {
    const { name, description, criteria } = req.body;
    const badge = new BadgeCriteria({ name, description, criteria });
    await badge.save();
    res.status(201).json({ message: 'Badge criteria set successfully', badge });
  } catch (error) {
    next(error);
  }
};

// Set leaderboard logic
exports.setLeaderboardLogic = async (req, res, next) => {
  try {
    const { logic } = req.body;
    const leaderboardLogic = new LeaderboardLogic({ logic });
    await leaderboardLogic.save();
    res.status(201).json({ message: 'Leaderboard logic set successfully', leaderboardLogic });
  } catch (error) {
    next(error);
  }
};

// Set point allocation rules
exports.setPointRules = async (req, res, next) => {
  try {
    const { action, points } = req.body;
    const pointRule = new PointRules({ action, points });
    await pointRule.save();
    res.status(201).json({ message: 'Point rules set successfully', pointRule });
  } catch (error) {
    next(error);
  }
};