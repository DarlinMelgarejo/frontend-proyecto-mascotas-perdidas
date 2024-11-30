import icono_visualizar from "../../assets/images/icono-visualizar.svg"
import icono_editar from "../../assets/images/icono-editar.svg"
import icono_resolver from "../../assets/images/icono-resolver.svg"
import icono_eliminar from "../../assets/images/icono-eliminar.svg"
import {eliminarReporte} from "../../services/reportesMascotas"
import { useNavigate } from "react-router-dom"
import Modal from "../Modal"
import { useState } from "react"
const CardReporteMascota = ({ id_reporte, url_imagen, nombre, especie, raza, color, procedencia, fecha_reporte, opciones }) => {
    const [modalEliminar, setModalEliminar] = useState(false)
    const [modalEstadoReporte, setModalEstadoReporte] = useState(false)
    
    const navigate = useNavigate()

    const revisar = (id) => navigate(`/reporte/${id}`)
    
    const editar = (id) => navigate(`/editar-reporte/${id}`)

    const eliminar = async (id) => {
        setModalEliminar(false)

        try {
            const response = await eliminarReporte(id)
            
            if(response.status === 200) {
                navigate("/")
            }
        } catch (error) {
            console.error(error)
        }
    }

    const actualizarEstadoReporte = async (id) => {
        setModalEstadoReporte(false)
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
            <Modal abierto={modalEliminar} cerrar={() => {setModalEliminar(false)}} funcion={() => eliminar(id_reporte)} boton="Eliminar">
                <h6>¿Estás seguro?</h6>
                <p className="mb-4 text-justify">Esta acción no se puede deshacer. Se eliminará permanentemente el comentario en este reporte.</p>
            </Modal>
            <Modal abierto={modalEstadoReporte} cerrar={() => {setModalEstadoReporte(false)}} funcion={() => actualizarEstadoReporte(id_reporte)} boton="Resuelto">
                <h6>¿Estás seguro?</h6>
                <p className="mb-4 text-justify">Esta acción no se puede deshacer. Solo se debe de marcar esta opción si el reporte fue resuelto.</p>
            </Modal>
            {
                opciones ? (
                    <div className="flex flex-row justify-between gap-4">
                        <button className="btn btn-white" title="Ver reporte" onClick={() => revisar(id_reporte)}><img className="secondary-color" src={icono_visualizar} alt="Icono de Visualizar" width="20px" height="20px"/></button>
                        <button className="btn btn-white" title="Editar reporte" onClick={() => editar(id_reporte)}><img src={icono_editar} alt="Icono de Editar" width="18px" height="18px"/></button>
                        <button className="btn btn-white" title="Resolver reporte" onClick={() => setModalEstadoReporte(true)}><img src={icono_resolver} alt="Icono de resolver" width="22px" height="22px"/></button>
                        <button className="btn btn-white" title="Eliminar reporte" onClick={() => setModalEliminar(true)}><img src={icono_eliminar} alt="Icono de Eliminar" width="18px" height="18px"/></button>
                    </div>
                ) : (
                    <button className="btn btn-dark" onClick={() => revisar(id_reporte)}>Ver Detalles</button>
                )
            }


        </div>
    )
}

export default CardReporteMascota