const express = require('express');
const mongoose = require('mongoose');
const contentRoutes = require('./routes/contentRoutes');
const app = express();
const PORT = process.env.PORT || 3001; // Use dynamic port for tests

// Middleware
app.use(express.json());

// Mock database connection for testing
if (process.env.NODE_ENV === 'test') {
    mongoose.connect = jest.fn();
} else {
    mongoose.connect('mongodb://localhost:27017/upscmonk', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    }).then(() => console.log('MongoDB connected')).catch(err => console.error('MongoDB connection error:', err));
}

app.use('/api/content', contentRoutes);

app.get('/', (req, res) => {
    res.send('Content Management Service is running');
});

// Start the server only if not in test mode
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Content Management Service is running on port ${PORT}`);
    });
}

module.exports = app;