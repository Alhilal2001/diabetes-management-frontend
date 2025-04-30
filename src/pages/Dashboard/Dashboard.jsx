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
import './Dashboard.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [glucoseData, setGlucoseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGlucoseData = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem('token');
        const data = await getAllGlucose(token);
        setGlucoseData(data || []);
      } catch (err) {
        console.error('Error fetching glucose data:', err);
        setError('An error occurred while fetching data.');
      } finally {
        setLoading(false);
      }
    };

    fetchGlucoseData();
  }, []);

  const chartData = {
    labels: glucoseData.map(entry =>
      entry.timestamp ? new Date(entry.timestamp).toLocaleString() : ''
    ),
    datasets: [
      {
        label: 'Blood Glucose Level',
        data: glucoseData.map(entry => entry.glucose_level),
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.4)',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        tension: 0.2
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      legend: { display: false },
      title: { display: false }
    }
  };

  let totalReadings = 0, maxReading = 0, minReading = 0, avgReading = 0;
  if (glucoseData.length > 0) {
    totalReadings = glucoseData.length;
    const values = glucoseData.map(entry => entry.value);
    maxReading = Math.max(...values);
    minReading = Math.min(...values);
    avgReading = values.reduce((sum, val) => sum + val, 0) / totalReadings;
  }

  let alertMessage = '';
  if (glucoseData.length > 0) {
    const latestValue = glucoseData[glucoseData.length - 1].glucose_level;
    if (latestValue > 180) {
      alertMessage = '⚠️ Alert: High blood sugar (above 180 mg/dL)';
    } else if (latestValue < 70) {
      alertMessage = '⚠️ Alert: Low blood sugar (below 70 mg/dL)';
    }
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <div className="action-buttons">
          <button className="add-button" onClick={() => navigate('/glucose/new')}>Add Glucose</button>
          <button className="add-button" onClick={() => navigate('/meals/new')}>Add Meal</button>
          <button className="add-button" onClick={() => navigate('/activities/new')}>Add Activity</button>
        </div>
      </div>

      {loading && <p>Loading data...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && glucoseData.length === 0 && (
        <p className="no-data">No data available.</p>
      )}

      {!loading && !error && glucoseData.length > 0 && (
        <>
          {alertMessage && (
            <p className="alert-message">{alertMessage}</p>
          )}

          <div className="chart-container">
            <Line data={chartData} options={chartOptions} />
          </div>

          <div className="stats-summary">
            <div className="stat-item">Total Readings: <strong>{totalReadings}</strong></div>
            <div className="stat-item">
              Average: <strong>{!isNaN(avgReading) ? avgReading.toFixed(1) : 'N/A'}</strong>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
