import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { getUser } from '../../utilities/users-service';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = token ? getUser() : null;

  function handleLogout() {
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">DiaTrack AI</div>
      <ul className="navbar-links">
        {token && (
          <>
            <li className="profile-link">
              <Link to="/profile">
                <img
                  src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                  alt="Profile"
                  className="avatar"
                />
                {user?.name || 'Profile'}
              </Link>
            </li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/glucose">Glucose</Link></li>
            <li><Link to="/meals">Meals</Link></li>
            <li><Link to="/activities">Activities</Link></li>
          </>
        )}
        {!token ? (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </>
        ) : (
          <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
