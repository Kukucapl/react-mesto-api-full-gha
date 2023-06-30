import logo from '../images/logo.svg'
import { Link, useLocation } from 'react-router-dom'

export default function Header(props) {
  const location = useLocation();

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип" />

      {location.pathname === '/' && 
        <div className="header__navigation">
          <p className="header__email">{props.email}</p>
          <button onClick={props.onLogout} className="header__logout-button" >Выйти</button>
        </div>
      }

      {location.pathname === '/sign-up' && 
        <Link className="header__link" to="/sign-in">Войти</Link>
      }

     {location.pathname === '/sign-in' && 
        <Link className="header__link" to="/sign-up">Зарегистрироваться</Link>
      }

    </header>
  );
}