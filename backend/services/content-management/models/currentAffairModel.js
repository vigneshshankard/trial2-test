const mongoose = require('mongoose');

const currentAffairSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  summary: { type: String, required: true },
  category: { type: String, default: 'General' }, // Added category field to classify current affairs
  isDeleted: { type: Boolean, default: false }, // Added field for soft delete
  tags: {
    type: [String],
    required: true,
    default: [],
  },
}, { timestamps: true });

module.exports = mongoose.model('CurrentAffair', currentAffairSchema);