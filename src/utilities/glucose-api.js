import sendRequest from './sendRequest';

const BASE_URL = '/api/glucose';

export function getAllGlucose() {
  return sendRequest(`${BASE_URL}/`);
}

export function createGlucose(glucoseData) {
  return sendRequest(`${BASE_URL}/`, 'POST', glucoseData);
}

export function deleteGlucose(id) {
  return sendRequest(`${BASE_URL}/${id}/`, 'DELETE');
}
