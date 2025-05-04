import sendRequest from './sendRequest';

const BASE_URL = '/api/auth';

export async function getUser() {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      const response = await sendRequest(`${BASE_URL}/user/`, 'GET', null, token);
      return response;
    }
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
}
