const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const gamificationRoutes = require('./routes/gamificationRoutes');
const adminRoutes = require('./routes/adminRoutes');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const healthcheck = require('express-healthcheck');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3006;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/gamification';

// Middleware
app.use(express.json());

// Middleware for security headers
app.use(helmet());

// Middleware for rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// Middleware for logging
app.use(morgan('combined'));

// MongoDB connection
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected for Gamification Service'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/gamification', gamificationRoutes);

// Admin Routes
app.use('/api/gamification/admin', adminRoutes);

// Health check endpoint
app.use('/health', healthcheck({
  healthy: () => ({
    uptime: process.uptime(),
    message: 'Gamification Service is healthy',
    memoryUsage: process.memoryUsage()
  })
}));

app.get('/', (req, res) => {
  res.send('Gamification Service is running');
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

app.listen(PORT, () => {
  console.log(`Gamification Service is running on port ${PORT}`);
});

module.exports = app;