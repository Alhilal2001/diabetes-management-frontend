// src/pages/MealPages/MealFormPage.jsx
import { useState } from 'react';
import { createMeal } from '../../utilities/meals-api';  
import { useNavigate } from 'react-router-dom';           
import './MealFormPage.css';

function MealFormPage() {
  const [mealName, setMealName] = useState('');
  const [mealCalories, setMealCalories] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await createMeal({ name: mealName, calories: mealCalories }, token);
      alert('Meal Added Successfully');
      navigate('/meals');  
    } catch (err) {
      console.error(err);
      alert('Failed to Add Meal');
    }
  }

  return (
    <div className="meal-form-page">
      <h2>Add a New Meal</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={mealName}
          onChange={(e) => setMealName(e.target.value)}
          placeholder="Meal Name"
          required
        />
        <input
          type="number"
          value={mealCalories}
          onChange={(e) => setMealCalories(e.target.value)}
          placeholder="Calories"
          required
        />
        <button type="submit">Save Meal</button>
      </form>
    </div>
  );
}

export default MealFormPage;
