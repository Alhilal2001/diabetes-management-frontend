// src/pages/MealPages/MealListPage.jsx
import { useEffect, useState } from 'react';
import { getAllMeals, deleteMeal } from '../../utilities/meals-api';
import './MealListPage.css';

function MealListPage() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    async function fetchMeals() {
      const token = localStorage.getItem('token');
      const data = await getAllMeals(token);
      setMeals(data);
    }
    fetchMeals();
  }, []);

  async function handleDelete(id) {
    const confirm = window.confirm('Are you sure you want to delete this meal?');
    if (!confirm) return;
    const token = localStorage.getItem('token');
    await deleteMeal(id, token);
    setMeals(meals.filter(meal => meal.id !== id));
  }

  return (
    <div className="meal-list-page">
      <h2>Meal Log</h2>
      <table>
        <thead>
          <tr>
            <th>Meal</th>
            <th>Carbs (g)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {meals.map(meal => (
            <tr key={meal.id}>
              <td>{meal.name}</td>
              <td>{meal.carbs}</td>
              <td>
                <button onClick={() => handleDelete(meal.id)}>Delete</button>
                <button onClick={() => window.location.href = `/meals/${meal.id}/edit`}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MealListPage;
