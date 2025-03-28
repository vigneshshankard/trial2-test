const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');

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
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('User Management Service is running');
});

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`User Management Service is running on port ${PORT}`);
    });
}

module.exports = app;