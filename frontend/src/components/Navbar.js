import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <Link to="/" className="font-bold text-lg">SocialScribe</Link>
      <Link to="/login" className="hover:underline">Login</Link>
    </nav>
  );
}

export default Navbar;
