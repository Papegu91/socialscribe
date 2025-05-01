// frontend/src/components/Register.js
import { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const register = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://socialscribe-zcr5.onrender.com/signup', { email, password });
      alert('User created. You can now log in.');
    } catch (error) {
      alert('Error creating account');
    }
  };

  return (
    <form onSubmit={register}>
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
      <button type="submit">Register</button>
      <p>Already have an account? <a href="/login">Login here</a></p>
    </form>
  );
}
