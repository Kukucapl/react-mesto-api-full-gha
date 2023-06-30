import React from 'react';
import Card from './Card.js'
import {CurrentUserContext} from '../contexts/CurrentUserContext.js'

export default function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>

      <section className="profile">
        <div className="profile__avatar-edit" onClick={props.onEditAvatar}>
          <img className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})`}} />
        </div>
        <div className="profile__info">
          <h1 className="profile__user-name">{currentUser.name}</h1>
          <p className="profile__user-job">{currentUser.about}</p>
          <button className="profile__edit-button" type="button" aria-label="Редактировать" onClick={props.onEditProfile}></button>
        </div>
        <button className="profile__add-button" type="button" aria-label="Добавить" onClick={props.onAddPlace}></button>
      </section>
      
      <section className="elements">
        {props.cards.map((card) => (
          <Card key={card._id} {...card} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete}/>
        ))}
      </section>

    </main>
    );
}