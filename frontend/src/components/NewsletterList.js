// src/components/NewsletterList.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

const NewsletterList = ({ refreshTrigger }) => {
  const [newsletters, setNewsletters] = useState([]);

  useEffect(() => {
    axios.get('/api/newsletters')
      .then(res => setNewsletters(res.data))
      .catch(err => console.error('Failed to fetch newsletters:', err));
  }, [refreshTrigger]);

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
              <div className="text-sm text-gray-600">{n.status} | {new Date(n.createdAt).toLocaleString()}</div>
              <p className="mt-1">{n.body.slice(0, 100)}...</p>
              <div className="text-xs text-blue-500 mt-1">Tags: {n.tags.join(', ')}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NewsletterList;
