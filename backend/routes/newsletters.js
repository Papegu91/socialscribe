// routes/newsletters.js
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

module.exports = router;
