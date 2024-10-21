import icono_correo from "../../assets/images/icono-correo-24-secondary.png"
import icono_telefono from "../../assets/images/icono-telefono-24-secondary.png"
import icono_direccion from "../../assets/images/icono-ubicacion-24-secondary.png"


import { useRef, useState } from "react"
import Box from "../Box"

const EditarUsuario = () => {
    const [usuario, setUsuario] = useState({
        nombres: "Darlin Yeilin",
        apellidos: "Melgarejo Miranda",
        email: "dymm.latino4@gmail.com",
        telefono: "912851961",
        procedencia: "San Pedro de Lloc",
        direccion: "Calle Principal 123, Ciudad",
        url_foto: "default.jpg",
    })
    const [nuevaFoto, setNuevaFoto] = useState(null)
    const fileInputRef = useRef(null)

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setNuevaFoto(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <div className="py-6 px-4 black-color w-1-2 mx-auto">
            <Box titulo="Editar Perfil" borde>
                <form encType="multipart/form-data">
                    <div className="flex flex-column items-center">
                        <div className="editar-usuario__foto">
                            <img 
                                src={nuevaFoto || `http://localhost:5000/uploads/usuarios/${usuario.url_foto}`} 
                                alt={`Foto de perfil de ${usuario.nombres} ${usuario.apellidos}`}
                                title="Cambiar foto de perfil" 
                                onClick={() => fileInputRef.current.click()}
                            />
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden"
                        />
                        <button
                            className="btn btn-white"
                            type="button"
                            onClick={() => fileInputRef.current.click()}
                        >
                            Cambiar foto de perfil
                        </button>
                    </div>
                    <div className="flex flex-column mb-4">
                        <label htmlFor="nombres" className="mb-2">Nombres</label>
                        <input
                            className="form-control form-control-dark"
                            type="text"
                            name="nombres"
                            id="nombres"
                            required // Campo requerido
                        />
                    </div>
                    <div className="flex flex-column mb-4">
                        <label htmlFor="apellidos" className="mb-2">Apellidos</label>
                        <input
                            className="form-control form-control-dark"
                            type="text"
                            name="apellidos"
                            id="apellidos"
                            required // Campo requerido
                        />
                    </div>
                    <div className="flex flex-column mb-4">
                        <label htmlFor="correo" className="mb-2">Correo</label>
                        <div className="flex flex-row items-center gap-2">
                            <img src={icono_correo} alt="Icono de correo" />
                            <input
                                className="form-control form-control-dark"
                                type="text"
                                name="correo"
                                id="correo"
                                required // Campo requerido
                            />
                        </div>
                    </div>
                    <div className="flex flex-column mb-4">
                        <label htmlFor="telefono" className="mb-2">Teléfono</label>
                        <div className="flex flex-row items-center gap-2">
                            <img src={icono_telefono} alt="Icono de correo" />
                            <input
                                className="form-control form-control-dark"
                                type="text"
                                name="telefono"
                                id="telefono"
                                required // Campo requerido
                            />
                        </div>
                    </div>
                    <div className="flex flex-column mb-12">
                        <label htmlFor="direccion" className="mb-2">Dirección</label>
                        <div className="flex flex-row items-center gap-2">
                            <img src={icono_direccion} alt="Icono de correo" />
                            <input
                                className="form-control form-control-dark"
                                type="text"
                                name="direccion"
                                id="direccion"
                                required // Campo requerido
                            />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button className="btn btn-secondary" type="submit">Guardar Cambios</button>
                    </div>
                </form>
            </Box>
        </div>
    )
}

export default EditarUsuario