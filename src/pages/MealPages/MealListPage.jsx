import { useEffect, useState } from 'react';
import { getAllMeals } from '../../utilities/meals-api';

function MealListPage() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const data = await getAllMeals(token);
      setMeals(data);
    };
    fetchData();
  }, []);

  return (
    <div className="meal-list">
      <h2>Meal Log</h2>
      {meals.map((meal) => (
        <div key={meal.id}>
          {meal.name} - {meal.carbs}g Carbs
        </div>
      ))}
    </div>
  );
}

export default MealListPage;
