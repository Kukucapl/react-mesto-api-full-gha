export default function ImagePopup(props) {
  return (
    <div className={`popup popup_figure ${'link' in props.card ? 'popup_opened' : ''}`}>
      <figure className="figure">
        <button className="figure__close-button" id="popup_figure-close-button" type="button" aria-label="Закрыть" onClick={props.onClose} />
        <img className="figure__image" src={props.card.link} alt={props.card.name} />
        <figcaption className="figure__caption">{props.card.name}</figcaption>
      </figure>
    </div>
    );
}