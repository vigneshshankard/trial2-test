const mongoose = require('mongoose');

const studyMaterialSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true, 
    index: true // Added index for faster queries
  },
  description: { 
    type: String, 
    required: true 
  },
  url: { 
    type: String, 
    required: true 
  },
  accessCount: {
    type: Number,
    default: 0, // Added field to track the number of times the material is accessed
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  }
}, { timestamps: true });

module.exports = mongoose.model('StudyMaterial', studyMaterialSchema);