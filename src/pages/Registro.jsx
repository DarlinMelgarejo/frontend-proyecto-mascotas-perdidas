import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registrarUsuario } from "../services/usuarios"; // Asegúrate de que esta importación sea correcta

const Registro = () => {
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
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const changeData = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verifica que las contraseñas coincidan
        if (data.contraseña !== data.confirmarContraseña) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        try {
            // Llamar a la función de registrar usuario del servicio
            const response = await registrarUsuario(data);
            if (response.status === 201) {
                // Redirigir al usuario a la página de login después de un registro exitoso
                navigate('/login');
            }
        } catch (err) {
            console.error(err);
            if (err.response) {
                setError(err.response.data.mensaje || "Error al registrarse.");
            } else {
                setError("Error de conexión.");
            }
        }
    };

    return (
        <div className="registro">
            <div className="registro__content">
                <div className="registro__header py-6 px-6">
                    <h2 className="registro__title">Registro de Usuario</h2>
                    <p className="registro__description">Crea una cuenta para poder reportar animales</p>
                </div>
                <form className="py-6 px-6" onSubmit={handleSubmit}>
                    <div className="flex flex-column flex-row-m gap-4 mb-4">
                        <div className="flex flex-column w-1-2-m">
                            <label htmlFor="nombres" className="registro__label">Nombres</label>
                            <input
                                className="form-control"
                                type="text"
                                name="nombres"
                                id="nombres"
                                value={data.nombres}
                                onChange={changeData}
                                required // Campo requerido
                            />
                        </div>
                        <div className="flex flex-column w-1-2-m">
                            <label htmlFor="apellidos" className="registro__label">Apellidos</label>
                            <input
                                className="form-control"
                                type="text"
                                name="apellidos"
                                id="apellidos"
                                value={data.apellidos}
                                onChange={changeData}
                                required // Campo requerido
                            />
                        </div>
                    </div>
                    <div className="flex flex-column flex-row-m gap-4 mb-4">
                        <div className="flex flex-column w-1-2-m">
                            <label htmlFor="dni" className="registro__label">DNI</label>
                            <input
                                className="form-control"
                                type="text"
                                name="dni"
                                id="dni"
                                value={data.dni}
                                onChange={changeData}
                                required // Campo requerido
                            />
                        </div>
                        <div className="flex flex-column w-1-2-m">
                            <label htmlFor="correo" className="registro__label">Correo</label>
                            <input
                                className="form-control"
                                type="email"
                                name="correo"
                                id="correo"
                                value={data.correo}
                                onChange={changeData}
                                required // Campo requerido
                            />
                        </div>
                    </div>
                    <div className="flex flex-column flex-row-m gap-4 mb-4">
                        <div className="flex flex-column w-1-2-m">
                            <label htmlFor="contraseña" className="registro__label">Contraseña</label>
                            <input
                                className="form-control"
                                type="password"
                                name="contraseña"
                                id="contraseña"
                                value={data.contraseña}
                                onChange={changeData}
                                required // Campo requerido
                            />
                        </div>
                        <div className="flex flex-column w-1-2-m">
                            <label htmlFor="confirmarContraseña" className="registro__label">Confirmar Contraseña</label>
                            <input
                                className="form-control"
                                type="password"
                                name="confirmarContraseña"
                                id="confirmarContraseña"
                                value={data.confirmarContraseña}
                                onChange={changeData}
                                required // Campo requerido
                            />
                        </div>
                    </div>
                    <div className="flex flex-column mb-4">
                        <label htmlFor="telefono" className="registro__label">Teléfono</label>
                        <input
                            className="form-control"
                            type="tel"
                            name="telefono"
                            id="telefono"
                            value={data.telefono}
                            onChange={changeData}
                            required // Campo requerido
                        />
                    </div>
                    <div className="flex flex-column mb-4">
                        <label className="registro__label" htmlFor="procedencia">Procedencia</label>
                        <select className="form-control" id="procedencia" name="procedencia" value={data.procedencia} onChange={changeData} required>
                            <option value="">Seleccione</option>
                            <option value="Pacasmayo">Pacasmayo</option>
                            <option value="San Pedro de Lloc">San Pedro de Lloc</option>
                        </select>
                    </div>
                    <div className="flex flex-column mb-4">
                        <label htmlFor="direccion" className="registro__label">Dirección</label>
                        <input
                            className="form-control"
                            type="text"
                            name="direccion"
                            id="direccion"
                            value={data.direccion}
                            onChange={changeData}
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
                    {error && <p className="center-content py-2 tertiary-color text-bold">{error}</p>} {/* Mostrar mensaje de error */}
                </form>
            </div>
        </div>
    );
};

export default Registro;
