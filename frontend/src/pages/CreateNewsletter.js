import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateNewsletter = () => {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState("draft");
  const navigate = useNavigate();

  const token = localStorage.getItem("token"); // get JWT token
  const userEmail = localStorage.getItem("userEmail"); // optional, for tracking

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/newsletters",
        {
          subject,
          body,
          tags: tags.split(",").map((t) => t.trim()),
          status,
          createdBy: userEmail, // optional field if you want to store who created it
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Newsletter created successfully!");
      navigate("/newsletters");
    } catch (err) {
      console.error("Error creating newsletter:", err);
      alert(err.response?.data?.error || "Error creating newsletter");
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Create Newsletter</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full p-2 border rounded"
          rows="5"
          required
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Publish
        </button>
      </form>
    </div>
  );
};

export default CreateNewsletter;
