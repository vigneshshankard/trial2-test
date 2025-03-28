const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');
const authMiddleware = require('../../shared/authMiddleware');

// Middleware to check user role
const checkUserRole = (allowedRoles) => (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Access denied' });
    }
    next();
};

// Routes for fetching content

/**
 * @route GET /study-materials
 * @desc Fetch study materials
 * @access Visitor, User, Subscriber
 */
router.get(
  '/study-materials',
  authMiddleware,
  checkUserRole(['visitor', 'user', 'subscriber']),
  contentController.getStudyMaterials
);

/**
 * @route GET /current-affairs
 * @desc Fetch current affairs
 * @access Visitor, User, Subscriber
 */
router.get(
  '/current-affairs',
  authMiddleware,
  checkUserRole(['visitor', 'user', 'subscriber']),
  contentController.getCurrentAffairs
);

/**
 * @route GET /suggested-topics
 * @desc Fetch suggested topics
 * @access Authenticated users
 */
router.get('/suggested-topics', authMiddleware, contentController.getSuggestedTopics);

module.exports = router;