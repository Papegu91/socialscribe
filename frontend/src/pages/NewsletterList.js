import React, { useEffect, useState } from "react";
import axios from "axios";

const NewsletterList = () => {
  const [newsletters, setNewsletters] = useState([]);
  const [commentTexts, setCommentTexts] = useState({}); // store comment text per newsletter

  const userEmail = localStorage.getItem("userEmail") || "Anonymous";
  const token = localStorage.getItem("token");

  // Fetch newsletters
  useEffect(() => {
    const fetchNewsletters = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/newsletters", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setNewsletters(res.data);
      } catch (err) {
        console.error("Error fetching newsletters:", err);
      }
    };
    fetchNewsletters();
  }, [token]);

  // Like a newsletter
  const handleLike = async (id) => {
    try {
      await axios.post(
        `http://localhost:5000/api/newsletters/${id}/like`,
        { user: userEmail },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const res = await axios.get("http://localhost:5000/api/newsletters", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNewsletters(res.data);
    } catch (err) {
      console.error("Error liking newsletter:", err);
    }
  };

  // Comment on a newsletter
  const handleComment = async (id) => {
    const text = commentTexts[id];
    if (!text || !text.trim()) return;

    try {
      await axios.post(
        `http://localhost:5000/api/newsletters/${id}/comment`,
        { user: userEmail, text },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCommentTexts({ ...commentTexts, [id]: "" }); // clear input
      const res = await axios.get("http://localhost:5000/api/newsletters", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNewsletters(res.data);
    } catch (err) {
      console.error("Error commenting:", err);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">All Newsletters</h2>
      {newsletters.map((n) => (
        <div key={n._id} className="border p-4 mb-4 rounded">
          <h3 className="text-xl font-semibold">{n.subject}</h3>
          <p>{n.body}</p>
          <p className="text-sm text-gray-600">Status: {n.status}</p>
          <p className="text-sm text-gray-600">Tags: {n.tags.join(", ")}</p>
          <p>Likes: {n.likes.length}</p>
          <button
            onClick={() => handleLike(n._id)}
            className="bg-green-600 text-white px-2 py-1 rounded"
          >
            Like
          </button>

          <div className="mt-2">
            <h4 className="font-semibold">Comments</h4>
            {n.comments.map((c) => (
              <p key={c._id}>
                <strong>{c.user}:</strong> {c.text}
              </p>
            ))}
            <input
              type="text"
              placeholder="Write a comment..."
              value={commentTexts[n._id] || ""}
              onChange={(e) =>
                setCommentTexts({ ...commentTexts, [n._id]: e.target.value })
              }
              className="border p-1 w-full mt-2"
            />
            <button
              onClick={() => handleComment(n._id)}
              className="bg-blue-600 text-white px-2 py-1 rounded mt-1"
            >
              Comment
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsletterList;
