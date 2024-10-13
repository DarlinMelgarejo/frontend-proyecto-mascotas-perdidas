import "../assets/sass/login.scss"; 

import { useState } from "react"; 
import { Link, useNavigate } from "react-router-dom"; 
import axios from "axios"; 
import { useSesion } from "../context/SesionContext ";

const Login = () => {
    const [dni, setDNI] = useState(""); 
    const [contraseña, setContraseña] = useState(""); 
    const [error, setError] = useState(""); 
    const navigate = useNavigate(); 

    const { setSesion } = useSesion()
    const handleSubmit = async (e) => {
        e.preventDefault(); 
    
        try {
            // Llamar a la ruta de logueo
            const response = await axios.post('http://localhost:5000/api/usuarios/logear', {
                dni,
                contraseña,
            }, { withCredentials: true }); // Asegúrate de incluir esto
    
            if(response.status === 200) {
                // Aquí, después de iniciar sesión, obtén la información del usuario
                const userResponse = await axios.get('http://localhost:5000/api/usuarios/yo', { withCredentials: true });
                
                // Guarda la información del usuario en el contexto
                setSesion(userResponse.data); // Asegúrate de tener el setSesion disponible
        
                // Redirige al usuario a la página principal
                navigate('/'); 
            }
        } catch (err) {
            console.error(err); // Imprime el error en la consola
            if (err.response) {
                setError(err.response.data.mensaje || "Error al iniciar sesión");
            } else {
                setError("Error de conexión");
            }
        }
    };    

    return (
        <div className="login">
            <div className="login__content">
                <div className="login__header py-8 px-6">
                    <h2 className="login__title">Iniciar Sesión</h2>
                    <p className="login__description">Ingresa a tu cuenta de Huellas Perdidas</p>
                </div>
                <form className="py-8 px-6" onSubmit={handleSubmit}>
                    <div className="flex flex-column mb-4">
                        <label htmlFor="dni" className="login__label">DNI</label>
                        <input
                            className="form-control"
                            type="text"
                            name="dni"
                            id="dni"
                            value={dni}
                            onChange={(e) => setDNI(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-column mb-4">
                        <label htmlFor="contraseña" className="login__label">Contraseña</label>
                        <input
                            className="form-control"
                            type="password"
                            name="contraseña"
                            id="contraseña"
                            value={contraseña}
                            onChange={(e) => setContraseña(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-row mb-4">
                        <div className="flex flex-row items-center gap-2 w-1-4">
                            <input
                                type="checkbox" 
                                name="recordarme" 
                                id="recordarme" 
                            />
                            <label className="flex items-center gap-2 w-1-2 secondary-color mb-1" htmlFor="recordarme">Recordarme</label>
                        </div>
                        <Link className="secondary-color flex justify-end w-3-4" to="/olvidaste-contraseña">¿Olvidaste tu contraseña?</Link>
                    </div>
                </form>
                <div className="flex flex-column center-content pb-8 px-6">
                    {error && <p className="error">{error}</p>}
                    <button className="btn btn-tertiary w-full mb-4" type="submit">Iniciar Sesión</button>
                    <Link className="secondary-color" to="/registro">¿No tienes una cuenta? Regístrate aquí</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
