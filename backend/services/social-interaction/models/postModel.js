const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true, // Added index for faster queries
    },
    isDeleted: {
        type: Boolean,
        default: false, // Added field for soft delete
    },
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);