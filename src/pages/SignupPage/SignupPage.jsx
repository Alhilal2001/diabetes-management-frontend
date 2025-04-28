// src/pages/SignupPage/SignupPage.jsx
import { useState } from 'react';
import { signup } from '../../utilities/auth-api';
import './SignupPage.css';

function SignupPage() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await signup(formData);
      alert('Signup successful, please login.');
      window.location.href = '/login';
    } catch (err) {
      alert('Signup Failed');
    }
  }

  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  }

  return (
    <div className="signup-page">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" value={formData.username} onChange={handleChange} type="text" placeholder="Username" required />
        <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="Email" required />
        <input name="password" value={formData.password} onChange={handleChange} type="password" placeholder="Password" required />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupPage;
