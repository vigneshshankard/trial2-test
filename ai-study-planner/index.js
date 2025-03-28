const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const studyPlannerRoutes = require('./routes/studyPlannerRoutes');
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