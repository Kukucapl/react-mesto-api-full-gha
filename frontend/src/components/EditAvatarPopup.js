import PopupWithForm from './PopupWithForm.js'
import React from 'react'

export default function EditAvatarPopup(props) {
  const avatarRef = React.useRef('');
  
  React.useEffect (() => {
    avatarRef.current.value = ''
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  } 

  return (
    <PopupWithForm
      name="popup_edit-photo"
      title="Обновить аватар"
      button="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input ref={avatarRef} className="form__input" name="userphoto" type="url" id="user-photo" placeholder="Ссылка на картинку" required />
      <span className="form__input-error user-photo-error"></span>
    </PopupWithForm>
  );
}