const mongoose = require('mongoose');

const newsletterSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  body: { type: String, required: true },
  tags: { type: [String], default: [] },
  status: { type: String, default: 'draft' },
  likes: { type: Number, default: 0 },   // 👍 Likes
  comments: [                            // 💬 Comments
    {
      text: { type: String, required: true },
      createdAt: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Newsletter', newsletterSchema);