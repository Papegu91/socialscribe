// src/components/NewsletterForm.jsx
import { useState } from 'react';
import axios from 'axios';

const NewsletterForm = ({ onCreated }) => {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');
  const [status, setStatus] = useState(null); // success/error feedback
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      await axios.post('/api/newsletters', {
        subject,
        body,
        tags: tags.split(',').map(tag => tag.trim()),
      });

      setSubject('');
      setBody('');
      setTags('');
      setStatus({ type: 'success', message: 'Newsletter created successfully!' });
      if (onCreated) onCreated();
    } catch (err) {
      setStatus({ type: 'error', message: 'Failed to create newsletter. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 shadow rounded">
      <h2 className="text-xl font-semibold">Create Newsletter</h2>

      {status && (
        <p className={status.type === 'success' ? 'text-green-600' : 'text-red-600'}>
          {status.message}
        </p>
      )}

      <input
        type="text"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Subject"
        className="w-full p-2 border rounded"
        required
      />

      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Body"
        className="w-full p-2 border rounded"
        rows={5}
        required
      />

      <input
        type="text"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Tags (comma-separated)"
        className="w-full p-2 border rounded"
      />

      <button
        type="submit"
        disabled={loading}
        className={`px-4 py-2 rounded text-white ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
      >
        {loading ? 'Saving...' : 'Save Draft'}
      </button>
    </form>
  );
};

export default NewsletterForm;