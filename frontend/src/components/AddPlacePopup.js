import PopupWithForm from './PopupWithForm.js'
import React from 'react'

export default function AddPlacePopup(props) {
  const [link, setLink] = React.useState('');
  const [name, setName] = React.useState('');

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  React.useEffect (() => {
    if(props.isOpen) {
      setLink('');
      setName('');
    }
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name,
      link
    });
  } 

  return (
    <PopupWithForm name="popup_add" title="Новое место" button="Создать" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <input 
        className="form__input"
        name="name"
        type="text"
        id="place-name"
        placeholder="Название"
        required minLength="2"
        maxLength="30"
        value={name || ''}
        onChange={handleNameChange}
      />
      <span className="form__input-error place-name-error"></span>
      <input
        className="form__input"
        name="link" type="url"
        id="place-link"
        placeholder="Ссылка на картинку"
        required value={link || ''}
        onChange={handleLinkChange}
      />
      <span className="form__input-error place-link-error"></span>
    </PopupWithForm>
  );
}