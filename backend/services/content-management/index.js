const express = require('express');
const mongoose = require('mongoose');
const contentRoutes = require('./routes/contentRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001; // Use dynamic port for tests
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/upscmonk';

// Middleware
app.use(express.json());

// Mock database connection for testing
if (process.env.NODE_ENV === 'test') {
    mongoose.connect = jest.fn();
} else {
    mongoose.connect(MONGO_URI)
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.error('MongoDB connection error:', err));
}

app.use('/api/content', contentRoutes);

app.get('/', (req, res) => {
    res.send('Content Management Service is running');
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

// Start the server only if not in test mode
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Content Management Service is running on port ${PORT}`);
    });
}

module.exports = app;