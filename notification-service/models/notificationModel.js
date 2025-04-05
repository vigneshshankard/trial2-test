const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true, // Added index for faster queries
    },
    type: {
        type: String,
        enum: ['email', 'push', 'in-app'],
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    isRead: {
        type: Boolean,
        default: false,
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium', // Added priority field for notifications
    },
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);