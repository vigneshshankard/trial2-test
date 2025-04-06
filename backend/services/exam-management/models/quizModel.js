const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctOption: { type: Number, required: true },
  marks: { type: Number, default: 1 },
});

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  questions: [questionSchema],
  duration: { type: Number, required: true }, // in minutes
  totalMarks: { type: Number, required: true },
  category: { type: String },
  difficultyLevel: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Medium' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isActive: { type: Boolean, default: true },
  attemptsAllowed: { type: Number, default: 0 }, // 0 for unlimited
  passingMarks: { type: Number },
  attemptCount: { type: Number, default: 0 },
  averageScore: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Quiz', quizSchema);