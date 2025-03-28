const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const authMiddleware = require('../../shared/authMiddleware');
const { body, param } = require('express-validator');

// Middleware to check user role
const checkUserRole = (allowedRoles) => (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Access denied' });
    }
    next();
};

// Routes for notifications

/**
 * @route POST /send
 * @desc Send a notification (Admin only)
 * @access Admin
 * @body {string} title - Title of the notification
 * @body {string} message - Message content of the notification
 * @body {Array} recipients - Array of recipient user IDs
 */
router.post(
  '/send',
  authMiddleware,
  checkUserRole(['admin']),
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('message').notEmpty().withMessage('Message is required'),
    body('recipients').isArray({ min: 1 }).withMessage('Recipients must be an array with at least one recipient'),
  ],
  notificationController.sendNotification
);

/**
 * @route GET /:userId
 * @desc Get notifications for a specific user
 * @access User, Subscriber
 * @param {string} userId - User ID (MongoDB ObjectId)
 */
router.get(
  '/:userId',
  authMiddleware,
  checkUserRole(['user', 'subscriber']),
  [
    param('userId').isMongoId().withMessage('Invalid user ID'),
  ],
  (req, res, next) => {
    if (req.user.id !== req.params.userId) {
      return res.status(403).json({ message: 'Forbidden: Access to these notifications is denied' });
    }
    next();
  },
  notificationController.getNotifications
);

/**
 * @route GET /priority
 * @desc Get priority notifications (Subscribers only)
 * @access Subscriber
 */
router.get(
  '/priority',
  authMiddleware,
  checkUserRole(['subscriber']),
  notificationController.getPriorityNotifications
);

module.exports = router;