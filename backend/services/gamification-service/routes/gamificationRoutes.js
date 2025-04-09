const express = require('express');
const router = express.Router();
const gamificationController = require('../controllers/gamificationController');
const authMiddleware = require('../../shared/authMiddleware');

// Route to fetch user achievements
router.get('/achievements/:userId', authMiddleware(['user', 'admin']), gamificationController.getUserAchievements);

// Route to fetch leaderboard
router.get('/leaderboard', authMiddleware(['user', 'admin']), gamificationController.getLeaderboard);

// Route to fetch user points
router.get('/points/:userId', authMiddleware(['user', 'admin']), gamificationController.getUserPoints);

// Route to track user activity and award points
router.post('/track-activity', authMiddleware(['user', 'admin']), gamificationController.trackActivity);

// Route to get user streak information
router.get('/streak/:userId', authMiddleware(['user', 'admin']), gamificationController.getUserStreak);

// Route to get user level information
router.get('/level/:userId', authMiddleware(['user', 'admin']), gamificationController.getUserLevel);

module.exports = router;