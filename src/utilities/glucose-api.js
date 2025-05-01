// src/utilities/glucose-api.js
import sendRequest from './sendRequest';

const BASE_URL = '/api/glucose';

export function getAllGlucose(token) {
  return sendRequest(`${BASE_URL}/`, 'GET', null, token);
}


export function createGlucose(glucoseData, token) {
  const glucose_level = Number(glucoseData.glucose_level);
  if (isNaN(glucose_level)) throw new Error('Invalid glucose value');
  return sendRequest(`${BASE_URL}/`, 'POST', { glucose_level }, token);
}


export function deleteGlucose(id, token) {
  return sendRequest(`${BASE_URL}/${id}/`, 'DELETE', null, token);
}

export function getGlucoseById(id, token) {
  return sendRequest(`/api/glucose/${id}/`, 'GET', null, token);
}

export function updateGlucose(id, data, token) {
  return sendRequest(`/api/glucose/${id}/`, 'PUT', data, token);
}

