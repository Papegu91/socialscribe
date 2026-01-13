// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';
import { ThemeProvider } from './context/ThemeContext'; 
import './styles.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Default index page - Login */}
            <Route index element={<AuthPage />} />

            {/* Add /login route explicitly */}
            <Route path="login" element={<AuthPage />} />

            {/* Register page */}
            <Route path="register" element={<Register />} />

            {/* Dashboard page (protected) */}
            <Route
              path="dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;