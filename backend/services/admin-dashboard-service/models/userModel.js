const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  role: String,
  subscription_status: String
});

module.exports = mongoose.model('User', userSchema);