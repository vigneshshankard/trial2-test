const Quiz = require('../models/quizModel');
const request = require('supertest');
const app = require('../index');
const { validationResult } = require('express-validator');

// Create a new quiz
exports.createQuiz = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { title, questions } = req.body;
        const newQuiz = new Quiz({ title, questions });
        await newQuiz.save();
        res.status(201).json({ message: 'Quiz created successfully', quiz: newQuiz });
    } catch (error) {
        next(error); // Pass error to global error handler
    }
};

// Get all quizzes
exports.getQuizzes = async (req, res, next) => {
    try {
        const quizzes = await Quiz.find();
        res.status(200).json(quizzes);
    } catch (error) {
        next(error); // Pass error to global error handler
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
        next(error); // Pass error to global error handler
    }
};