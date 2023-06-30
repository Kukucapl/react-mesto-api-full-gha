import React from 'react'
import {CurrentUserContext} from '../contexts/CurrentUserContext.js'

export default function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.owner === currentUser._id;
  const isLiked = props.likes.some(i => i === currentUser._id);
  console.log('uuuuuhhhh')
  const cardLikeButtonClassName = (`element__like-button ${isLiked ? 'element__like-button_active' : ''}`); 
  function handleClick() {
    props.onCardClick(props.link, props.name);
  }  

  function handleLikeClick() {
    props.onCardLike(props);
  }

  function handleDeleteClick() {
    props.onCardDelete(props);
  }  

  return (
    <article className="element">
    <button className="element__delete-button" type="button" aria-label="Удалить" disabled={isOwn ? false : true} onClick={handleDeleteClick} />
    <img className="element__image" style={{ backgroundImage: `url(${props.link})`}} onClick={handleClick}/>
    <h2 className="element__title">{props.name}</h2>
    <div className="element__like-container">
      <button className={cardLikeButtonClassName} type="button" aria-label="Нравится" onClick={handleLikeClick}></button>
      <p className={"element__like-counter"}>{props.likes.length}</p>
    </div>
  </article>
  );
}