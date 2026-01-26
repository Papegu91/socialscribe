// src/pages/Dashboard.jsx
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeProvider"; 
import axios from "axios";
import NewsletterCard from "../components/NewsletterCard";
import NewsletterForm from "../components/NewsletterForm";

const Dashboard = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const userEmail = localStorage.getItem("userEmail") || "User";

  // State
  const [newsletters, setNewsletters] = useState([]);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch newsletters
  useEffect(() => {
    axios.get("/api/newsletters")
      .then(res => setNewsletters(res.data))
      .catch(err => console.error("Error fetching newsletters:", err));
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  // Create newsletter
  const handleCreate = async () => {
    try {
      const newNewsletter = { subject, body, tags: tags.split(",") };
      const res = await axios.post("/api/newsletters", newNewsletter);
      setNewsletters([res.data, ...newsletters]);
      setSubject(""); setBody(""); setTags("");

      // Success message
      setSuccessMessage("Newsletter saved successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Error creating newsletter:", err);
    }
  };

  // Like newsletter
  const handleLike = async (id) => {
    try {
      await axios.post(`/api/newsletters/${id}/like`, { user: userEmail });
      setNewsletters(newsletters.map(n =>
        n._id === id ? { ...n, likes: [...n.likes, userEmail] } : n
      ));
    } catch (err) {
      console.error("Error liking newsletter:", err);
    }
  };

  // Add comment
  const handleComment = async (id, text) => {
    try {
      const res = await axios.post(`/api/newsletters/${id}/comment`, { user: userEmail, text });
      setNewsletters(newsletters.map(n =>
        n._id === id ? { ...n, comments: res.data } : n
      ));
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900" : "bg-gray-100"}`}>
      {/* Header */}
      <header className={`flex justify-between items-center shadow px-6 py-4 
        ${theme === "dark" ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"}`}>
        <h1 className="text-xl font-bold">📬 SocialScribe</h1>
        <div className="flex items-center gap-4">
          <span>{userEmail}</span>
          <button
            onClick={toggleTheme}
            className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:opacity-80 transition"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="p-6">
        <h2 className="text-2xl font-bold mb-6">Welcome to your Dashboard</h2>

        {/* Success message */}
        {successMessage && (
          <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
            {successMessage}
          </div>
        )}

        {/* Newsletter Form */}
        <NewsletterForm 
          subject={subject}
          setSubject={setSubject}
          body={body}
          setBody={setBody}
          tags={tags}
          setTags={setTags}
          onCreate={handleCreate}
        />

        {/* Newsletter List */}
        <div className={`shadow rounded p-4 ${theme === "dark" ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"}`}>
          <h3 className="text-lg font-semibold mb-4">Newsletters</h3>
          {newsletters.map(n => (
            <NewsletterCard 
              key={n._id} 
              newsletter={n} 
              onLike={handleLike} 
              onComment={handleComment} 
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
