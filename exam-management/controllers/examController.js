const { Quiz, Analytics } = require('../models/quizModel');
const request = require('supertest');
const app = require('../index');
const { validationResult } = require('express-validator');

// Middleware to check user role
const checkUserRole = (req, res, next, allowedRoles) => {
    if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Access denied' });
    }
    next();
};

// Create a new quiz
exports.createQuiz = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { title, questions, duration } = req.body;
        const newQuiz = new Quiz({ title, questions, duration });
        await newQuiz.save();
        return res.status(201).json({ message: 'Quiz created successfully', quiz: newQuiz });
    } catch (error) {
        return next(error);
    }
};

// Get all quizzes
exports.getQuizzes = async (req, res, next) => {
    try {
        const quizzes = await Quiz.find();
        res.status(200).json(quizzes);
    } catch (error) {
        next(error);
    }
};

// Get a single quiz by ID
exports.getQuizById = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        res.status(200).json(quiz);
    } catch (error) {
        next(error);
    }
};

// Start a quiz
exports.startQuiz = async (req, res, next) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        // Restrict access for Visitors
        if (req.user.role === 'visitor') {
            return res.status(403).json({ message: 'Sign up to access this feature' });
        }

        res.status(200).json({
            message: 'Quiz started',
            quiz: {
                id: quiz._id,
                title: quiz.title,
                duration: quiz.duration,
                questions: quiz.questions.map(q => ({
                    id: q._id,
                    questionText: q.questionText,
                    options: q.options,
                })),
            },
        });
    } catch (error) {
        next(error);
    }
};

// Submit quiz answers
exports.submitQuiz = async (req, res, next) => {
    try {
        const { answers, timeTaken } = req.body;
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        let correctAnswers = 0;
        quiz.questions.forEach((question, index) => {
            if (question.correctAnswer === answers[index]) {
                correctAnswers++;
            }
        });

        // Restrict analytics for Visitors
        if (req.user.role === 'visitor') {
            return res.status(200).json({
                message: 'Sign up to view detailed results',
                correctAnswers,
                totalQuestions: quiz.questions.length,
            });
        }

        const analytics = await Analytics.create({
            userId: req.user.id,
            quizId: quiz._id,
            timeTaken,
            correctAnswers,
            totalQuestions: quiz.questions.length,
        });

        res.status(200).json({
            message: 'Quiz submitted successfully',
            analytics,
        });
    } catch (error) {
        next(error);
    }
};

// Get quiz analytics
exports.getAnalytics = async (req, res, next) => {
    try {
        // Restrict access to Subscribers only
        if (req.user.role !== 'subscriber') {
            return res.status(403).json({ message: 'Upgrade to premium to access analytics' });
        }

        const analytics = await Analytics.find({ userId: req.user.id });
        res.status(200).json(analytics);
    } catch (error) {
        next(error);
    }
};