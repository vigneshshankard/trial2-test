const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { mockAuthMiddleware, checkUserRole } = require('../shared/authMiddleware');
const { body, param, validationResult } = require('express-validator');

// Middleware to check user role
router.use(mockAuthMiddleware);

// Validation middleware
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Send Notification Route
router.post('/send', [
  body('userId').isString().notEmpty().withMessage('User ID is required'),
  body('type').isString().notEmpty().withMessage('Notification type is required'),
  body('message').isString().notEmpty().withMessage('Notification message is required'),
  validateRequest
], checkUserRole(['admin', 'regular']), notificationController.sendNotification);

// Get Notifications Route
router.get('/:userId', [
  param('userId').isString().notEmpty().withMessage('User ID is required'),
  validateRequest
], checkUserRole(['admin', 'regular']), notificationController.getNotifications);

// Get Priority Notifications Route
router.get('/priority', checkUserRole(['admin', 'regular']), notificationController.getPriorityNotifications);

// Update Notification Preferences Route
router.put('/preferences', [
  body('email_enabled').optional().isBoolean().withMessage('Email enabled must be a boolean'),
  body('sms_enabled').optional().isBoolean().withMessage('SMS enabled must be a boolean'),
  body('in_app_enabled').optional().isBoolean().withMessage('In-app enabled must be a boolean'),
  validateRequest
], checkUserRole(['admin', 'regular']), notificationController.updateNotificationPreferences);

module.exports = router;