export default function PopupWithForm(props) {
  return (
    <div className={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <form className="form" name={`${props.name}-form`} id={`${props.name}-form`} onSubmit={props.onSubmit}>
        <button className="form__close-button" id={`${props.name}-close-button`} type="button" aria-label="Закрыть" onClick={props.onClose} />
        <h2 className="form__title">{props.title}</h2>
        {props.children}
        <button className="form__save-button" type="submit" aria-label={props.button}>{props.button}</button>
      </form>
    </div>
  );
}