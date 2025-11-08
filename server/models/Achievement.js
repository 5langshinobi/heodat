const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Achievement', achievementSchema);