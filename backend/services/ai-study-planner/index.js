const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const studyPlannerRoutes = require('./routes/studyPlannerRoutes');
const healthcheck = require('express-healthcheck');
const createCircuitBreaker = require('../shared/circuitBreaker');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 0; // Use dynamic port for testing
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/study-planner';

// Middleware
app.use(express.json());

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// MongoDB connection
if (process.env.NODE_ENV !== 'test') {
    mongoose.connect(MONGO_URI).then(() => console.log('MongoDB connected'))
      .catch(err => console.error('MongoDB connection error:', err));
}

// Health check endpoint with AI service status
app.use('/health', healthcheck({
  healthy: () => ({
    uptime: process.uptime(),
    message: 'AI Study Planner Service is healthy',
    dbStatus: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    aiModelStatus: checkAIModelStatus(),
    memoryUsage: process.memoryUsage()
  })
}));

// Circuit breaker for AI operations
const withCircuitBreaker = (operation) => {
  const breaker = createCircuitBreaker(operation, {
    timeout: 10000, // AI operations might take longer
    errorThresholdPercentage: 20,
    resetTimeout: 30000
  });
  return breaker;
};

// AI model status check
const checkAIModelStatus = () => {
  // Implement actual AI model health check here
  return 'operational';
};

// Database and AI service health check middleware
app.use(async (req, res, next) => {
  if (req.path === '/health') return next();

  const checkServices = async () => {
    // Check database connection
    if (mongoose.connection.readyState !== 1) {
      throw new Error('Database connection is not ready');
    }
    
    // Check AI model status
    if (checkAIModelStatus() !== 'operational') {
      throw new Error('AI model is not ready');
    }
  };

  const serviceBreaker = withCircuitBreaker(checkServices);

  try {
    await serviceBreaker.fire();
    next();
  } catch (error) {
    res.status(503).json({
      message: 'AI Study Planner service temporarily unavailable',
      error: error.message
    });
  }
});

// Create AI plan generator with circuit breaker
const createAIPlanGenerator = () => {
  const generator = withCircuitBreaker(async (planData) => {
    let retries = 2;
    while (retries > 0) {
      try {
        // Implement actual AI plan generation logic here
        return await generateAIStudyPlan(planData);
      } catch (error) {
        retries--;
        if (retries === 0) throw error;
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
  });

  return generator;
};

// Attach AI plan generator to app
const aiPlanGenerator = createAIPlanGenerator();
app.set('aiPlanGenerator', aiPlanGenerator);

// Routes
app.use('/api/study-planner', studyPlannerRoutes);

app.get('/', (req, res) => {
    res.send('AI Study Planner Service is running');
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
        console.log(`AI Study Planner Service is running on port ${PORT}`);
    });
}

module.exports = app;