import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createMeal, getMealById, updateMeal } from '../../utilities/meals-api';
import './MealFormPage.css';

function MealFormPage() {
  const [mealName, setMealName] = useState('');
  const [mealCalories, setMealCalories] = useState('');
  const [mealCarbs, setMealCarbs] = useState('');
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const token = localStorage.getItem('token');
      setLoading(true);
      getMealById(id, token).then(data => {
        setMealName(data.name);
        setMealCalories(data.calories);
        setMealCarbs(data.carbs);
        setLoading(false);
      }).catch(err => {
        console.error(err);
        setLoading(false);
      });
    }
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const mealData = { name: mealName, calories: mealCalories, carbs: mealCarbs };

    try {
      if (id) {
        await updateMeal(id, mealData, token);
        // alert('Meal updated successfully');
      } else {
        await createMeal(mealData, token);
        // alert('Meal added successfully');
      }
      navigate('/meals');
    } catch (err) {
      console.error(err);
      // alert('Failed to save meal');
    }
  }

  return (
    <div className="meal-form-page">
      <h2>{id ? 'Edit Meal' : 'Add a New Meal'}</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
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
          <input
            type="number"
            value={mealCarbs}
            onChange={(e) => setMealCarbs(e.target.value)}
            placeholder="Carbs (grams)"
            required
          />
          <button type="submit">{id ? 'Update' : 'Save'} Meal</button>
          <button onClick={() => navigate(`/meals/edit/${meal.id}`)}>Edit</button>
          <button onClick={() => navigate('/meals')}>Cancel</button>

        </form>
      )}
    </div>
  );
}

export default MealFormPage;
