const Quiz = require('../models/quizModel');
const request = require('supertest');
const app = require('../index');

// Create a new quiz
exports.createQuiz = async (req, res) => {
    try {
        const { title, questions } = req.body;
        const newQuiz = new Quiz({ title, questions });
        await newQuiz.save();
        res.status(201).json({ message: 'Quiz created successfully', quiz: newQuiz });
    } catch (error) {
        console.error('Error in createQuiz:', error);
        res.status(500).json({ message: 'Error creating quiz', error });
    }
};

// Get all quizzes
exports.getQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        res.status(200).json(quizzes);
    } catch (error) {
        console.error('Error in getQuizzes:', error);
        res.status(500).json({ message: 'Error fetching quizzes', error });
    }
};

// Get a single quiz by ID
exports.getQuizById = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        res.status(200).json(quiz);
    } catch (error) {
        console.error('Error in getQuizById:', error);
        res.status(500).json({ message: 'Error fetching quiz', error });
    }
};