import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import './Layout.css'; 

function Layout() {
  return (
    <>
      <Navbar />
      <div className="layout-container">
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
