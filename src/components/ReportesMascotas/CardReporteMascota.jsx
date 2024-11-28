import icono_visualizar from "../../assets/images/icono-visualizar.svg"
import icono_editar from "../../assets/images/icono-editar.svg"
import icono_eliminar from "../../assets/images/icono-eliminar.svg"
import {eliminarReporte} from "../../services/reportesMascotas"
import { useNavigate } from "react-router-dom"
import Modal from "../Modal"
import { useState } from "react"
const CardReporteMascota = ({ id_reporte, url_imagen, nombre, especie, raza, color, procedencia, fecha_reporte, opciones }) => {
    const [modalAbierto, setModalAbierto] = useState(false)
    
    const navigate = useNavigate()

    const revisar = (id) => navigate(`/reporte/${id}`)
    
    const editar = (id) => navigate(`/editar-reporte/${id}`)

    const eliminar = async (id) => {
        setModalAbierto(false)

        try {
            const response = await eliminarReporte(id)
            
            if(response.status === 200) {
                navigate("/")
            }
        } catch (error) {
            console.error(error)
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
            <Modal abierto={modalAbierto} cerrar={() => {setModalAbierto(false)}} funcion={() => eliminar(id_reporte)} boton="Eliminar">
                <h6>¿Estás seguro?</h6>
                <p className="mb-4 text-justify">Esta acción no se puede deshacer. Se eliminará permanentemente el comentario en este reporte.</p>
            </Modal>
            {
                opciones ? (
                    <div className="flex flex-row justify-between gap-4">
                        <button className="btn btn-white w-p-40 h-p-40" onClick={() => revisar(id_reporte)}><img src={icono_visualizar} alt="Icono de Visualizar"/></button>
                        <button className="btn btn-white w-p-40 h-p-40" onClick={() => editar(id_reporte)}><img src={icono_editar} alt="Icono de Editar" /></button>
                        <button className="btn btn-white w-p-40 h-p-40" onClick={() => setModalAbierto(true)}><img src={icono_eliminar} alt="Icono de Eliminar"/></button>
                    </div>
                ) : (
                    <button className="btn btn-dark" onClick={() => revisar(id_reporte)}>Ver Detalles</button>
                )
            }


        </div>
    )
}

export default CardReporteMascota