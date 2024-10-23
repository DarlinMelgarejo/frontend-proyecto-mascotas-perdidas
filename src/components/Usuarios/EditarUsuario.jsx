import icono_correo from "../../assets/images/icono-correo-24-secondary.png";
import icono_telefono from "../../assets/images/icono-telefono-24-secondary.png";
import icono_direccion from "../../assets/images/icono-ubicacion-24-secondary.png";

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "../Box";
import { obtenerPerfil, actualizarUsuario, actualizarFotoUsuario } from "../../services/usuarios"; // Importar la función

const EditarUsuario = () => {
    const [usuario, setUsuario] = useState({
        nombres: "",
        apellidos: "",
        correo: "",
        telefono: "",
        direccion: "",
        url_foto: "default.jpg",
    });
    const [nuevaFoto, setNuevaFoto] = useState(null);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNuevaFoto(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const getUsuario = async () => {
        try {
            const response = await obtenerPerfil();
            if (response.status === 200) {
                setUsuario(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuario({ ...usuario, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        try {
            // Actualizar foto de perfil si se ha seleccionado una nueva
            if (nuevaFoto) {
                formData.append('foto', fileInputRef.current.files[0]);
                const responseFoto = await actualizarFotoUsuario(formData);
                if (responseFoto.status === 200) {
                    alert('Perfil actualizado con éxito');
                }
            }

            // Actualizar otros datos del usuario
            const response = await actualizarUsuario(usuario);

            if (response.status === 200) {
                alert('Perfil actualizado con éxito');
                navigate('/perfil');
            }
        } catch (error) {
            console.error(error);
            alert('Error al actualizar el perfil');
        }
    };

    useEffect(() => {
        getUsuario();
    }, []);

    return (
        <div className="py-6 px-4 black-color w-1-2 mx-auto">
            <Box titulo="Editar Perfil" borde>
                <form encType="multipart/form-data" onSubmit={handleSubmit}>
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
                        <label htmlFor="nombres" className="text-bold mb-2">Nombres</label>
                        <input
                            className="form-control form-control-dark"
                            type="text"
                            name="nombres"
                            id="nombres"
                            value={usuario.nombres}
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
                            value={usuario.apellidos}
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
                                value={usuario.correo}
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
                                value={usuario.telefono}
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
                                value={usuario.direccion}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button className="btn btn-secondary" type="submit">Guardar Cambios</button>
                    </div>
                </form>
            </Box>
        </div>
    );
};

export default EditarUsuario;
