const mongoose = require('mongoose');

const studyPlanSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    targetExamDate: {
        type: Date,
        required: true,
    },
    preferredSubjects: [
        {
            type: String,
            required: true,
        },
    ],
    progress: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

module.exports = mongoose.model('StudyPlan', studyPlanSchema);