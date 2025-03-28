const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController');
const authMiddleware = require('../../shared/authMiddleware'); // Updated path to shared middleware
const { body, param } = require('express-validator');

// Routes for managing quizzes
router.post(
  '/quizzes',
  authMiddleware,
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('questions').isArray({ min: 1 }).withMessage('Questions must be an array with at least one question'),
    body('questions.*.questionText').notEmpty().withMessage('Each question must have text'),
    body('questions.*.options').isArray({ min: 2 }).withMessage('Each question must have at least two options'),
    body('questions.*.correctOption').notEmpty().withMessage('Each question must have a correct option'),
  ],
  (req, res, next) => {
    req.checkRole('admin');
    next();
  },
  examController.createQuiz
);

router.get(
  '/quizzes/:id',
  authMiddleware,
  [
    param('id').isMongoId().withMessage('Invalid quiz ID'),
  ],
  examController.getQuizById
);

router.get('/quizzes', authMiddleware, examController.getQuizzes);

module.exports = router;