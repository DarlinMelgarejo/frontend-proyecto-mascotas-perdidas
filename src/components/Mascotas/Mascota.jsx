const Mascota = ({ url_imagen, nombre, especie, raza, color, procedencia, fecha_reporte}) => (
    <div className="card-mascota">
        <img className="card-mascota__image" src={url_imagen} alt="Imagen de mascota" />
        <div className="card-mascota__info">
            <span><b>{nombre}</b></span>
            <span><b>Tipo: </b>{especie}</span>
            <span><b>Raza: </b>{raza}</span>
            <span><b>Color: </b>{color}</span>
            <span><b>Procedencia: </b>{procedencia}</span>
            <span><b>Fecha Reporte: </b>{fecha_reporte}</span>
        </div>
        <button>Ver Detalles</button>
    </div>
)

export default Mascota