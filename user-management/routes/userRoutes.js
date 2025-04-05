const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const { body } = require('express-validator');

// Public routes
router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  ],
  userController.register
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  userController.login
);

router.post('/auth/reset-password', userController.resetPassword);
router.get('/auth/verify-email/:token', userController.verifyEmail);

// Protected routes
router.get('/profile', authMiddleware, userController.getProfile);
router.get('/dashboard', authMiddleware, userController.getDashboard);
router.get('/users/:id', authMiddleware, userController.getUserById);
router.put('/users/:id/role', authMiddleware, userController.updateUserRole);
router.delete('/users/:id', authMiddleware, userController.deleteUser);

module.exports = router;