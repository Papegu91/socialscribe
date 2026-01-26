import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const userEmail = localStorage.getItem("userEmail");
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear all auth data
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");

    // Redirect to login
    navigate("/", { replace: true }); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-lg p-8 w-96 text-center">
        <h2 className="text-2xl font-semibold mb-4">Welcome to Dashboard</h2>
        <p className="mb-4">Logged in as: {userEmail}</p>

        <div className="space-y-3 mb-6">
          <button
            onClick={() => navigate("/create")}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Create Newsletter
          </button>
          <button
            onClick={() => navigate("/newsletters")}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            View Newsletters
          </button>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
