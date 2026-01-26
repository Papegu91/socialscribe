// src/components/NewsletterCard.jsx
import React from "react";
import "./Dashboard.css"; // 

const NewsletterCard = ({ newsletter, onLike, onComment }) => {
  const userEmail = localStorage.getItem("userEmail");

  // Show only first 150 characters of body
  const preview = newsletter.body.length > 150
    ? newsletter.body.slice(0, 150) + "..."
    : newsletter.body;

  return (
    <div className="newsletter-card">
      {/* Subject + Preview */}
      <p className="subject">{newsletter.subject}</p>
      <p className="body-preview">{preview}</p>

      {/* Tags */}
      <div className="tags">
        {newsletter.tags && newsletter.tags.map((tag, idx) => (
          <span key={idx} className="tag">#{tag}</span>
        ))}
      </div>

      {/* Likes */}
      <p className="likes">Likes: {newsletter.likes.length} </p>
      <button
        onClick={() => {
          if (!newsletter.likes.includes(userEmail)) {
            onLike(newsletter._id);
          }
        }}
        disabled={newsletter.likes.includes(userEmail)}
        className={`like-button ${
          newsletter.likes.includes(userEmail) ? "disabled" : "active"
        }`}
      >
        {newsletter.likes.includes(userEmail) ? "Liked" : "Like"}
      </button>

      {/* Comments */}
      <div className="comment-section">
        <h4>Comments ({newsletter.comments.length})</h4>
        {newsletter.comments.map(c => (
          <p key={c._id}><strong>{c.user}:</strong> {c.text}</p>
        ))}
        <input
          type="text"
          placeholder="Add comment..."
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.target.value.trim()) {
              onComment(newsletter._id, e.target.value);
              e.target.value = "";
            }
          }}
        />
      </div>
    </div>
  );
};

export default NewsletterCard;
