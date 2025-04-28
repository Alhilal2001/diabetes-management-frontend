// src/pages/LoginPage/LoginPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authAPI from '../../utilities/auth-api';
import './LoginPage.css';

export default function LoginPage() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const data = await authAPI.login(credentials);
      
      localStorage.setItem('token', data.access);
      navigate('/dashboard'); 
    } catch (err) {
      console.error(err);
      setError('Login Failed - Try Again');
    }
  }

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError('');
  }

  return (
    <div className="login-page">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit">Log In</button>
      </form>
      {error && <p className="error-message">&nbsp;{error}</p>}
    </div>
  );
}
