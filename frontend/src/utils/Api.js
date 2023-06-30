import { CurrentUserContext } from "../contexts/CurrentUserContext";

class Api {
  constructor(config) {
    this._url = config.url; 
    this._headers = config.headers; 
  }

  _getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`); 
    }
    return res.json();
  } 

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
    .then(this._getResponseData)
  }

  setUserInfo(username, userjob) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: username,
        about: userjob
      })
    })
    .then(this._getResponseData)
  }

  setUserPhoto(photo) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: photo
      })
    })
    .then(this._getResponseData)
  }

  getAllCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    })
    .then(this._getResponseData)
  }

  postNewCard(values) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: values.name,
        link: values.link
      })
    })
    .then(this._getResponseData)
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._getResponseData)
  }

  changeLikeCardStatus(id, boolean) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: `${boolean ? 'PUT' : 'DELETE'}`,
      headers: this._headers
      })
      .then(this._getResponseData)
  }

}


export const api = new Api({
  url: 'http://mesto.kukucapl.nomoreparties.sbs',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  }
});