const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const authMiddleware = require('../../shared/authMiddleware'); // Corrected path to shared/authMiddleware
const { body, param } = require('express-validator';

// Routes for notifications
router.post(
  '/send',
  authMiddleware,
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('message').notEmpty().withMessage('Message is required'),
    body('recipients').isArray({ min: 1 }).withMessage('Recipients must be an array with at least one recipient'),
  ],
  (req, res, next) => {
    req.checkRole('admin');
    next();
  },
  notificationController.sendNotification
);

router.get(
  '/:userId',
  authMiddleware,
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

module.exports = router;