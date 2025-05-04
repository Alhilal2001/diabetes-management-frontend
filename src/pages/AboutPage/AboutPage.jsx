import './AboutPage.css';

function AboutPage() {
  return (
    <div className="about-page">
      <div className="about-container">
        <h1>About DiaTrack AI</h1>
        <p>
          <strong>DiaTrack AI</strong> is an intelligent platform designed to help individuals living with diabetes
          track their daily glucose levels, meals, and physical activities — all in one place.
        </p>

        <h2>Key Features</h2>
        <ul>
          <li>Real-time glucose tracking</li>
          <li>Meal logging with carbohydrate and calorie data</li>
          <li>Activity tracking with duration</li>
          <li>Smart alerts for high/low glucose levels</li>
          <li>Visual charts and summaries</li>
        </ul>

        <h2>Tech Stack</h2>
        <ul>
          <li>Frontend: React, Vite, Chart.js</li>
          <li>Backend: Django REST Framework</li>
          <li>Database: PostgreSQL</li>
          <li>Authentication: JWT</li>
          <li>Deployment: Docker</li>
        </ul>

        <p className="thank-you">Thanks for visiting — Stay healthy and in control!</p>
      </div>
    </div>
  );
}

export default AboutPage;
