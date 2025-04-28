// src/pages/ActivityPages/ActivityFormPage.jsx
import { useState } from 'react';
import { createActivity } from '../../utilities/activities-api'; // التصحيح هنا
import { useNavigate } from 'react-router-dom';
import './ActivityFormPage.css';

function ActivityFormPage() {
  const [activityName, setActivityName] = useState('');
  const [activityDuration, setActivityDuration] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await createActivity({ name: activityName, duration: activityDuration }, token);
      alert('Activity Added Successfully');
      navigate('/activities');  // يرجع لصفحة الأنشطة
    } catch (err) {
      console.error(err);
      alert('Failed to Add Activity');
    }
  }

  return (
    <div className="activity-form-page">
      <h2>Add a New Activity</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={activityName}
          onChange={(e) => setActivityName(e.target.value)}
          placeholder="Activity Name"
          required
        />
        <input
          type="number"
          value={activityDuration}
          onChange={(e) => setActivityDuration(e.target.value)}
          placeholder="Duration (minutes)"
          required
        />
        <button type="submit">Save Activity</button>
      </form>
    </div>
  );
}

export default ActivityFormPage;
