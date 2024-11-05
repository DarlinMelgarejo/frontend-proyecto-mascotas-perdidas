import icono_enviar from "../../assets/images/icono_enviar.svg"

import { useState } from "react"
import Box from "../Box"

const Comentarios = ({id_reporte_mascota, id_usuario}) => {
    const [comentariosReporte, setComentariosReporte] = useState(null)
    const [nuevoComentario, setNuevoComentario] = useState({
        contenido: "",
        usuario_id: id_usuario,
        reporte_mascota_id: id_reporte_mascota
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNuevoComentario({ ...nuevoComentario, [name]: value });
    };

    const comentar = (e) => {
        e.preventDefault()
        alert(nuevoComentario.contenido)
        setNuevoComentario({ ...nuevoComentario, contenido: "" })
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