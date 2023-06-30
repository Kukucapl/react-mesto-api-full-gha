import React from 'react'
import { authorize } from '../utils/Auth.js'

export default function Login(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onLogin(password, email)
  }
  
    return (
      <div>
        <form className="auth" name="authform" id="auth-form" onSubmit={handleSubmit}>
          <h2 className="auth__title">Вход</h2>
          <input
            className="auth__input"
            name="useremail"
            type="email"
            id="user-email"
            placeholder="Email"
            required
            value={email || ''}
            onChange={handleEmailChange}
          />
          <input
            className="auth__input"
            name="userpassword"
            type="password"
            id="user-password"
            placeholder="Пароль"
            required
            value={password || ''}
            onChange={handlePasswordChange}
          />
          <button className="auth__save-button" type="submit" aria-label="Войти">Войти</button>
        </form>
      </div>
    );
  }