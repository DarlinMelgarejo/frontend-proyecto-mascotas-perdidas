import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registrarUsuario } from "../../services/usuarios"
import Toast from "../Toast";

const RegistrarUsuario = () => {
    const [toast, setToast] = useState()

    const [data, setData] = useState({
        nombres: "",
        apellidos: "",
        dni: "",
        correo: "",
        contraseña: "",
        confirmarContraseña: "",
        telefono: "",
        procedencia: "",
        direccion: "",
    });

    const navigate = useNavigate();

    const actualizarCampos = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const enviarFormulario = async (e) => {
        e.preventDefault();

        // Verifica que las contraseñas coincidan
        if (data.contraseña !== data.confirmarContraseña) {
            setToast({
                titulo: "Hubo un error",
                contenido: "Las contraseñas no coinciden. Intentelo de nuevo."
            })

            return;
        }

        try {
            // Llamar a la función de registrar usuario del servicio
            const response = await registrarUsuario(data);
            if (response.status === 201) {
                setToast({
                    titulo: "Registro exitoso",
                    contenido: "Tu cuenta ha sido creada. Ahora puedes iniciar sesión"
                })

                // Redirigir al usuario a la página de login después de un registro exitoso
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            }
        } catch (err) {
            setToast({
                titulo: "Error al registrarse",
                contenido: "No se ha podido crear tu cuenta."
            })
        }
    };

    return (
        <form className="py-6 px-6" onSubmit={enviarFormulario}>            
            <div className="flex flex-column flex-row-m gap-4 mb-4">
                <div className="flex flex-column w-1-2-m">
                    <label htmlFor="nombres" className="form-label form-label-primary">Nombres</label>
                    <input
                        className="form-control"
                        type="text"
                        name="nombres"
                        id="nombres"
                        value={data.nombres}
                        onChange={actualizarCampos}
                        required // Campo requerido
                    />
                </div>
                <div className="flex flex-column w-1-2-m">
                    <label htmlFor="apellidos" className="form-label form-label-primary">Apellidos</label>
                    <input
                        className="form-control"
                        type="text"
                        name="apellidos"
                        id="apellidos"
                        value={data.apellidos}
                        onChange={actualizarCampos}
                        required // Campo requerido
                    />
                </div>
            </div>
            <div className="flex flex-column flex-row-m gap-4 mb-4">
                <div className="flex flex-column w-1-2-m">
                    <label htmlFor="dni" className="form-label form-label-primary">DNI</label>
                    <input
                        className="form-control"
                        type="text"
                        name="dni"
                        id="dni"
                        value={data.dni}
                        onChange={actualizarCampos}
                        required // Campo requerido
                    />
                </div>
                <div className="flex flex-column w-1-2-m">
                    <label htmlFor="correo" className="form-label form-label-primary">Correo</label>
                    <input
                        className="form-control"
                        type="email"
                        name="correo"
                        id="correo"
                        value={data.correo}
                        onChange={actualizarCampos}
                        required // Campo requerido
                    />
                </div>
            </div>
            <div className="flex flex-column flex-row-m gap-4 mb-4">
                <div className="flex flex-column w-1-2-m">
                    <label htmlFor="contraseña" className="form-label form-label-primary">Contraseña</label>
                    <input
                        className="form-control"
                        type="password"
                        name="contraseña"
                        id="contraseña"
                        value={data.contraseña}
                        onChange={actualizarCampos}
                        required // Campo requerido
                    />
                </div>
                <div className="flex flex-column w-1-2-m">
                    <label htmlFor="confirmarContraseña" className="form-label form-label-primary">Confirmar Contraseña</label>
                    <input
                        className="form-control"
                        type="password"
                        name="confirmarContraseña"
                        id="confirmarContraseña"
                        value={data.confirmarContraseña}
                        onChange={actualizarCampos}
                        required // Campo requerido
                    />
                </div>
            </div>
            <div className="flex flex-column mb-4">
                <label htmlFor="telefono" className="form-label form-label-primary">Teléfono</label>
                <input
                    className="form-control"
                    type="tel"
                    name="telefono"
                    id="telefono"
                    value={data.telefono}
                    onChange={actualizarCampos}
                    required // Campo requerido
                />
            </div>
            <div className="flex flex-column mb-4">
                <label className="form-label form-label-primary" htmlFor="procedencia">Procedencia</label>
                <select className="form-control" id="procedencia" name="procedencia" value={data.procedencia} onChange={actualizarCampos} required>
                    <option value="">Seleccione</option>
                    <option value="Pacasmayo">Pacasmayo</option>
                    <option value="San Pedro de Lloc">San Pedro de Lloc</option>
                </select>
            </div>
            <div className="flex flex-column mb-4">
                <label htmlFor="direccion" className="form-label form-label-primary">Dirección</label>
                <input
                    className="form-control"
                    type="text"
                    name="direccion"
                    id="direccion"
                    value={data.direccion}
                    onChange={actualizarCampos}
                    required // Campo requerido
                />
            </div>
            <div className="flex flex-row items-center gap-2 mb-6 py-2">
                <input
                    type="checkbox" 
                    name="acepto" 
                    id="acepto" 
                    required // Campo requerido para términos y condiciones
                />
                <label className="flex gap-2 w-full secondary-color mb-1" htmlFor="acepto">Acepto los términos y condiciones y la política de privacidad</label>
            </div>
            <div className="flex flex-column center-content">
                <button className="btn btn-tertiary w-full" type="submit">Registrarse</button>
            </div>
            {
                toast && (
                    <Toast titulo={toast.titulo} contenido={toast.contenido}></Toast>
                )
            }
        </form>
    )
}

export default RegistrarUsuario