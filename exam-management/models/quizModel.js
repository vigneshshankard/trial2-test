const mongoose = require('mongoose');

/**
 * Schema for a single question in a quiz.
 * @property {String} questionText - The text of the question.
 * @property {String[]} options - Array of possible answers.
 * @property {String} correctAnswer - The correct answer to the question.
 */
const questionSchema = new mongoose.Schema({
    questionText: {
        type: String,
        required: true,
    },
    options: [
        {
            type: String,
            required: true,
        },
    ],
    correctAnswer: {
        type: String,
        required: true,
    },
});

/**
 * Schema for a quiz.
 * @property {String} title - The title of the quiz.
 * @property {questionSchema[]} questions - Array of questions in the quiz.
 * @property {Number} duration - Duration of the quiz in minutes.
 * @property {Date} createdAt - Timestamp when the quiz was created.
 * @property {Date} updatedAt - Timestamp when the quiz was last updated.
 */
const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    questions: [questionSchema],
    duration: {
        type: Number, // Duration in minutes
        required: true,
    },
}, { timestamps: true });

/**
 * Schema for analytics data of a quiz attempt.
 * @property {mongoose.Schema.Types.ObjectId} userId - Reference to the user who attempted the quiz.
 * @property {mongoose.Schema.Types.ObjectId} quizId - Reference to the quiz that was attempted.
 * @property {Number} timeTaken - Time taken to complete the quiz in seconds.
 * @property {Number} correctAnswers - Number of correct answers given by the user.
 * @property {Number} totalQuestions - Total number of questions in the quiz.
 * @property {Date} createdAt - Timestamp when the analytics data was created.
 * @property {Date} updatedAt - Timestamp when the analytics data was last updated.
 */
const analyticsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true,
    },
    timeTaken: {
        type: Number, // Time taken in seconds
        required: true,
    },
    correctAnswers: {
        type: Number,
        required: true,
    },
    totalQuestions: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

module.exports = {
    Quiz: mongoose.model('Quiz', quizSchema),
    Analytics: mongoose.model('Analytics', analyticsSchema),
};