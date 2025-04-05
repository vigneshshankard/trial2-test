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

/**
 * @route GET /dummy-data
 * @desc Fetch dummy data
 * @access Authenticated users
 */
router.get('/dummy-data', authMiddleware, contentController.getDummyData);

/**
 * @route GET /content/hierarchy
 * @desc Fetch content hierarchy
 * @access Authenticated users
 */
router.get('/content/hierarchy', authMiddleware, contentController.getContentHierarchy);

/**
 * @route POST /content/bulk-upload
 * @desc Bulk upload content
 * @access Authenticated users
 */
router.post('/content/bulk-upload', authMiddleware, contentController.bulkUploadContent);

/**
 * @route GET /content/:id
 * @desc Fetch content with Redis caching
 * @access Authenticated users
 */
router.get('/content/:id', authMiddleware, contentController.getCachedContent);

module.exports = router;