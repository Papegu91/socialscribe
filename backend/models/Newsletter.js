const mongoose = require('mongoose');

const newsletterSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  body: { type: String, required: true },
  tags: { type: [String], default: [] },
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },

  // 👍 Likes: store user IDs to prevent duplicate likes
  likes: [{ type: String }],

  // 💬 Comments
  comments: [
    {
      user: { type: String, required: true },   // who made the comment
      text: { type: String, required: true },   // comment content
      createdAt: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Newsletter', newsletterSchema);