const mongoose = require('mongoose');

const pointRulesSchema = new mongoose.Schema({
  action: { type: String, required: true },
  points: { type: Number, required: true }
});

module.exports = mongoose.model('PointRules', pointRulesSchema);