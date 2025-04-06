const express = require('express');
const mongoose = require('mongoose');
const socialRoutes = require('./routes/socialRoutes');
require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const PORT = process.env.PORT || 3005; // Updated default port
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/social';

// Middleware
app.use(express.json());

// MongoDB connection
if (process.env.NODE_ENV !== 'test') {
    mongoose.connect(MONGO_URI)
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.error('MongoDB connection error:', err));
}

// Routes
app.use('/api/social', socialRoutes);

app.get('/', (req, res) => {
    res.send('Social Interaction Service is running');
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

// Create HTTP server and initialize Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Allow all origins for now (update in production)
    methods: ['GET', 'POST']
  }
});

// Handle Socket.IO connections
io.on('connection', (socket) => {
  console.log('A user connected to Social Interaction Service:', socket.id);

  // Example event listener for chat messages
  socket.on('send-message', (data) => {
    console.log('Chat message received:', data);
    io.emit('receive-message', data); // Broadcast to all connected clients
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected from Social Interaction Service:', socket.id);
  });
});

// Start the server
if (process.env.NODE_ENV !== 'test') {
    server.listen(PORT, () => {
        console.log(`Social Interaction Service is running on port ${PORT}`);
    });
}

module.exports = app;