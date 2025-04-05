const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        index: true, // Added index for faster queries
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true, // Added index for faster queries
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    isActive: {
        type: Boolean,
        default: true, // Added field for soft delete
    },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);