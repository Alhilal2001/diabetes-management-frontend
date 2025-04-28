// src/pages/LoginPage/LoginPage.jsx
import './LoginPage.css';

function LoginPage() {
  return (
    <div className="login-page">
      <h2>Login</h2>
      <form>
        <input type="text" placeholder="Username" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
