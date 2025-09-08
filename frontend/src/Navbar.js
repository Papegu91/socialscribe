import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // <- Make sure this file exists!

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">SocialScribe</div>
      <div className="navbar-links">
        <Link to="/">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/dashboard">Dashboard</Link>
      </div>
    </nav>
  );
}

export default Navbar;
