// models/Newsletter.js
const mongoose = require('mongoose');

const NewsletterSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  body: { type: String, required: true },
  tags: [{ type: String }],
  status: { 
    type: String, 
    enum: ['draft', 'scheduled', 'sent'], 
    default: 'draft' 
  },
  createdAt: { type: Date, default: Date.now },
  scheduledAt: Date,
  sentAt: Date,
  sentCount: { type: Number, default: 0 }
});

module.exports = mongoose.model('Newsletter', NewsletterSchema);
