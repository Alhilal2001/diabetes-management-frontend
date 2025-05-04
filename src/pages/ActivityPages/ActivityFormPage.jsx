import { useState, useEffect } from 'react';
import { createActivity, updateActivity, getActivityById } from '../../utilities/activities-api';
import { useNavigate, useParams } from 'react-router-dom';
import './ActivityFormPage.css';

function ActivityFormPage() {
  const [activityName, setActivityName] = useState('');
  const [activityDuration, setActivityDuration] = useState('');
  const navigate = useNavigate();
  const { id } = useParams(); 

  useEffect(() => {
    if (id) {
      const fetchActivity = async () => {
        const token = localStorage.getItem('token');
        const data = await getActivityById(id, token);
        setActivityName(data.name);
        setActivityDuration(data.duration);
      };
      fetchActivity();
    }
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const payload = { name: activityName, duration: activityDuration };

    try {
      if (id) {
        await updateActivity(id, payload, token);
        // alert('Activity Updated Successfully');
      } else {
        await createActivity(payload, token);
        // alert('Activity Added Successfully');
      }
      navigate('/activities');
    } catch (err) {
      console.error(err);
      // alert('Failed to save activity');
    }
  }

  return (
    <div className="activity-form-page">
      <h2>{id ? 'Edit Activity' : 'Add a New Activity'}</h2>
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
        <button type="submit">{id ? 'Update Activity' : 'Save Activity'}</button>
      </form>
    </div>
  );
}

export default ActivityFormPage;
