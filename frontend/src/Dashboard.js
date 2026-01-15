// src/pages/Dashboard.jsx
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeProvider"; // ✅ assumes you set up ThemeProvider

const Dashboard = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const userEmail = localStorage.getItem("userEmail") || "User";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900" : "bg-gray-100"}`}>
      {/* Header Bar */}
      <header className={`flex justify-between items-center shadow px-6 py-4 
        ${theme === "dark" ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"}`}>
        <h1 className="text-xl font-bold">📬 SocialScribe</h1>
        <div className="flex items-center gap-4">
          <span>{userEmail}</span>
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:opacity-80 transition"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
          {/* Logout */}
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <h2 className="text-2xl font-bold mb-6">Welcome to your Dashboard</h2>

        {/* Newsletter Form */}
        <div className={`shadow rounded p-4 mb-6 ${theme === "dark" ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"}`}>
          <h3 className="text-lg font-semibold mb-2">Create Newsletter</h3>
          <input type="text" placeholder="Subject" className="w-full p-2 border rounded mb-2" />
          <textarea placeholder="Body" className="w-full p-2 border rounded mb-2" />
          <input type="text" placeholder="Tags (comma-separated)" className="w-full p-2 border rounded mb-2" />
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            Save Draft
          </button>
        </div>

        {/* Newsletter List */}
        <div className={`shadow rounded p-4 ${theme === "dark" ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"}`}>
          <h3 className="text-lg font-semibold mb-4">Newsletters</h3>
          <div className="mb-4">
            <p className="font-medium">2026 - My Resolution</p>
            <p>Likes: 3 👍</p>
            <p>Comments: Add a comment...</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;