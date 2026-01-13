// src/components/NewsletterList.js
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { ThemeContext } from '../context/ThemeContext'; 
import './NewsletterList.css';

const NewsletterList = () => {
  const [newsletters, setNewsletters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchNewsletters = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:5000/api/newsletters");
        setNewsletters(res.data);
      } catch {
        setError("Could not load newsletters. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchNewsletters();
  }, []);

  const handleLike = async (id) => {
    try {
      await axios.post(`http://localhost:5000/api/newsletters/${id}/like`, {
        user: "AnonymousUser"
      });
      setNewsletters((prev) =>
        prev.map((n) =>
          n._id === id ? { ...n, likes: [...n.likes, "AnonymousUser"] } : n
        )
      );
    } catch {
      alert("Could not like this newsletter. Try again later.");
    }
  };

  const handleComment = async (id, text, inputRef) => {
    if (!text.trim()) {
      alert("Comment cannot be empty!");
      return;
    }
    try {
      const res = await axios.post(
        `http://localhost:5000/api/newsletters/${id}/comment`,
        { text, user: "Anonymous" }
      );
      setNewsletters((prev) =>
        prev.map((n) =>
          n._id === id ? { ...n, comments: res.data } : n
        )
      );
      if (inputRef) inputRef.value = "";
    } catch {
      alert("Could not post your comment. Please try again later.");
    }
  };

  const handleDeleteComment = async (newsletterId, commentId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/newsletters/${newsletterId}/comments/${commentId}`
      );
      setNewsletters((prev) =>
        prev.map((n) =>
          n._id === newsletterId
            ? { ...n, comments: n.comments.filter((c) => c._id !== commentId) }
            : n
        )
      );
    } catch {
      alert("Could not delete comment. Please try again later.");
    }
  };

  if (loading) return <p>Loading newsletters...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className={darkMode ? "dark-mode" : "light-mode"}>
      <button onClick={toggleTheme} className="theme-toggle">
        {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </button>

      <h2>Newsletters</h2>
      {newsletters.map((n) => (
        <div className="newsletter-card" key={n._id}>
          <h3>{n.subject}</h3>
          <p>{n.body}</p>
          <p><strong>Likes:</strong> {n.likes.length}</p>

          <div className="newsletter-actions">
            <button onClick={() => handleLike(n._id)}>👍 Like</button>
          </div>

          <h4>Comments</h4>
          <ul className="comment-list">
            {n.comments.map((c) => (
              <li key={c._id}>
                <strong>{c.user}:</strong> {c.text}{" "}
                <em>({new Date(c.createdAt).toLocaleString()})</em>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteComment(n._id, c._id)}
                >
                  🗑️ Delete
                </button>
              </li>
            ))}
          </ul>

          <input
            type="text"
            className="comment-input"
            placeholder="Add a comment..."
            onKeyDown={(e) => {
              if (e.key === "Enter") handleComment(n._id, e.target.value, e.target);
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default NewsletterList;