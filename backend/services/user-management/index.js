const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const healthcheck = require('express-healthcheck');
const createCircuitBreaker = require('../shared/circuitBreaker');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 0; // Use dynamic port for testing
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/user';

// Middleware
app.use(express.json());

// MongoDB connection
if (process.env.NODE_ENV !== 'test') {
    mongoose.connect(MONGO_URI)
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.error('MongoDB connection error:', err));
}

// Routes
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('User Management Service is running');
});

// Health check endpoint
app.use('/health', healthcheck({
  healthy: () => ({ 
    uptime: process.uptime(),
    message: 'User Management Service is healthy',
    dbStatus: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  })
}));

// Apply circuit breaker to database operations
const withCircuitBreaker = (operation) => {
  const breaker = createCircuitBreaker(operation, {
    timeout: 5000,
    errorThresholdPercentage: 30,
    resetTimeout: 10000
  });
  return breaker;
};

// Middleware to handle database circuit breaking
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
    res.status(503).json({ message: 'Service temporarily unavailable', error: error.message });
  }
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

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`User Management Service is running on port ${PORT}`);
    });
}

module.exports = app;