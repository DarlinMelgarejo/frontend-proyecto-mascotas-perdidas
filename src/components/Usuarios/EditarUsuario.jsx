import icono_correo from "../../assets/images/icono-correo-24-secondary.png"
import icono_telefono from "../../assets/images/icono-telefono-24-secondary.png"
import icono_direccion from "../../assets/images/icono-ubicacion-24-secondary.png"

import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import Box from "../Box"
import { actualizarUsuario } from "../../services/usuarios"
import { useUsuario } from "../../context/UsuarioContext"
import Toast from '../Toast';


const EditarUsuario = () => {
    const [toast, setToast] = useState()
    const {usuario, setUsuario, fetchUsuario} = useUsuario()
    const [datosUsuario, setDatosUsuario] = useState({
        nombres: "",
        apellidos: "",
        correo: "",
        telefono: "",
        direccion: "",
        url_foto: "",
    })

    const [nuevaFoto, setNuevaFoto] = useState(null)
    const fileInputRef = useRef(null)
    const navigate = useNavigate()

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

    const handleChange = (e) => {
        const { name, value } = e.target
        setDatosUsuario({ ...datosUsuario, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData()

        try {
            // Actualizar foto de perfil si se ha seleccionado una nueva
            if (nuevaFoto) {
                formData.append('foto_usuario', fileInputRef.current.files[0])
                // const responseFoto = await actualizarFotoUsuario(formData)
                // if (responseFoto.status === 200) {
                //     alert('Foto de Perfil actualizada con éxito')
                // }
            }
            formData.append('nombres', datosUsuario.nombres)
            formData.append('apellidos', datosUsuario.apellidos)
            formData.append('correo', datosUsuario.correo)
            formData.append('telefono', datosUsuario.telefono)
            formData.append('direccion', datosUsuario.direccion)
            formData.append('url_foto', datosUsuario.url_foto)
            
            // Actualizar otros datos del usuario
            const response = await actualizarUsuario(formData)
            
            if (response.status === 200) {
                setToast({
                    titulo: "Datos actualizados",
                    contenido: "Se actualizaron correctamente sus datos."
                })

                // setUsuario(datosUsuario)
                fetchUsuario()
                setTimeout(() => {
                    navigate('/perfil');
                }, 3000)
                //navigate('/perfil')
            }
        } catch (error) {
            console.error(error)
            alert('Error al actualizar el perfil')
        }
    }

    useEffect(() => {
        setDatosUsuario(usuario)
    }, [])

    return (
        <>
            {
            usuario ? (
                <div className="l-container black-color w-3-4-m w-1-2-xl">
                    <Box titulo="Editar Perfil" margenTitulo borde>
                        <form encType="multipart/form-data" onSubmit={handleSubmit}>
                            <div className="flex flex-column items-center">
                                <div className="editar-usuario__foto">
                                    <img 
                                        src={nuevaFoto || `${process.env.REACT_APP_URL_API}/uploads/usuarios/${datosUsuario.url_foto}`} 
                                        alt={`Foto de perfil de ${datosUsuario.nombres} ${datosUsuario.apellidos}`} 
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
                                <label htmlFor="nombres" className="text-bold mb-2">Nombres</label>
                                <input
                                    className="form-control form-control-dark"
                                    type="text"
                                    name="nombres"
                                    id="nombres"
                                    value={datosUsuario.nombres}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="flex flex-column mb-4">
                                <label htmlFor="apellidos" className="text-bold mb-2">Apellidos</label>
                                <input
                                    className="form-control form-control-dark"
                                    type="text"
                                    name="apellidos"
                                    id="apellidos"
                                    value={datosUsuario.apellidos}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="flex flex-column mb-4">
                                <label htmlFor="correo" className="text-bold mb-2">Correo</label>
                                <div className="flex flex-row items-center gap-2">
                                    <img src={icono_correo} alt="Icono de correo" />
                                    <input
                                        className="form-control form-control-dark"
                                        type="email"
                                        name="correo"
                                        id="correo"
                                        value={datosUsuario.correo}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex flex-column mb-4">
                                <label htmlFor="telefono" className="text-bold mb-2">Teléfono</label>
                                <div className="flex flex-row items-center gap-2">
                                    <img src={icono_telefono} alt="Icono de teléfono" />
                                    <input
                                        className="form-control form-control-dark"
                                        type="tel"
                                        name="telefono"
                                        id="telefono"
                                        value={datosUsuario.telefono}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex flex-column mb-12">
                                <label htmlFor="direccion" className="text-bold mb-2">Dirección</label>
                                <div className="flex flex-row items-center gap-2">
                                    <img src={icono_direccion} alt="Icono de dirección" />
                                    <input
                                        className="form-control form-control-dark"
                                        type="text"
                                        name="direccion"
                                        id="direccion"
                                        value={datosUsuario.direccion}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button className="btn btn-secondary" type="submit">Guardar Cambios</button>
                            </div>
                            {
                                toast && (
                                    <Toast titulo={toast.titulo} contenido={toast.contenido}></Toast>
                                )
                            }
                        </form>
                    </Box>
                </div>
            ) : (
                navigate("/")
            )
            }
        </>
    )
}

export default EditarUsuario
