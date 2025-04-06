const mongoose = require('mongoose');

const currentAffairSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Politics', 'Economy', 'International', 'Science', 'Technology', 'Sports', 'Other'],
    required: true
  },
  source_url: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^https?:\/\/.+/.test(v);
      },
      message: props => `${props.value} is not a valid URL!`
    }
  },
  publish_date: {
    type: Date,
    default: Date.now,
    required: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  quiz_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz'
  },
  is_featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Indexes for better query performance
currentAffairSchema.index({ publish_date: -1 });
currentAffairSchema.index({ category: 1 });
currentAffairSchema.index({ tags: 1 });

const CurrentAffair = mongoose.model('CurrentAffair', currentAffairSchema);

module.exports = CurrentAffair;