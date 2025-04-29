import { useEffect, useState } from 'react';
import { getAllGlucose } from '../../utilities/glucose-api';
import { getAllMeals } from '../../utilities/meals-api';
import { getAllActivities } from '../../utilities/activities-api';
import { Line, Bar, Pie } from 'react-chartjs-2';
import Navbar from "../../components/Navbar/Navbar";

import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  PointElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './OverviewPage.css';

ChartJS.register(
  LineElement,
  BarElement,
  PointElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function OverviewPage() {
  const [glucoseData, setGlucoseData] = useState([]);
  const [mealsData, setMealsData] = useState([]);
  const [activitiesData, setActivitiesData] = useState([]);
  const [glucoseAlert, setGlucoseAlert] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem('token');
        const glucose = await getAllGlucose(token);
        const meals = await getAllMeals(token);
        const activities = await getAllActivities(token);
        setGlucoseData(glucose);
        setMealsData(meals);
        setActivitiesData(activities);

        if (glucose.length > 0) {
          const latestGlucose = glucose[glucose.length - 1].glucose_level;
          if (latestGlucose > 180) {
            setGlucoseAlert({ message: 'Glucose is High!', color: 'red' });
          } else if (latestGlucose < 70) {
            setGlucoseAlert({ message: 'Glucose is Low!', color: 'blue' });
          } else {
            setGlucoseAlert({ message: 'Glucose is Normal.', color: 'green' });
          }
        }
      } catch (err) {
        console.error('Failed to fetch overview data', err);
      }
    }
    fetchData();
  }, []);

  const glucoseChart = {
    labels: glucoseData.map(entry => new Date(entry.created_at).toLocaleDateString()),
    datasets: [
      {
        label: 'Glucose Level',
        data: glucoseData.map(entry => entry.glucose_level),
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.3,
        fill: false,
      },
    ],
  };

  const mealsChart = {
    labels: mealsData.map(meal => meal.name),
    datasets: [
      {
        label: 'Meals',
        data: mealsData.map(meal => meal.calories),
        backgroundColor: [
          'rgba(255, 205, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
        ],
      },
    ],
  };

  const activitiesChart = {
    labels: activitiesData.map(activity => activity.name),
    datasets: [
      {
        label: 'Duration (minutes)',
        data: activitiesData.map(activity => activity.duration),
        backgroundColor: 'rgba(153, 102, 255, 0.7)',
      },
    ],
  };

  return (
    <div className="overview-page">
      <Navbar />
      <h1>Overview Dashboard</h1>

      {glucoseAlert && (
        <div
          className="alert-box"
          style={{ backgroundColor: glucoseAlert.color }}
        >
          {glucoseAlert.message}
        </div>
      )}

      <div className="charts-container">
        <div className="chart-box">
          <h2>Glucose Levels</h2>
          <Line data={glucoseChart} />
        </div>

        <div className="chart-box">
          <h2>Meals Calories</h2>
          <Pie data={mealsChart} />
        </div>

        <div className="chart-box">
          <h2>Activities Duration</h2>
          <Bar data={activitiesChart} />
        </div>
      </div>
    </div>
  );
}

export default OverviewPage;
