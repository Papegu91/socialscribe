const express = require('express');
const router = express.Router();
const Daily = require('../models/Daily');

// @route   GET /api/daily
// @desc    Get all daily posts
router.get('/', async (req, res) => {
  try {
    const posts = await Daily.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   POST /api/daily
// @desc    Create a new daily post
router.post('/', async (req, res) => {
  const { title, body } = req.body;

  if (!title || !body) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }

  try {
    const newPost = new Daily({ title, body });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
