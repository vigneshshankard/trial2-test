const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    ],
    messages: [
        {
            sender: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            content: {
                type: String,
                required: true,
            },
            timestamp: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    isGroupChat: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

module.exports = mongoose.model('Chat', chatSchema);