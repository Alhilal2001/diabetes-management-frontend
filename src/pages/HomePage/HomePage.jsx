import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-page">
      <div className="home-content">
        <h1>Welcome to DiaTrack AI</h1>
        <p>
          DiaTrack AI is a smart diabetes management app that helps you monitor your glucose,
          meals, and activities efficiently. Visualize your health trends and take control of your lifestyle!
        </p>

        {/* <div className="home-buttons">
          <Link to="/login" className="btn">Login</Link>
          <Link to="/signup" className="btn">Signup</Link>
        </div>

        <a
          className="github-link"
          href="https://github.com/YourGitHub/diaTrack"
          target="_blank"
          rel="noreferrer"
        >
          View on GitHub
        </a> */}

        <img
          src="/src/assets/header.png"
          alt="Diabetes Management"
          className="home-image"
        />
      </div>
    </div>
  );
}

export default HomePage;
