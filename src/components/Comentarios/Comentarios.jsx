import icono_enviar from "../../assets/images/icono_enviar.svg"

import { useState } from "react"
import Box from "../Box"
import { useUsuario } from "../../context/UsuarioContext"
import { registrarComentario } from "../../services/comentarios"

const Comentarios = ({id_reporte_mascota}) => {
    const {usuario} = useUsuario()
    const [comentariosReporte, setComentariosReporte] = useState(null)
    const [nuevoComentario, setNuevoComentario] = useState({
        contenido: "",
        usuario_id: usuario.id ?? 1,
        reporte_mascota_id: id_reporte_mascota
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNuevoComentario({ ...nuevoComentario, [name]: value });
        console.log(nuevoComentario.usuario_id)
    };

    const comentar = async (e) => {
        e.preventDefault()
        try {
            const response = await registrarComentario(nuevoComentario)
            if(response.status === 200) {

            }
        } catch (error) {
            console.log("No se pudo comentar: " + error)
        }
    } 

    return (
        <Box titulo="Comentarios" borde>
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