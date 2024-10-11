const Search = () => {
    return (
        <div className="main-search">
            <h2 className="main-search__title">Buscar Animales Perdidos</h2>
            <div className="main-search__content">
                <input
                    className="main-search__input"
                    type="text"
                    placeholder="Nombre de mascota, raza, color"
                />
                <button className="main-search__button">Buscar</button>
            </div>
        </div>
    )
}

export default Search