export const BASE_URL = 'http://localhost:3001';

function getResponseData(res) {
  if (!res.ok) {
     return Promise.reject(`Ошибка: ${res.status}`); 
  }
  return res.json();
}

export function register(password, email) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({password, email})
  })
  .then(getResponseData)
}

export function authorize(password, email) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({password, email})
  })
  .then(getResponseData)
}

export function getContent(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(getResponseData)
}