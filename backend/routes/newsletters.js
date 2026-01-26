// backend/routes/newsletters.js
const express = require("express");
const router = express.Router();
const Newsletter = require("../models/Newsletter");

//  Create a new newsletter
router.post("/", async (req, res) => {
  try {
    const newsletter = new Newsletter(req.body);
    const saved = await newsletter.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error creating newsletter:", err);
    res.status(500).json({ error: err.message });
  }
});

//  Get all newsletters
router.get("/", async (req, res) => {
  try {
    const newsletters = await Newsletter.find().sort({ createdAt: -1 });
    res.json(newsletters);
  } catch (err) {
    console.error("Error fetching newsletters:", err);
    res.status(500).json({ error: err.message });
  }
});

//  Like a newsletter (prevent duplicates)
router.post("/:id/like", async (req, res) => {
  try {
    const { user } = req.body; // email from frontend
    const newsletter = await Newsletter.findById(req.params.id);

    if (!newsletter) {
      return res.status(404).json({ error: "Newsletter not found" });
    }

    //  Only add if user not already in likes
    if (!newsletter.likes.includes(user)) {
      newsletter.likes.push(user);
      await newsletter.save();
    }

    res.json({ likes: newsletter.likes });
  } catch (err) {
    console.error("Error in like route:", err);
    res.status(500).json({ error: err.message });
  }
});

// 💬 Add a comment
router.post("/:id/comment", async (req, res) => {
  try {
    const { user, text } = req.body;
    const newsletter = await Newsletter.findById(req.params.id);

    if (!newsletter) {
      return res.status(404).json({ error: "Newsletter not found" });
    }
    if (!text || text.trim() === "") {
      return res.status(400).json({ error: "Comment text is required" });
    }

    newsletter.comments.push({
      user: user || "Anonymous",
      text,
    });

    await newsletter.save();
    res.json(newsletter.comments);
  } catch (err) {
    console.error("Error in comment route:", err);
    res.status(500).json({ error: err.message });
  }
});

// 🗑️ Delete a comment
router.delete("/:newsletterId/comments/:commentId", async (req, res) => {
  try {
    await Newsletter.updateOne(
      { _id: req.params.newsletterId },
      { $pull: { comments: { _id: req.params.commentId } } }
    );
    res.json({ message: "Comment deleted" });
  } catch (err) {
    console.error("Error in delete route:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
