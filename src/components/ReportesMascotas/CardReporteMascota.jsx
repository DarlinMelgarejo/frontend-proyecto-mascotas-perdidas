import icono_visualizar from "../../assets/images/icono-visualizar.svg"
import icono_editar from "../../assets/images/icono-editar.svg"
import icono_eliminar from "../../assets/images/icono-eliminar.svg"
import {eliminarReporte} from "../../services/reportesMascotas"
import { useNavigate } from "react-router-dom"
const CardReporteMascota = ({ id_reporte, url_imagen, nombre, especie, raza, color, procedencia, fecha_reporte, opciones }) => {
    const navigate = useNavigate()
    const revisar = (id) => navigate(`/reporte/${id}`)
    
    const eliminar = async (id) => {
        let eliminar = prompt("Esta seguro que desea eliminar el reporte?(si/no)")

        if(eliminar === "si") {
            const response = await eliminarReporte(id)
    
            if(response.status === 200) {
                alert(response.data.mensaje)
            }
        }
    }

    return (
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
            {opciones ? (
                <div className="flex flex-row justify-between gap-4">
                    <button className="btn btn-white w-p-40 h-p-40"><img src={icono_visualizar} alt="Icono de Visualizar" onClick={() => revisar(id_reporte)}/></button>
                    <button className="btn btn-white w-p-40 h-p-40"><img src={icono_editar} alt="Icono de Editar" /></button>
                    <button className="btn btn-white w-p-40 h-p-40"><img src={icono_eliminar} alt="Icono de Eliminar" onClick={() => eliminar(id_reporte)}/></button>
                </div>
            ) : (
                <button className="btn btn-dark" onClick={() => revisar(id_reporte)}>Ver Detalles</button>
            )}
        </div>
    )
}

export default CardReporteMascota