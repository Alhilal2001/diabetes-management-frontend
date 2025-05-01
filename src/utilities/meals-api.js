import sendRequest from './sendRequest';

const BASE_URL = '/api/meals';

export function getAllMeals(token) {
  return sendRequest(`${BASE_URL}/`, 'GET', null, token);
}

export function createMeal(mealData, token) {
  return sendRequest(`${BASE_URL}/`, 'POST', mealData, token);
}

export function deleteMeal(id, token) {
  return sendRequest(`${BASE_URL}/${id}/`, 'DELETE', null, token);
}

export function getMealById(id, token) {
  return sendRequest(`/api/meals/${id}/`, 'GET', null, token);
}

export function updateMeal(id, data, token) {
  return sendRequest(`/api/meals/${id}/`, 'PUT', data, token);
}
