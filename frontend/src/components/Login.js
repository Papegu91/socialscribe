// frontend/src/components/Login.js
import { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://socialscribe-zcr5.onrender.com/login', { email, password });
      alert(response.data.message);
    } catch (error) {
      alert('Error logging in');
    }
  };

  return (
    <form onSubmit={login}>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Log In</button>
      <p>Don't have an account? <a href="/signup">Sign up here</a></p>
    </form>
  );
}
