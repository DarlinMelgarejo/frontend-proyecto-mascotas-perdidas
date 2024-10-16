const Section = ({numero, titulo, contenido}) => {

    return (
        <div className="section">
            <span className="section__number fs-6">{numero}</span>
            <h4 className="section__title">{titulo}</h4>
            <p className="section__content">{contenido}</p>
        </div>
    )
}

export default Section