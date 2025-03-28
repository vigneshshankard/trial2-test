const express = require('express');
const router = express.Router();
const socialController = require('../controllers/socialController');
const authMiddleware = require('../../shared/authMiddleware'); // Updated path to shared middleware
const { body } = require('express-validator');

// Routes for social interactions
router.post(
  '/posts',
  authMiddleware,
  [
    body('content').notEmpty().withMessage('Content is required'),
  ],
  (req, res, next) => {
    req.checkRole('user');
    next();
  },
  socialController.createPost
);

router.get('/posts', authMiddleware, socialController.getPosts);

router.post(
  '/friend-requests',
  authMiddleware,
  [
    body('recipientId').isMongoId().withMessage('Invalid recipient ID'),
  ],
  (req, res, next) => {
    req.checkRole('user');
    next();
  },
  socialController.sendFriendRequest
);

module.exports = router;