import { useEffect, useState } from 'react';
import axios from 'axios';

const NewsletterList = ({ refreshTrigger }) => {
  const [newsletters, setNewsletters] = useState([]);

  useEffect(() => {
    axios.get('/api/newsletters')
      .then(res => setNewsletters(res.data))
      .catch(err => console.error('Failed to fetch newsletters:', err));
  }, [refreshTrigger]);

  const handleLike = async (id) => {
    try {
      const res = await axios.post(`/api/newsletters/${id}/like`);
      setNewsletters(prev =>
        prev.map(item =>
          item._id === id ? { ...item, likes: res.data.likes } : item
        )
      );
    } catch (err) {
      console.error('Failed to like:', err);
    }
  };

  const handleComment = async (id, text) => {
    try {
      const res = await axios.post(`/api/newsletters/${id}/comment`, { text });
      setNewsletters(prev =>
        prev.map(item =>
          item._id === id ? { ...item, comments: res.data } : item
        )
      );
    } catch (err) {
      console.error('Failed to comment:', err);
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Your Newsletters</h2>
      {newsletters.length === 0 ? (
        <p>No newsletters yet.</p>
      ) : (
        <ul className="space-y-3">
          {newsletters.map((n) => (
            <li key={n._id} className="border p-3 rounded bg-gray-50">
              <div className="font-bold">{n.subject}</div>
              <div className="text-sm text-gray-600">
                {n.status} | {new Date(n.createdAt).toLocaleString()}
              </div>
              <p className="mt-1">{n.body.slice(0, 100)}...</p>
              <div className="text-xs text-blue-500 mt-1">
                Tags: {n.tags.join(', ')}
              </div>

              {/* 👍 Like button */}
              <button
                onClick={() => handleLike(n._id)}
                className="bg-green-500 text-white px-3 py-1 rounded mt-2"
              >
                👍 Like ({n.likes || 0})
              </button>

              {/* 💬 Comments */}
              <div className="mt-3">
                <h4 className="text-sm font-semibold">Comments</h4>
                <ul className="text-sm text-gray-700">
                  {n.comments?.map((c, i) => (
                    <li key={i}>{c.text}</li>
                  ))}
                </ul>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const text = e.target.comment.value;
                    handleComment(n._id, text);
                    e.target.reset();
                  }}
                  className="mt-2"
                >
                  <input
                    name="comment"
                    placeholder="Write a comment..."
                    className="border p-1 rounded w-full"
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-2 py-1 rounded mt-1"
                  >
                    Add Comment
                  </button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NewsletterList;