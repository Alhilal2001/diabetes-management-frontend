import { useEffect, useState } from 'react';
import { getAllActivities } from '../../utilities/activities-api';

function ActivityListPage() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const data = await getAllActivities(token);
      setActivities(data);
    };
    fetchData();
  }, []);

  return (
    <div className="activity-list">
      <h2>Activity Log</h2>
      {activities.map((activity) => (
        <div key={activity.id}>
          {activity.name} - {activity.duration} minutes
        </div>
      ))}
    </div>
  );
}

export default ActivityListPage;
