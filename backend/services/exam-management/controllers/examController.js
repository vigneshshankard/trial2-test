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

// Submit quiz answers with circuit breaker
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

        // Prepare submission data
        const submissionData = {
            userId: req.user.id,
            quizId: quiz._id,
            timeTaken,
            correctAnswers,
            totalQuestions: quiz.questions.length,
        };

        // Use circuit breaker for submission
        const examSubmissionBreaker = req.app.get('examSubmissionBreaker');
        const analytics = await examSubmissionBreaker.fire(submissionData);

        // Handle different user roles
        if (req.user.role === 'visitor') {
            return res.status(200).json({
                message: 'Sign up to view detailed results',
                correctAnswers,
                totalQuestions: quiz.questions.length,
            });
        }

        res.status(200).json({
            message: 'Quiz submitted successfully',
            analytics,
        });
    } catch (error) {
        if (error.type === 'circuit-breaker') {
            return res.status(503).json({
                message: 'Service is temporarily unavailable. Please try again later.',
                error: error.message
            });
        }
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

exports.startExam = async (req, res, next) => {
  try {
    const { id } = req.params;
    const exam = await Exam.findById(id);

    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }

    const randomizedQuestions = exam.questions.sort(() => Math.random() - 0.5);
    const session = { userId: req.user.id, examId: id, startTime: new Date() };

    // Store session in Redis (placeholder)
    await redisClient.set(`exam:${req.user.id}:${id}`, JSON.stringify(session));

    res.status(200).json({ exam: { ...exam.toObject(), questions: randomizedQuestions } });
  } catch (error) {
    next(error);
  }
};

exports.submitExam = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sessionKey = `exam:${req.user.id}:${id}`;
    const session = await redisClient.get(sessionKey);

    if (!session) {
      return res.status(400).json({ message: 'Exam session not found' });
    }

    const { answers } = req.body;
    const exam = await Exam.findById(id);
    const score = calculateScore(exam.questions, answers);

    // Save results (placeholder)
    await UserTestAttempts.create({ userId: req.user.id, examId: id, score });

    // Delete session
    await redisClient.del(sessionKey);

    res.status(200).json({ message: 'Exam submitted successfully', score });
  } catch (error) {
    next(error);
  }
};

exports.pauseTest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sessionKey = `exam:${req.user.id}:${id}`;
    const session = await redisClient.get(sessionKey);

    if (!session) {
      return res.status(400).json({ message: 'Exam session not found' });
    }

    const pausedSession = { ...JSON.parse(session), pausedAt: new Date() };
    await redisClient.set(sessionKey, JSON.stringify(pausedSession));

    res.status(200).json({ message: 'Exam paused successfully' });
  } catch (error) {
    next(error);
  }
};

exports.autoSubmitStaleExams = async () => {
  try {
    const staleSessions = await redisClient.keys('exam:*');

    for (const sessionKey of staleSessions) {
      const session = JSON.parse(await redisClient.get(sessionKey));
      const elapsedTime = Date.now() - new Date(session.startTime).getTime();

      if (elapsedTime > 24 * 60 * 60 * 1000) { // 24 hours
        const exam = await Exam.findById(session.examId);
        const score = calculateScore(exam.questions, session.answers || []);

        await UserTestAttempts.create({ userId: session.userId, examId: session.examId, score });
        await redisClient.del(sessionKey);
      }
    }
  } catch (error) {
    console.error('Error auto-submitting stale exams:', error);
  }
};