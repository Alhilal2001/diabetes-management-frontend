const BASE_URL = 'http://localhost:8000'; // بدون سلاش هنا

export default async function sendRequest(endpoint, method = 'GET', payload = null) {
  const options = { method, headers: {} };
  if (payload) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(payload);
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, options);
  
  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(`Bad Request: ${res.status}\n${errorMessage}`);
  }

  return res.json();
}
