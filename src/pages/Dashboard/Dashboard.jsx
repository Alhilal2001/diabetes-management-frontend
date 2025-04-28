// src/pages/Dashboard/Dashboard.jsx
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { getAllGlucose } from '../../utilities/glucose-api';
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

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('token');
      try {
        const data = await getAllGlucose(token);
        setGlucoseData(data);
      } catch (err) {
        console.error('Failed to fetch glucose data', err);
      }
    }
    fetchData();
  }, []);

  const data = {
    labels: glucoseData.map(entry => new Date(entry.timestamp).toLocaleDateString()),
    datasets: [
      {
        label: 'Glucose Level (mg/dL)',
        data: glucoseData.map(entry => entry.glucose_level),
        borderColor: '#007bff',
        backgroundColor: '#007bff',
        tension: 0.3,
      }
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Blood Glucose Levels Over Time' },
    },
  };

  return (
    <div className="dashboard">
      <h1>Welcome to DiaTrack AI Dashboard</h1>
      {glucoseData.length > 0 ? (
        <Line data={data} options={options} />
      ) : (
        <p>No glucose entries yet.</p>
      )}
    </div>
  );
}

export default Dashboard;
