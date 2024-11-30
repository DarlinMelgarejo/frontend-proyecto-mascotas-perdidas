import { useState } from "react"; 
import { Link } from "react-router-dom"; 
import { useUsuario } from "../context/UsuarioContext";

const Login = () => {
    const [data, setData] = useState({ dni: "", contraseña: "", recordarme: false });
    const {login} = useUsuario() 

    const changeData = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const changeRecordarme = (event) => {
        setData({
            ...data,
            recordarme: event.target.checked
        }); // Actualiza el estado con el valor del checkbox
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
    
        login(data)
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
                            value={data.dni}
                            onChange={changeData}
                        />
                    </div>
                    <div className="flex flex-column mb-4">
                        <label htmlFor="contraseña" className="login__label">Contraseña</label>
                        <input
                            className="form-control"
                            type="password"
                            name="contraseña"
                            id="contraseña"
                            value={data.contraseña}
                            onChange={changeData}
                        />
                    </div>
                    <div className="flex flex-row mb-4">
                        <div className="flex flex-row items-center gap-2 w-1-4">
                            <input
                                type="checkbox" 
                                name="recordarme" 
                                id="recordarme"
                                value={data.recordarme}
                                onChange={changeRecordarme}
                            />
                            <label className="flex items-center gap-2 w-1-2 secondary-color mb-1" htmlFor="recordarme">Recordarme</label>
                        </div>
                        <Link className="secondary-color flex justify-end w-3-4" to="/restablecer">¿Olvidaste tu contraseña?</Link>
                    </div>
                    <div className="flex flex-row">
                        <button className="btn btn-tertiary w-full" type="submit">Iniciar Sesión</button>
                    </div>
                </form>
                <div className="flex flex-column center-content pb-8 px-6">
                    <Link className="secondary-color" to="/registro">¿No tienes una cuenta? Regístrate aquí</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
