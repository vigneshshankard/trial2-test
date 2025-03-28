const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const studyPlannerController = require('../controllers/studyPlannerController');
const authMiddleware = require('../../shared/authMiddleware');

// Middleware to check user role
const checkUserRole = (allowedRoles) => (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Access denied' });
    }
    next();
};

// Routes for study planner

/**
 * @route POST /plans
 * @desc Generate a new study plan (User and Subscriber only)
 * @access User, Subscriber
 * @body {string} subject - Subject to study
 * @body {number} duration - Duration in days
 */
router.post(
  '/plans',
  authMiddleware,
  checkUserRole(['user', 'subscriber']),
  [
    body('subject').notEmpty().withMessage('Subject is required'),
    body('duration').isInt({ min: 1 }).withMessage('Duration must be a positive integer'),
  ],
  studyPlannerController.generatePlan
);

/**
 * @route GET /plans/:userId
 * @desc Retrieve a user's study plan (User and Subscriber only)
 * @access User, Subscriber
 * @param {string} userId - User ID (MongoDB ObjectId)
 */
router.get(
  '/plans/:userId',
  authMiddleware,
  checkUserRole(['user', 'subscriber']),
  [
    param('userId').isMongoId().withMessage('Invalid user ID'),
  ],
  (req, res, next) => {
    if (req.user.id !== req.params.userId) {
      return res.status(403).json({ message: 'Forbidden: Access to this plan is denied' });
    }
    next();
  },
  studyPlannerController.getPlan
);

/**
 * @route PUT /plans/:userId
 * @desc Update a study plan (Subscribers only)
 * @access Subscriber
 * @param {string} userId - User ID (MongoDB ObjectId)
 * @body {string} [subject] - Updated subject to study
 * @body {number} [duration] - Updated duration in days
 */
router.put(
  '/plans/:userId',
  authMiddleware,
  checkUserRole(['subscriber']),
  [
    param('userId').isMongoId().withMessage('Invalid user ID'),
    body('subject').optional().notEmpty().withMessage('Subject cannot be empty'),
    body('duration').optional().isInt({ min: 1 }).withMessage('Duration must be a positive integer'),
  ],
  (req, res, next) => {
    if (req.user.id !== req.params.userId) {
      return res.status(403).json({ message: 'Forbidden: Access to this plan is denied' });
    }
    next();
  },
  studyPlannerController.updatePlan
);

module.exports = router;