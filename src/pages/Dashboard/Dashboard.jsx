// src/pages/Dashboard/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { useNavigate } from 'react-router-dom';
import { getAllGlucose } from '../../utilities/glucose-api';
import { getAllMeals } from '../../utilities/meals-api';
import { getAllActivities } from '../../utilities/activities-api';
import './Dashboard.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Dashboard() {
  const [glucoseData, setGlucoseData] = useState([]);
  const [mealData, setMealData] = useState([]);
  const [activityData, setActivityData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('token');
      const [glucose, meals, activities] = await Promise.all([
        getAllGlucose(token),
        getAllMeals(token),
        getAllActivities(token),
      ]);
      setGlucoseData(glucose || []);
      setMealData(meals || []);
      setActivityData(activities || []);
      setLoading(false);
    }
    fetchData();
  }, []);

  const makeChartData = (data, label, key) => ({
    labels: data.map(e => new Date(e.timestamp).toLocaleDateString()),
    datasets: [{
      label,
      data: data.map(e => e[key]),
      fill: false,
      borderColor: 'rgba(75,192,192,1)',
      tension: 0.3,
    }]
  });

  const chartOptions = {
    responsive: true,
    plugins: { legend: { position: 'top' } }
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      {glucoseData.length > 0 && (() => {
  const latest = glucoseData[glucoseData.length - 1];
  if (latest.glucose_level > 180) {
    return (
      <p style={{ color: 'red', fontWeight: 'bold' }}>
        ⚠️ High blood sugar alert! Glucose above 180 mg/dL
      </p>
    );
  } else if (latest.glucose_level < 70) {
    return (
      <p style={{ color: 'orange', fontWeight: 'bold' }}>
        ⚠️ Low blood sugar alert! Glucose below 70 mg/dL
      </p>
    );
  }
  return null;
})()}

      <div className="action-buttons">
        <button className="add-button" onClick={() => navigate('/glucose/new')}>Add Glucose</button>
        <button className="add-button" onClick={() => navigate('/meals/new')}>Add Meal</button>
        <button className="add-button" onClick={() => navigate('/activities/new')}>Add Activity</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="chart-container">
            <h3>Glucose Levels</h3>
            <Line data={makeChartData(glucoseData, "Glucose (mg/dL)", "glucose_level")} options={chartOptions} />
          </div>
          <div className="chart-container">
            <h3>Meals (Carbs)</h3>
            <Line data={makeChartData(mealData, "Carbs (g)", "carbs")} options={chartOptions} />
          </div>
          <div className="chart-container">
            <h3>Activities (Minutes)</h3>
            <Line data={makeChartData(activityData, "Duration (min)", "duration")} options={chartOptions} />
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
