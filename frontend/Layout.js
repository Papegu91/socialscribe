import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import './Layout.css'; // make sure this file exists too

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
