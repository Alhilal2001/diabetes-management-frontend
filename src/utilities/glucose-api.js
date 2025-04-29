import sendRequest from './sendRequest';

const BASE_URL = '/api/glucose';

export function getAllGlucose(token) {
  return sendRequest(`${BASE_URL}/`, 'GET', null, token);
}

export function createGlucose(glucoseData, token) {
  const value = Number(glucoseData.glucose_level);
  if (isNaN(value)) throw new Error('Invalid glucose value');
  return sendRequest(`${BASE_URL}/`, 'POST', { value }, token);
}

export function deleteGlucose(id, token) {
  return sendRequest(`${BASE_URL}/${id}/`, 'DELETE', null, token);
}
