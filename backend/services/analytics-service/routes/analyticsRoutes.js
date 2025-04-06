const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const authMiddleware = require('../../../shared/authMiddleware')();

router.get('/advanced', authMiddleware, analyticsController.getAdvancedAnalytics);
router.post('/predict', authMiddleware, analyticsController.predictCompletionDate);

module.exports = router;