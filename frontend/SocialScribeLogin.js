import { useState } from "react";

const SocialScribeLogin = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      // For now, just simulate login
      onLogin(username);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
        {/* Logo / Illustration */}
        <div className="flex justify-center mb-6">
          <img
            src="/logo.png" // 👉 replace with your logo or illustration
            alt="SocialScribe Logo"
            className="h-16 w-16"
          />
        </div>

        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          📬 SocialScribe Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-4">
          Welcome back! Please enter your credentials.
        </p>
      </div>
    </div>
  );
};

export default SocialScribeLogin;