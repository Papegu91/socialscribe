import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../App.css';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const showMenu = location.pathname.startsWith('/dashboard');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="layout">
      <div className="header">
        <div className="header-left">SocialScribe</div>
        <div className="header-right">
          {showMenu && (
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          )}
        </div>
      </div>

      <div className="main-content">
        {showMenu && (
          <div className="sidebar">
            <ul>
              <li onClick={() => navigate('/dashboard')}> Dashboard</li>
              
            </ul>
          </div>
        )}
        <div className="page-content">{children}</div>
      </div>

      <div className="footer">© 2025 SocialScribe</div>
    </div>
  );
};

export default Layout;
