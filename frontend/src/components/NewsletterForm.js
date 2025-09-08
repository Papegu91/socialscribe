// src/components/NewsletterForm.jsx
import { useState } from 'react';
import axios from 'axios';

const NewsletterForm = ({ onCreated }) => {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/api/newsletters', {
        subject,
        body,
        tags: tags.split(',').map(tag => tag.trim()),
      });

      setSubject('');
      setBody('');
      setTags('');
      onCreated(); // refresh list
    } catch (err) {
      console.error('Failed to create newsletter:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 shadow rounded">
      <h2 className="text-xl font-semibold">Create Newsletter</h2>
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
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Save Draft
      </button>
    </form>
  );
};

export default NewsletterForm;
