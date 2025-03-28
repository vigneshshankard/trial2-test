const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const examRoutes = require('./routes/examRoutes');
const healthcheck = require('express-healthcheck');
const createCircuitBreaker = require('../shared/circuitBreaker');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 0; // Use dynamic port for testing
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/exam';

// Middleware
app.use(express.json());

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// Health check endpoint with detailed service status
app.use('/health', healthcheck({
  healthy: () => ({
    uptime: process.uptime(),
    message: 'Exam Management Service is healthy',
    dbStatus: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    memoryUsage: process.memoryUsage(),
    activeExams: req.session.activeExams || 0
  })
}));

// Circuit breaker for database operations
const withCircuitBreaker = (operation) => {
  const breaker = createCircuitBreaker(operation, {
    timeout: 5000,
    errorThresholdPercentage: 30,
    resetTimeout: 10000
  });
  return breaker;
};

// Database health check middleware
app.use(async (req, res, next) => {
  if (req.path === '/health') return next();

  const checkDb = async () => {
    if (mongoose.connection.readyState !== 1) {
      throw new Error('Database connection is not ready');
    }
  };

  const dbBreaker = withCircuitBreaker(checkDb);

  try {
    await dbBreaker.fire();
    next();
  } catch (error) {
    res.status(503).json({ 
      message: 'Exam service temporarily unavailable',
      error: error.message 
    });
  }
});

// Circuit breaker for exam submission
const examSubmissionBreaker = withCircuitBreaker(async (examData) => {
  // Implement exam submission logic with retry mechanism
  let retries = 3;
  while (retries > 0) {
    try {
      return await saveExamSubmission(examData);
    } catch (error) {
      retries--;
      if (retries === 0) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
});

// Attach circuit breaker to app for use in routes
app.set('examSubmissionBreaker', examSubmissionBreaker);

// MongoDB connection
if (process.env.NODE_ENV !== 'test') {
    mongoose.connect(MONGO_URI)
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.error('MongoDB connection error:', err));
}

// Routes
app.use('/api/exams', examRoutes);

app.get('/', (req, res) => {
    res.send('Exam Management Service is running');
});

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.message, '\nStack:', err.stack); // Log error details

    // Standardized error response
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err.stack : undefined, // Include stack trace in development
    });
});

// Start the server
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Exam Management Service is running on port ${PORT}`);
    });
}

module.exports = app;