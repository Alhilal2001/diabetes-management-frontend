import sendRequest from './sendRequest';

const BASE_URL = '/api/meals';

export function getAllMeals() {
  return sendRequest(`${BASE_URL}/`);
}

export function createMeal(mealData) {
  return sendRequest(`${BASE_URL}/`, 'POST', mealData);
}

export function deleteMeal(id) {
  return sendRequest(`${BASE_URL}/${id}/`, 'DELETE');
}
