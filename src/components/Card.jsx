const Card = ({icono, cantidad, contenido}) => {

    return(
        <div className="card">
            <img className="card__icon" src={icono} alt="Icono de card" />
            <strong className="card__count">{cantidad}</strong>
            <p className="card__content">{contenido}</p>
        </div>
    )
}

export default Card