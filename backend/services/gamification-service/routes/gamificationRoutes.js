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

module.exports = router;