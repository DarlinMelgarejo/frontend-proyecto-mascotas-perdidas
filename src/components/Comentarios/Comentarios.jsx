import icono_enviar from "../../assets/images/icono_enviar.svg"

import { useEffect, useState } from "react"
import Box from "../Box"
import { obtenerComentariosDeUnReporte, registrarComentario } from "../../services/comentarios"
import { useUsuario } from "../../context/UsuarioContext"
import Comentario from "./Comentario"
import Toast from "../Toast"

const Comentarios = ({id_reporte_mascota}) => {
    const [toast, setToast] = useState({
        titulo: "",
        contenido: ""
    })
    const {usuario} = useUsuario()
    const [comentarios, setComentarios] = useState([])
    const [nuevoComentario, setNuevoComentario] = useState({
        contenido: "",
        usuario_id: null,
        reporte_mascota_id: id_reporte_mascota
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNuevoComentario({ ...nuevoComentario, [name]: value });
    };

    const comentar = async (e) => {
        e.preventDefault()
        try {
            const response = await registrarComentario(nuevoComentario)
            if(response.status === 201) {
                getComentarios()
                setNuevoComentario((prev) => ({
                    ...prev,
                    contenido: "",
                }));
            }
        } catch (error) {
            console.log("No se pudo comentar: " + error)
        }
    } 

    const getComentarios = async (mensaje) => {
        if (mensaje) {
            setToast({
                titulo: "Exitó",
                contenido: mensaje
            })

            setTimeout(() => {
                setToast({
                    titulo: "",
                    contenido: ""
                })
            }, 3000)
        }

        try {
            const response = await obtenerComentariosDeUnReporte(id_reporte_mascota)
            if(response.status === 200) {
                setComentarios(response.data.comentarios)
            } else if (response.status === 404) {
                setComentarios([])
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getComentarios()
    }, [])

    useEffect(() => {
        if (usuario) {
            setNuevoComentario((prev) => ({
                ...prev,
                usuario_id: usuario.id,
            }));
        }
    }, [usuario])
    

    return (
        <Box titulo="Comentarios" borde margenTitulo>
            <Toast titulo={toast.titulo} contenido={toast.contenido}></Toast>
            {
                comentarios.length > 0 ? (
                    comentarios.map((comentario) => (
                        <Comentario
                            key={comentario.id}
                            id={comentario.id}
                            usuario_id={comentario.usuario_id}
                            contenido={comentario.contenido}
                            creado_en={comentario.creado_en}
                            getComentarios={getComentarios}
                        />
                    ))
                ) : (
                    <div className="black-color text-bold py-4">No hay comentarios</div>
                )
            }
            <form onSubmit={comentar}>
                <div className="flex items-start gap-4">
                    <textarea
                        className="form-control form-control-dark"
                        id="contenido"
                        name="contenido"
                        placeholder="Escribe tu comentario aquí..."
                        value={nuevoComentario.contenido}
                        onChange={handleChange}
                        rows="4"
                        cols="50"
                    />
                    <button className="btn btn-secondary"><img src={icono_enviar} alt="Icono de Enviar" /></button>
                </div>
            </form>
        </Box>
    )
}

export default Comentarios