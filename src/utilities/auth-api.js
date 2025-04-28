import sendRequest from './sendRequest';

const BASE_URL = '/api/auth';

export function signup(userData) {
  return sendRequest(`${BASE_URL}/signup/`, 'POST', userData);
}

export function login(credentials) {
  return sendRequest(`${BASE_URL}/login/`, 'POST', credentials);
}

export function checkToken() {
  return sendRequest(`${BASE_URL}/check-token/`);
}
