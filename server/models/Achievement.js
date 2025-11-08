router.post('/', async (req, res) => {
  const { title, description, value } = req.body;
  const achievement = new Achievement({
    title,
    description,
    value: value || 100000 // Dùng 100k nếu không có
  });
  try {
    const saved = await achievement.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});