const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../../../shared/authMiddleware');
const { body } = require('express-validator');

// Public routes
router.post('/register', [
  body('username').isString().notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], userController.register);

router.post('/login', [
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').notEmpty().withMessage('Password is required')
], userController.login);

router.post('/reset-password', [
  body('email').isEmail().withMessage('Invalid email address')
], userController.resetPassword);

router.get('/verify-email/:token', userController.verifyEmail);

// Protected routes
router.get('/profile', authMiddleware, userController.getProfile);

router.get('/:id', authMiddleware, userController.getUserById);

router.put('/:id/role', [
  authMiddleware,
  body('role').isString().notEmpty().withMessage('Role is required')
], userController.updateUserRole);

router.delete('/:id', authMiddleware, userController.deleteUser);

module.exports = router;