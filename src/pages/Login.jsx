import "../assets/sass/login.scss"; 

import { useState } from "react"; 
import { useNavigate } from "react-router-dom"; 
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
                <div className="login__header">
                    <h2>Iniciar Sesión</h2>
                    <p>Ingresa a tu cuenta de SOS Mascotas</p>
                </div>
                <form className="login__form" onSubmit={handleSubmit}>
                    <div className="login__section">
                        <label htmlFor="dni" className="login__label">DNI</label>
                        <input
                            type="text"
                            name="dni"
                            id="dni"
                            value={dni}
                            onChange={(e) => setDNI(e.target.value)}
                        />
                    </div>
                    <div className="login__section">
                        <label htmlFor="contraseña" className="login__label">Contraseña</label>
                        <input
                            type="password"
                            name="contraseña"
                            id="contraseña"
                            value={contraseña}
                            onChange={(e) => setContraseña(e.target.value)}
                        />
                    </div>
                    {error && <p className="error">{error}</p>}
                    <div className="login__footer">
                        <button type="submit">Iniciar Sesión</button>
                        <p>¿No tienes una cuenta? Regístrate aquí</p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
