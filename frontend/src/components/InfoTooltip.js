import success from '../images/Success.svg'
import fail from '../images/Fail.svg'

export default function InfoTooltip(props) {
  return (
    <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
      <form className="form" name="info-form" id="info-form" onSubmit={props.onSubmit}>
        <button className="form__close-button" id="info-close-button" type="button" aria-label="Закрыть" onClick={props.onClose} />
        <img className="form__image" src={`${props.isSuccess ? success : fail}`} alt="Логотип" />
        <h2 className="form__title form__title_registration">
          {`${props.isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}`}
        </h2>
      </form>
    </div>
  );
}