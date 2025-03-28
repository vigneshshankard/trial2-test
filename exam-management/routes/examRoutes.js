const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController');

// Routes for managing quizzes
router.post('/quizzes', examController.createQuiz);
router.get('/quizzes', examController.getQuizzes);
router.get('/quizzes/:id', examController.getQuizById);

module.exports = router;