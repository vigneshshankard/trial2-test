const express = require('express');
const mongoose = require('mongoose');
const examRoutes = require('./routes/examRoutes');

const app = express();
const PORT = process.env.PORT || 0; // Use dynamic port for testing

// Middleware
app.use(express.json());

// MongoDB connection
if (process.env.NODE_ENV !== 'test') {
    mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/test', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => console.log('MongoDB connected')).catch(err => console.error('MongoDB connection error:', err));
}

// Routes
app.use('/api/exams', examRoutes);

app.get('/', (req, res) => {
    res.send('Exam Management Service is running');
});

// Start the server
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Exam Management Service is running on port ${PORT}`);
    });
}

module.exports = app;