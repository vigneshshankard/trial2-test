const mongoose = require('mongoose');

const badgeCriteriaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  criteria: { type: Object, required: true } // Define criteria as a flexible object
});

module.exports = mongoose.model('BadgeCriteria', badgeCriteriaSchema);