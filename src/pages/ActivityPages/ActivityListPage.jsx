import { useEffect, useState } from 'react';
import { getAllActivities, deleteActivity } from '../../utilities/activities-api';
import { useNavigate } from 'react-router-dom';
import './ActivityListPage.css';

function ActivityListPage() {
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const data = await getAllActivities(token);
      setActivities(data || []);
    };
    fetchData();
  }, []);

  async function handleDelete(id) {
    const confirm = window.confirm('Are you sure you want to delete this activity?');
    if (!confirm) return;
    const token = localStorage.getItem('token');
    await deleteActivity(id, token);
    setActivities(activities.filter(activity => activity.id !== id));
  }

  return (
    <div className="activity-list-page">
      <h2>Activity Log</h2>
      <table className="activity-table">
        <thead>
          <tr>
            <th>Activity</th>
            <th>Duration (min)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {activities.map(activity => (
            <tr key={activity.id}>
              <td>{activity.name}</td>
              <td>{activity.duration}</td>
              <td>
                <button className="edit-btn" onClick={() => navigate(`/activities/${activity.id}/edit`)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(activity.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ActivityListPage;
