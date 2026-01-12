const express = require('express');
const router = express.Router();
const Newsletter = require('../models/Newsletter');

// 📩 Create a new newsletter
router.post('/', async (req, res) => {
  try {
    const newsletter = new Newsletter(req.body);
    const saved = await newsletter.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(" Error creating newsletter:", err);
    res.status(500).json({ error: err.message });
  }
});

// 📜 Get all newsletters
router.get('/', async (req, res) => {
  try {
    const newsletters = await Newsletter.find().sort({ createdAt: -1 });
    res.json(newsletters);
  } catch (err) {
    console.error(" Error fetching newsletters:", err);
    res.status(500).json({ error: err.message });
  }
});

// 👍 Like a newsletter
router.post('/:id/like', async (req, res) => {
  try {
    console.log(" Like request for ID:", req.params.id);

    const newsletter = await Newsletter.findById(req.params.id);
    if (!newsletter) {
      return res.status(404).json({ error: 'Newsletter not found' });
    }

    // If likes is an array of user IDs, push a dummy user for now
    // Later you’ll replace with actual logged-in user ID
    newsletter.likes.push(req.body.user || "AnonymousUser");
    await newsletter.save();

    console.log(" Newsletter liked, total likes:", newsletter.likes.length);
    res.json({ message: 'Liked!', likes: newsletter.likes.length });
  } catch (err) {
    console.error(" Error in like route:", err);
    res.status(500).json({ error: err.message });
  }
});

// 💬 Add a comment
router.post('/:id/comment', async (req, res) => {
  try {
    console.log(" Comment request for ID:", req.params.id, "Body:", req.body);

    const newsletter = await Newsletter.findById(req.params.id);
    if (!newsletter) {
      return res.status(404).json({ error: 'Newsletter not found' });
    }

    if (!req.body.text || req.body.text.trim() === "") {
      return res.status(400).json({ error: 'Comment text is required' });
    }

    //  Always set a user (fallback to "Anonymous")
    newsletter.comments.push({
      text: req.body.text,
      user: req.body.user || "Anonymous"
    });

    await newsletter.save();

    console.log(" Comment added:", req.body.text, "by", req.body.user || "Anonymous");
    res.json(newsletter.comments);
  } catch (err) {
    console.error(" Error in comment route:", err);
    res.status(500).json({ error: err.message });
  }
});

// 🗑️ Delete a comment
router.delete('/:newsletterId/comments/:commentId', async (req, res) => {
  try {
    console.log(":", req.params.newsletterId, "Comment:", req.params.commentId);

    await Newsletter.updateOne(
      { _id: req.params.newsletterId },
      { $pull: { comments: { _id: req.params.commentId } } }
    );

    console.log(" Comment deleted");
    res.json({ message: 'Comment deleted' });
  } catch (err) {
    console.error(" Error in delete route:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;