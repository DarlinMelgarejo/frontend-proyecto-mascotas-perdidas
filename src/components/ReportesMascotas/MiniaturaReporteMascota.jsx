const MiniaturaReporteMascota = ({ url_foto_mascota, nombre_mascota, especie_mascota, estado_mascota, fecha_reporte }) => {

    return (
        <div className="miniatura-reporte-mascota black-color flex items-center gap-4">
            <div className="miniatura-reporte-mascota__image">
                <img src={url_foto_mascota} alt={`Foto de ${nombre_mascota}`} />
            </div>
            <div className="flex flex-column">
                <h6 className="mb-1">{nombre_mascota}</h6>
                <span>{`${especie_mascota} - ${estado_mascota}`}</span>
                <span>{`Reportado el ${fecha_reporte}`}</span>
            </div>
        </div>
    )
}

export default MiniaturaReporteMascota