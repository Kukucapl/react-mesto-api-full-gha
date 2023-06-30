import React from 'react'
import { Link } from 'react-router-dom'

export default function Register(props) {
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
    props.onRegister(password, email)
  }
  

  return (
    <>
      <form className="auth" name="authform" id="auth-form" onSubmit={handleSubmit}>
        <h2 className="auth__title">Регистрация</h2>
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
        <button className="auth__save-button" type="submit" aria-label="Зарегистрироваться">Зарегистрироваться</button>
      </form>
      <p className="auth-subtitle">Уже зарегистрированы? <Link className="auth-subtitle__link" to="/sign-in">Войти</Link></p>
    </>
  );
}