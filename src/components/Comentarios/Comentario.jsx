import { useState, useEffect, useRef } from "react"
import { obtenerUsuarioPorId } from "../../services/usuarios"
import { useUsuario } from "../../context/UsuarioContext"

const Comentario = ({ contenido, usuario_id, creado_en }) => {
    const {usuario} = useUsuario()

    const [usuarioComentario, setUsuarioComentario] = useState(null)

    const comentarioReferencia = useRef()

    const getUsuario = async () => {
        try {
            const response = await obtenerUsuarioPorId(usuario_id)
            if(response.status === 200) {
                console.log(response.data)
                setUsuarioComentario(response.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const reportar = () => {
        alert("Se reporte el comentario")
    }

    useEffect(() => {
        getUsuario()
    }, [])
    
    return (
        <>
            {
                usuarioComentario !== null && usuarioComentario !== undefined ? (
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
                                    <button className="btn btn-alert">Eliminar</button>
                                )
                            }
                        </div>
                    </div>
                ) : (
                    <div className="black-color text-bold">No se puedo obtener el comentario</div>
                )
            }
        </>
    )
}

export default Comentario