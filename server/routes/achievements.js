const router = require('express').Router();
const Achievement = require('../models/Achievement');

router.get('/', async (req, res) => {
  const achs = await Achievement.find();
  res.json(achs);
});

router.post('/', async (req, res) => {
  const ach = new Achievement(req.body);
  await ach.save();
  res.json(ach);
});

router.delete('/:id', async (req, res) => {
  await Achievement.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;