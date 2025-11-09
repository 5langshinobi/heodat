const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  title: String,
  description: String,
  amount: { type: Number, default: 0 }, // Số tiền tùy chỉnh
  howEarned: String, // Cách kiếm (ví dụ: "Freelance", "Tiết kiệm lương")
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Achievement', achievementSchema);