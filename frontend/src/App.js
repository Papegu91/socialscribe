// frontend/src/App.js
import React from 'react';
import Register from './components/Register';
import Login from './components/Login';
import './styles.css'; // Import the CSS file

function App() {
  return (
    <div className="form-container">
      <h1>Welcome to SocialScribe</h1>
      <h2>Register</h2>
      <Register />
      <h2>Login</h2>
      <Login />
    </div>
  );
}

export default App;
