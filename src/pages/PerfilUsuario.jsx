import { useNavigate } from "react-router-dom"
import Perfil from "../components/Perfil"

import { useUsuario } from "../context/UsuarioContext"

const PerfilUsuario = () => {
    const {usuario} = useUsuario()
    const navigate = useNavigate()
    return (
        <>
            { 
                usuario ? (
                    <Perfil 
                        nombres={usuario.nombres} 
                        apellidos={usuario.apellidos} 
                        url_foto={usuario.url_foto} 
                        fecha_registro={usuario.creado_en} 
                        correo={usuario.correo} 
                        telefono={usuario.telefono}
                        direccion={usuario.direccion}
                        procedencia={usuario.procedencia}
                    />
                ) : (
                    navigate("/login")
                )
            }
        </>
    )
}

export default PerfilUsuario