import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateNewsletter from "./pages/CreateNewsletter";
import NewsletterList from "./pages/NewsletterList";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/create"
          element={
            <PrivateRoute>
              <CreateNewsletter />
            </PrivateRoute>
          }
        />
        <Route
          path="/newsletters"
          element={
            <PrivateRoute>
              <NewsletterList />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
