const express = require('express');
const router = express.Router();
const Achievement = require('../models/Achievement');

// GET all achievements
router.get('/', async (req, res) => {
  try {
    const achievements = await Achievement.find().sort({ date: -1 });
    res.json(achievements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new achievement
router.post('/', async (req, res) => {
  const achievement = new Achievement({
    title: req.body.title,
    description: req.body.description
  });
  try {
    const newAchievement = await achievement.save();
    res.status(201).json(newAchievement);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE achievement
router.delete('/:id', async (req, res) => {
  try {
    await Achievement.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted achievement' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;