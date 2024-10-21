import { useEffect, useState } from "react"
import Footer from "../templates/Footer"
import Header from "../templates/Header"
import Perfil from "../components/Perfil"

import { obtenerPerfil } from "../services/usuarios"

const PerfilUsuario = () => {
    const [usuario, setUsuario] = useState()

    const getUsuario = async () => {
        try {
            const response = await obtenerPerfil();

            if(response.status === 200) {
                setUsuario(response.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect(() => {
        getUsuario()
    }, [])

    return (
        <>
            <Header></Header>

            {usuario
            ?   <Perfil 
                    nombres={usuario.nombres} 
                    apellidos={usuario.apellidos} 
                    url_foto={usuario.url_foto} 
                    fecha_registro={usuario.creado_en} 
                    correo={usuario.correo} 
                    telefono={usuario.telefono}
                    direccion={usuario.direccion}
                    procedencia={usuario.procedencia}
                />
            : <div>error</div>
            }            

            
            <Footer></Footer>
        </>
    )
}

export default PerfilUsuario