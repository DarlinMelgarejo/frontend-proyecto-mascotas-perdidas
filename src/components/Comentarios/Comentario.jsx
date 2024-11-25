import { useState, useEffect, useRef } from "react"
import { obtenerUsuarioPorId } from "../../services/usuarios"
import { useUsuario } from "../../context/UsuarioContext"
import Modal from "../Modal"
import { eliminarComentario } from "../../services/comentarios"

const Comentario = ({ id, contenido, usuario_id, creado_en, getComentarios }) => {
    const {usuario} = useUsuario()

    const [modalAbierto, setModalAbierto] = useState(false)
    const [usuarioComentario, setUsuarioComentario] = useState({})

    const comentarioReferencia = useRef()

    const getUsuario = async () => {
        try {
            const response = await obtenerUsuarioPorId(usuario_id)
            if(response.status === 200) {
                // console.log(response.data.usuario)
                setUsuarioComentario(response.data.usuario)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const reportar = () => {
        alert("Se reporte el comentario")
    }


    const eliminar = async (id) => {
        setModalAbierto(false)

        try {
            const response =  await eliminarComentario(id)
            if (response.status === 200) {
                getComentarios()
            }
        } catch (error) {
            console.error(error)
        }
    }
    

    useEffect(() => {
        getUsuario()
    }, [])
    
    return (
        <>
            {
                usuarioComentario.id ? (
                    <>
                        <div className="comentario" ref={comentarioReferencia}>
                            <div className="comentario__foto-usuario">
                                <img src={`${process.env.REACT_APP_URL_API}/uploads/usuarios/${usuarioComentario.url_foto}`} alt={`Foto de perfil de ${usuarioComentario.nombres} ${usuarioComentario.apellidos}`} />
                            </div>
                            <div className="comentario__content">
                                <span className="text-bold">{`${usuarioComentario.nombres.split(" ")[0]} ${usuarioComentario.apellidos.split(" ")[0]}`}</span>
                                <span>{creado_en.split("T")[0]}</span>
                                <p className="mt-2">{contenido}</p>
                            </div>
                            <div className="comentario__report">
                                {   
                                    usuario.id !== usuarioComentario.id ? (
                                        <button className="btn btn-warning" onClick={reportar}>Reportar</button>
                                    ) : (
                                        <button className="btn btn-alert" onClick={() => setModalAbierto(true)}>Eliminar</button>
                                    )
                                }
                            </div>
                        </div>

                        <Modal abierto={modalAbierto} cerrar={() => {setModalAbierto(false)}} funcion={() => eliminar(id)} boton="Eliminar">
                            <h6>¿Estás seguro?</h6>
                            <p className="mb-4 text-justify">Esta acción no se puede deshacer. Se eliminará permanentemente el comentario en este reporte.</p>
                        </Modal>
                    </>
                ) : (
                    <div className="black-color text-bold">No se puedo obtener el comentario</div>
                )
            }
        </>
    )
}

export default Comentario