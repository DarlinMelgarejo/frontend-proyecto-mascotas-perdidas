import logo from "../assets/images/logo.png";
import buscar from "../assets/images/icono-buscar.png";
import reportar from "../assets/images/icono-reportar.png";
import adoptar from "../assets/images/icono-adoptar.png";
import info from "../assets/images/icono-info.png";

import { Link, useNavigate } from "react-router-dom";
import { useSesion } from "../context/SesionContext ";
import axios from "axios";

const Header = () => {
    const { sesion, setSesion } = useSesion();
    const navigate = useNavigate();

    const registrarse = () => navigate('/registro')
    const iniciarSesion = () => navigate('/login')

    // Aquí llamas a tu API para cerrar sesión y luego actualizas el estado
    const cerrarSesion = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/usuarios/cerrar-sesion', { withCredentials: true });
    
            if (response.status === 200) {
                setSesion(null); // Esto cerraría la sesión
                navigate('/login');
            }
        } catch (err) {
            console.error("Error al cerrar sesión:", err);
        }
    };
    

    return (
        <header className="main-header">
            <div className="main-header__container">
                <Link to="/" className="main-header__logo">
                    <img src={logo} alt="Logo de Huellas Perdidas" />
                    <h1 className="main-header__title">Huellas Perdidas</h1>
                </Link>
                <nav className="main-header__menu">
                    <Link className="white-color" to="/buscar">Buscar</Link>
                    <Link className="white-color" to="/adoptar">Adoptar</Link>
                    {sesion ? (
                        <Link className="white-color" to="/reportar">Reportar</Link>
                    ) : (
                        <Link className="white-color" to="/nosotros">Sobre Nosotros</Link>
                    )}
                </nav>
                <div className="flex gap-4">
                    {sesion ? (
                        <button className="btn btn-tertiary" onClick={cerrarSesion}>Cerrar Sesión</button>
                    ) : (
                        <>
                            <button className="btn btn-tertiary" onClick={registrarse}>Registrarse</button>
                            <button className="btn btn-tertiary" onClick={iniciarSesion}>Iniciar Sesión</button>
                        </>
                    )}
                </div>
            </div>
            <nav className="main-header__menu hidden">
                <Link className="flex flex-column items-center white-color" to="/buscar">
                    <img src={buscar} alt="Icono Buscar" />
                    <span>Buscar</span>
                </Link>
                <Link className="flex flex-column items-center white-color" to="/reportar">
                    <img src={reportar} alt="Icono Reportar" />
                    <span>Reportar</span>
                </Link>
                <Link className="flex flex-column items-center white-color" to="/adoptar">
                    <img src={adoptar} alt="Icono Adoptar" />
                    <span>Adoptar</span>
                </Link>
                <Link className="flex flex-column items-center white-color" to="/nosotros">
                    <img src={info} alt="Icono Nosotros" />
                    <span>Nosotros</span>
                </Link>
            </nav>
        </header>
    );
};

export default Header;
