// src/utilities/activities-api.js
import sendRequest from './sendRequest';

const BASE_URL = '/api/activities';

export function getAllActivities(token) {
  return sendRequest(`${BASE_URL}/`, 'GET', null, token);
}

export function createActivity(activityData, token) {
  return sendRequest(`${BASE_URL}/`, 'POST', activityData, token);
}

export function deleteActivity(id, token) {
  return sendRequest(`${BASE_URL}/${id}/`, 'DELETE', null, token);
}
