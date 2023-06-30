import React from 'react'
import { Route, Switch, useHistory } from 'react-router-dom';
import Header from './Header.js'
import Footer from './Footer.js'
import Main from './Main.js'
import PopupWithForm from './PopupWithForm.js'
import EditProfilePopup from './EditProfilePopup.js'
import EditAvatarPopup from './EditAvatarPopup.js'
import AddPlacePopup from './AddPlacePopup.js'
import ImagePopup from './ImagePopup.js'
import {api} from '../utils/Api.js'
import * as auth from '../utils/Auth.js'
import {CurrentUserContext} from '../contexts/CurrentUserContext.js'
import Login from './Login.js'
import Register from './Register.js'
import ProtectedRoute from './ProtectedRoute.js'
import InfoTooltip from './InfoTooltip.js'

export default function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser]= React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isRegisterSuccess, setRegisterSuccess] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const history = useHistory();

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(link, name) {
    setSelectedCard({link, name});
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard({});
    setInfoTooltipOpen(false)
  }

  function checkToken() {
    if (localStorage.getItem('token')){
      const token = localStorage.getItem('token');
      if(token) {
        auth.getContent(token)
        .then((res) => {
          setLoggedIn(true);
          setEmail(res.data.email);
          history.push('/')  
        })
      }
      
    }
  }

  React.useEffect (() => {
    checkToken()
  }, []);

  React.useEffect (() => {
    if (loggedIn) {
      api.getUserInfo()
      .then((res) => {
        setCurrentUser(res.data);
      })
      .catch((err) => {
        console.log(err)
      });
      api.getAllCards()
      .then((res) => {
        setCards(res)
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }, [loggedIn]);



  function handleUpdateUser(userInfo) {
    api.setUserInfo(userInfo.name, userInfo.about)
    .then((res) => {
      setCurrentUser(res.data);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err)
    });
  }

  function handleUpdateAvatar(userInfo) {
    api.setUserPhoto(userInfo.avatar)
    .then((res) => {
      setCurrentUser(res.data);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err)
    });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {
      console.log(err)
    });
  } 

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
    })
    .catch((err) => {
      console.log(err)
    });
  }

  function handleAddPlaceSubmit(card) {
    api.postNewCard(card)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err)
    });
  }

  function handleRegisterSubmit(password, email) {
    auth.register(password, email)
    .then(() => {
      setRegisterSuccess(true);
      setInfoTooltipOpen(true)
      history.push('/sign-in')
    })
    .catch((err) => {
      setRegisterSuccess(false);
      setInfoTooltipOpen(true)
      console.log(err)
    });
  }

  function handleLoginSubmit(password, email) {
    auth.authorize(password, email)
    .then((res) => {
      localStorage.setItem('token', res.token);
      setLoggedIn(true);
      setEmail(email);
      history.push('/');
    })
    .catch((err) => {
      console.log(err)
    });
  }

  function handleLogout() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    history.push('/sign-in')
  }

  return (
  <CurrentUserContext.Provider value={currentUser}>
    <div className="page">

      <Header email={email} onLogout={handleLogout} />

      <Switch>
        <ProtectedRoute 
          exact path="/"
          loggedIn={loggedIn}
          component={Main} 
          onEditAvatar={handleEditAvatarClick} 
          onEditProfile={handleEditProfileClick} 
          onAddPlace={handleAddPlaceClick} 
          onCardClick={handleCardClick} 
          cards={cards} 
          onCardLike={handleCardLike} 
          onCardDelete={handleCardDelete}
        />

        <Route path="/sign-up">
          <Register onRegister={handleRegisterSubmit} />
        </Route>

        <Route path="/sign-in">
          <Login onLogin={handleLoginSubmit} />
        </Route>
      </Switch>
      
      <Route exact path="/">
        <Footer />
      </Route>

      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>

      <PopupWithForm name="popup_confirm" title="Вы уверены?" button="Да" />

      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      <InfoTooltip isSuccess={isRegisterSuccess} isOpen={isInfoTooltipOpen} onClose={closeAllPopups} />

    </div>
  </CurrentUserContext.Provider>
  );
}