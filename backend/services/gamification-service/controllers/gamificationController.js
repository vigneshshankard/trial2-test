const Badge = require('../models/badgeModel');
const Leaderboard = require('../models/leaderboardModel');
const Points = require('../models/pointsModel');
const PointRules = require('../models/pointRulesModel');
const BadgeCriteria = require('../models/badgeCriteriaModel');
const Streak = require('../models/streakModel');
const mongoose = require('mongoose');

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
    const { category, timeframe } = req.query;
    let query = {};
    
    // Filter by category if provided
    if (category) {
      query.category = category;
    }
    
    // Apply timeframe filter if provided
    if (timeframe) {
      const now = new Date();
      let startDate;
      
      switch (timeframe) {
        case 'daily':
          startDate = new Date(now.setDate(now.getDate() - 1));
          break;
        case 'weekly':
          startDate = new Date(now.setDate(now.getDate() - 7));
          break;
        case 'monthly':
          startDate = new Date(now.setMonth(now.getMonth() - 1));
          break;
        default:
          // No time filter
      }
      
      if (startDate) {
        query.lastUpdated = { $gte: startDate };
      }
    }
    
    const leaderboard = await Leaderboard.find(query)
      .sort({ score: -1 })
      .limit(10)
      .populate('userId', 'name avatar');
      
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
    
    if (!points) {
      return res.status(200).json({ 
        userId, 
        totalPoints: 0, 
        history: [],
        level: 1,
        nextLevelPoints: 100,
        lastUpdated: new Date()
      });
    }
    
    // Calculate user level based on points
    const level = calculateUserLevel(points.totalPoints);
    const nextLevelPoints = calculatePointsForNextLevel(level);
    
    res.status(200).json({
      ...points.toObject(),
      level,
      nextLevelPoints
    });
  } catch (error) {
    next(error);
  }
};

// Track user activity and award points
exports.trackActivity = async (req, res, next) => {
  try {
    const { userId, action } = req.body;
    
    // Find point rule for this action
    const pointRule = await PointRules.findOne({ action });
    if (!pointRule) {
      return res.status(400).json({ message: `No point rule defined for action: ${action}` });
    }
    
    // Find or create user points record
    let userPoints = await Points.findOne({ userId });
    if (!userPoints) {
      userPoints = new Points({
        userId,
        totalPoints: 0,
        history: [],
        lastUpdated: new Date()
      });
    }
    
    // Add points
    userPoints.totalPoints += pointRule.points;
    userPoints.history.push({
      action,
      points: pointRule.points,
      date: new Date()
    });
    userPoints.lastUpdated = new Date();
    
    await userPoints.save();
    
    // Update leaderboard
    await updateLeaderboard(userId, userPoints.totalPoints);
    
    // Check for achievements
    const newBadges = await checkAndAwardBadges(userId, action, userPoints);
    
    // Check for streak achievements
    const streakInfo = await updateUserStreak(userId, action);
    
    // Calculate user level
    const level = calculateUserLevel(userPoints.totalPoints);
    const nextLevelPoints = calculatePointsForNextLevel(level);
    
    res.status(200).json({
      message: 'Activity tracked successfully',
      points: pointRule.points,
      totalPoints: userPoints.totalPoints,
      level,
      nextLevelPoints,
      newBadges,
      streakInfo
    });
  } catch (error) {
    next(error);
  }
};

// Get user's current streak information
exports.getUserStreak = async (req, res, next) => {
  try {
    const { userId } = req.params;
    
    // Get streak data from database
    let streak = await Streak.findOne({ userId });
    
    if (!streak) {
      streak = {
        userId,
        currentStreak: 0,
        longestStreak: 0,
        lastActivityDate: null,
        streakHistory: []
      };
    }
    
    res.status(200).json(streak);
  } catch (error) {
    next(error);
  }
};

// Get user's current level and progress
exports.getUserLevel = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const points = await Points.findOne({ userId });
    
    if (!points) {
      return res.status(200).json({
        level: 1,
        currentPoints: 0,
        nextLevelPoints: 100,
        progress: 0
      });
    }
    
    const level = calculateUserLevel(points.totalPoints);
    const nextLevelPoints = calculatePointsForNextLevel(level);
    const prevLevelPoints = calculatePointsForLevel(level);
    const levelProgress = (points.totalPoints - prevLevelPoints) / (nextLevelPoints - prevLevelPoints);
    
    res.status(200).json({
      level,
      currentPoints: points.totalPoints,
      nextLevelPoints,
      progress: Math.min(levelProgress, 1) * 100
    });
  } catch (error) {
    next(error);
  }
};

// Helper functions

async function updateLeaderboard(userId, score) {
  try {
    // Update or create leaderboard entry
    await Leaderboard.findOneAndUpdate(
      { userId }, 
      { userId, score },
      { upsert: true, new: true }
    );
    
    // Update ranks for all users - can be optimized as a scheduled job
    const leaderboardEntries = await Leaderboard.find().sort({ score: -1 });
    
    const bulkOps = leaderboardEntries.map((entry, index) => ({
      updateOne: {
        filter: { _id: entry._id },
        update: { $set: { rank: index + 1 } }
      }
    }));
    
    if (bulkOps.length > 0) {
      await Leaderboard.bulkWrite(bulkOps);
    }
    
    return true;
  } catch (error) {
    console.error('Error updating leaderboard:', error);
    return false;
  }
}

async function checkAndAwardBadges(userId, action, userPoints) {
  try {
    // Find badge criteria that match this action
    const badgeCriteria = await BadgeCriteria.find({
      'criteria.action': action
    });
    
    const newBadges = [];
    
    for (const criteria of badgeCriteria) {
      // Check if user already has this badge
      const existingBadge = await Badge.findOne({
        userId,
        name: criteria.name
      });
      
      if (existingBadge) {
        continue;
      }
      
      // Check if criteria are met
      let criteriaFulfilled = false;
      
      if (criteria.criteria.type === 'points' && userPoints.totalPoints >= criteria.criteria.threshold) {
        criteriaFulfilled = true;
      } else if (criteria.criteria.type === 'action_count') {
        // Count how many times this action was performed
        const actionCount = userPoints.history.filter(h => h.action === action).length;
        if (actionCount >= criteria.criteria.threshold) {
          criteriaFulfilled = true;
        }
      }
      
      if (criteriaFulfilled) {
        // Award badge
        const newBadge = new Badge({
          userId,
          name: criteria.name,
          description: criteria.description,
          dateEarned: new Date()
        });
        
        await newBadge.save();
        newBadges.push(newBadge);
      }
    }
    
    return newBadges;
  } catch (error) {
    console.error('Error checking badges:', error);
    return [];
  }
}

async function updateUserStreak(userId, action) {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to beginning of day for comparison
    
    // Find or create streak
    let streak = await Streak.findOne({ userId });
    if (!streak) {
      streak = new Streak({
        userId,
        currentStreak: 0,
        longestStreak: 0,
        lastActivityDate: null,
        streakHistory: []
      });
    }
    
    // Check if already recorded activity for today
    const todayActivity = streak.streakHistory.find(entry => {
      const entryDate = new Date(entry.date);
      entryDate.setHours(0, 0, 0, 0);
      return entryDate.getTime() === today.getTime() && entry.completed;
    });
    
    if (todayActivity) {
      // Already recorded activity today, just return current streak
      return {
        currentStreak: streak.currentStreak,
        longestStreak: streak.longestStreak,
        lastActivityDate: streak.lastActivityDate
      };
    }
    
    // Calculate if streak continues or resets
    if (streak.lastActivityDate) {
      const lastDate = new Date(streak.lastActivityDate);
      lastDate.setHours(0, 0, 0, 0);
      
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (lastDate.getTime() === yesterday.getTime()) {
        // Yesterday activity - streak continues
        streak.currentStreak += 1;
      } else if (lastDate.getTime() < yesterday.getTime()) {
        // Missed a day or more - reset streak
        streak.currentStreak = 1;
      }
      // If lastDate is today, currentStreak stays the same
    } else {
      // First activity
      streak.currentStreak = 1;
    }
    
    // Update longest streak if needed
    if (streak.currentStreak > streak.longestStreak) {
      streak.longestStreak = streak.currentStreak;
    }
    
    // Update last activity date to today
    streak.lastActivityDate = today;
    
    // Add to streak history
    streak.streakHistory.push({
      date: today,
      completed: true
    });
    
    // Keep history manageable (e.g., last 30 days)
    if (streak.streakHistory.length > 30) {
      streak.streakHistory.sort((a, b) => new Date(b.date) - new Date(a.date));
      streak.streakHistory = streak.streakHistory.slice(0, 30);
    }
    
    streak.lastUpdated = new Date();
    await streak.save();
    
    return {
      currentStreak: streak.currentStreak,
      longestStreak: streak.longestStreak,
      lastActivityDate: streak.lastActivityDate
    };
  } catch (error) {
    console.error('Error updating streak:', error);
    return {
      currentStreak: 0,
      longestStreak: 0,
      lastActivityDate: null,
      error: error.message
    };
  }
}

function calculateUserLevel(totalPoints) {
  // Simple level calculation: Level = 1 + sqrt(totalPoints/100)
  return Math.floor(1 + Math.sqrt(totalPoints / 100));
}

function calculatePointsForNextLevel(currentLevel) {
  // Points needed for next level
  return Math.pow(currentLevel, 2) * 100;
}

function calculatePointsForLevel(level) {
  // Points needed for current level
  return Math.pow(level - 1, 2) * 100;
}