import sendRequest from './sendRequest';

const BASE_URL = '/api/auth';

export function signup(userData) {
  return sendRequest(`${BASE_URL}/signup/`, 'POST', userData);
}

export function login(credentials) {
  return sendRequest(`${BASE_URL}/login/`, 'POST', credentials);
}

export function checkToken(token) {
  return sendRequest(`${BASE_URL}/check-token/`, 'GET', null, token);
}

export function changePassword(newPassword, token) {
  return sendRequest(`${BASE_URL}/change-password/`, 'PUT', { password: newPassword }, token);
}