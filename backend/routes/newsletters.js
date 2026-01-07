const express = require('express');
const router = express.Router();
const Newsletter = require('../models/Newsletter');

// Create a new newsletter
router.post('/', async (req, res) => {
  try {
    const newsletter = new Newsletter(req.body);
    const saved = await newsletter.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all newsletters
router.get('/', async (req, res) => {
  try {
    const newsletters = await Newsletter.find().sort({ createdAt: -1 });
    res.json(newsletters);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Like a newsletter
router.post('/:id/like', async (req, res) => {
  try {
    const newsletter = await Newsletter.findById(req.params.id);
    if (!newsletter) return res.status(404).json({ error: 'Newsletter not found' });

    newsletter.likes = (newsletter.likes || 0) + 1;
    await newsletter.save();

    res.json({ message: 'Liked!', likes: newsletter.likes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a comment
router.post('/:id/comment', async (req, res) => {
  try {
    const newsletter = await Newsletter.findById(req.params.id);
    if (!newsletter) return res.status(404).json({ error: 'Newsletter not found' });

    newsletter.comments.push({ text: req.body.text });
    await newsletter.save();

    res.json(newsletter.comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;