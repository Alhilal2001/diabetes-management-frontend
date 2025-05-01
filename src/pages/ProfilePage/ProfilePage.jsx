// src/pages/ProfilePage/ProfilePage.jsx
import './ProfilePage.css';
import { getUser } from '../../utilities/users-service';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function ProfilePage() {
  const user = getUser();
  const navigate = useNavigate();
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [password, setPassword] = useState('');

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    // Replace with your API endpoint to change password
    alert(`Password updated to: ${password}`);
    setPassword('');
    setShowChangePassword(false);
  };

  if (!user) return <p>User not logged in.</p>;

  return (
    <div className="profile-page">
      <h2>Profile</h2>
      <div className="profile-info">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Username:</strong> {user.name || 'Not provided'}</p>
        <p><strong>Token Expires:</strong> {new Date(user.exp * 1000).toLocaleString()}</p>
      </div>

      <button className="change-pass-btn" onClick={() => setShowChangePassword(!showChangePassword)}>
        {showChangePassword ? 'Cancel' : 'Change Password'}
      </button>

      {showChangePassword && (
        <form className="change-password-form" onSubmit={handlePasswordChange}>
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Update Password</button>
        </form>
      )}
    </div>
  );
}

export default ProfilePage;
