const express = require('express');
const router = express.Router();
const Daily = require('../models/Daily');


router.get('/', async (req, res) => {
  try {
    const posts = await Daily.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});


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
