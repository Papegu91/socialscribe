// src/components/NewsletterCard.jsx
import React from "react";

const NewsletterCard = ({ newsletter, onLike, onComment }) => {
  return (
    <div className="mb-4 border-b pb-4">
      <p className="font-medium">{newsletter.subject}</p>
      <p>{newsletter.body}</p>
      <p>Likes: {newsletter.likes.length} 👍</p>

      {/* Like button */}
      <button 
        onClick={() => onLike(newsletter._id)} 
        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
      >
        Like
      </button>

      {/* Comments */}
      <div className="mt-2">
        <h4 className="font-semibold">Comments</h4>
        {newsletter.comments.map(c => (
          <p key={c._id}><strong>{c.user}:</strong> {c.text}</p>
        ))}
        <input 
          type="text" 
          placeholder="Add comment..." 
          className="w-full p-2 border rounded mt-2"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onComment(newsletter._id, e.target.value);
              e.target.value = ""; // clear input
            }
          }} 
        />
      </div>
    </div>
  );
};

export default NewsletterCard;
