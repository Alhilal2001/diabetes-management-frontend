import sendRequest from './sendRequest';

const BASE_URL = '/api/activities';

export function getAllActivities() {
  return sendRequest(`${BASE_URL}/`);
}

export function createActivity(activityData) {
  return sendRequest(`${BASE_URL}/`, 'POST', activityData);
}

export function deleteActivity(id) {
  return sendRequest(`${BASE_URL}/${id}/`, 'DELETE');
}
