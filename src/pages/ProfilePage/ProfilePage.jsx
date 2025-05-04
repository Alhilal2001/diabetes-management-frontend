import './ProfilePage.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUser } from '../../utilities/users-service';
import { changePassword } from '../../utilities/auth-api';

function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    async function fetchUser() {
      const data = await getUser();
      setUser(data);
    }
    fetchUser();
  }, []);

 
const handlePasswordChange = async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem('token');
    await changePassword(password, token);
    alert('Password updated successfully');
    setPassword('');
    setShowChangePassword(false);
  } catch (err) {
    alert('Failed to update password');
    console.error(err);
  }
};

  if (!user) return <p>User not logged in.</p>;

  return (
    <div className="profile-page">
      <h2>Profile</h2>
      <div className="profile-info">
        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Username:</strong> {user.username || 'Not provided'}</p>
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
