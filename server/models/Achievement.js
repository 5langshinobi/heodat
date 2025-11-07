const mongoose = require('mongoose');

const AchievementSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Achievement', AchievementSchema);