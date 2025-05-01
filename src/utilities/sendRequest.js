// src/utilities/sendRequest.js
const BASE_URL = 'http://localhost:8000';

export default async function sendRequest(endpoint, method = 'GET', payload = null, token = null) {
  const headers = {};

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  if (payload && !(payload instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const options = {
    method,
    headers,
    body: payload ? (payload instanceof FormData ? payload : JSON.stringify(payload)) : undefined
  };

  const res = await fetch(`${BASE_URL}${endpoint}`, options);

  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(`Bad Request: ${res.status}\n${errorMessage}`);
  }

  const contentType = res.headers.get('content-type');
if (contentType && contentType.includes('application/json')) {
  return res.json();
} else {
  return null;
}
}
