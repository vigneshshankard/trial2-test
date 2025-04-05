const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../../shared/authMiddleware');

// Protect admin routes with authentication and authorization
router.post('/badges', authMiddleware(['admin']), adminController.setBadgeCriteria);
router.post('/leaderboard', authMiddleware(['admin']), adminController.setLeaderboardLogic);
router.post('/points', authMiddleware(['admin']), adminController.setPointRules);

module.exports = router;