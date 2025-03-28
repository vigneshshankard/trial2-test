const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController');
const authMiddleware = require('../../shared/authMiddleware');
const { body, param } = require('express-validator');

// Middleware to check user role
const checkUserRole = (allowedRoles) => (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Access denied' });
    }
    next();
};

// Routes for managing quizzes

/**
 * @route POST /quizzes
 * @desc Create a new quiz (Admin only)
 * @access Admin
 * @body {string} title - Title of the quiz
 * @body {Array} questions - Array of questions with text, options, and correctOption
 */
router.post(
  '/quizzes',
  authMiddleware,
  checkUserRole(['admin']),
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('questions').isArray({ min: 1 }).withMessage('Questions must be an array with at least one question'),
    body('questions.*.questionText').notEmpty().withMessage('Each question must have text'),
    body('questions.*.options').isArray({ min: 2 }).withMessage('Each question must have at least two options'),
    body('questions.*.correctOption').notEmpty().withMessage('Each question must have a correct option'),
  ],
  examController.createQuiz
);

/**
 * @route GET /quizzes/:id
 * @desc Get a quiz by ID
 * @access Visitor, User, Subscriber
 * @param {string} id - Quiz ID (MongoDB ObjectId)
 */
router.get(
  '/quizzes/:id',
  authMiddleware,
  checkUserRole(['visitor', 'user', 'subscriber']),
  [
    param('id').isMongoId().withMessage('Invalid quiz ID'),
  ],
  examController.getQuizById
);

/**
 * @route GET /quizzes
 * @desc Get all quizzes
 * @access Visitor, User, Subscriber
 */
router.get('/quizzes', authMiddleware, checkUserRole(['visitor', 'user', 'subscriber']), examController.getQuizzes);

/**
 * @route GET /quizzes/:id/start
 * @desc Start a quiz (User and Subscriber only)
 * @access User, Subscriber
 * @param {string} id - Quiz ID (MongoDB ObjectId)
 */
router.get(
  '/quizzes/:id/start',
  authMiddleware,
  checkUserRole(['user', 'subscriber']),
  [
    param('id').isMongoId().withMessage('Invalid quiz ID'),
  ],
  examController.startQuiz
);

/**
 * @route POST /quizzes/:id/submit
 * @desc Submit quiz answers (User and Subscriber only)
 * @access User, Subscriber
 * @param {string} id - Quiz ID (MongoDB ObjectId)
 * @body {Array} answers - Array of answers
 * @body {number} timeTaken - Time taken to complete the quiz (in seconds)
 */
router.post(
  '/quizzes/:id/submit',
  authMiddleware,
  checkUserRole(['user', 'subscriber']),
  [
    param('id').isMongoId().withMessage('Invalid quiz ID'),
    body('answers').isArray().withMessage('Answers must be an array'),
    body('timeTaken').isInt({ min: 1 }).withMessage('Time taken must be a positive integer'),
  ],
  examController.submitQuiz
);

/**
 * @route GET /analytics
 * @desc Get quiz analytics (Subscribers only)
 * @access Subscriber
 */
router.get('/analytics', authMiddleware, checkUserRole(['subscriber']), examController.getAnalytics);

module.exports = router;