const express = require('express');
const router = express.Router();
const Achievement = require('../models/Achievement');

// GET all
router.get('/', async (req, res) => {
  try {
    const achs = await Achievement.find();
    res.json(achs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new
router.post('/', async (req, res) => {
  const ach = new Achievement(req.body);
  try {
    const saved = await ach.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    await Achievement.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Thêm route GET /api/total-money
router.get('/total-money', async (req, res) => {
  try {
    const achs = await Achievement.find();
    const total = achs.reduce((sum, ach) => sum + (ach.amount || 0), 0);
    res.json({ total });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
