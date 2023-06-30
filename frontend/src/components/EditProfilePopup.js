import PopupWithForm from './PopupWithForm.js'
import React from 'react'
import {CurrentUserContext} from '../contexts/CurrentUserContext.js'

export default function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  } 


  return (
    <PopupWithForm
      name="popup_edit"
      title="Редактировать профиль"
      button="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="form__input"
        name="username"
        type="text"
        id="user-name"
        placeholder="Имя"
        required minLength="2"
        maxLength="40"
        value={name || ''}
        onChange={handleNameChange}
      />
      <span className="form__input-error user-name-error"></span>
      <input
        className="form__input"
        name="userjob"
        type="text"
        id="user-job"
        placeholder="О себе"
        required minLength="2"
        maxLength="200"
        value={description || ''}
        onChange={handleDescriptionChange}
      />
      <span className="form__input-error user-job-error"></span>
    </PopupWithForm>
  );
}