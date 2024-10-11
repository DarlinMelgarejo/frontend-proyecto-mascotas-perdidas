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
                    <Link className="main-header__link" to="/buscar">Buscar</Link>
                    <Link className="main-header__link" to="/adoptar">Adoptar</Link>
                    {sesion ? (
                        <Link className="main-header__link" to="/reportar">Reportar</Link>
                    ) : (
                        <Link className="main-header__link" to="/nosotros">Sobre Nosotros</Link>
                    )}
                </nav>
                <div className="main-header__buttons">
                    {sesion ? (
                        <button className="main-header__button" onClick={cerrarSesion}>Cerrar Sesión</button>
                    ) : (
                        <>
                            <button className="main-header__button" onClick={registrarse}>Registrarse</button>
                            <button className="main-header__button" onClick={iniciarSesion}>Iniciar Sesión</button>
                        </>
                    )}
                </div>
            </div>
            <nav className="main-header__menu hidden">
                <Link className="main-header__link" to="/buscar">
                    <img src={buscar} alt="Icono Buscar" />
                    <span>Buscar</span>
                </Link>
                <Link className="main-header__link" to="/reportar">
                    <img src={reportar} alt="Icono Reportar" />
                    <span>Reportar</span>
                </Link>
                <Link className="main-header__link" to="/adoptar">
                    <img src={adoptar} alt="Icono Adoptar" />
                    <span>Adoptar</span>
                </Link>
                <Link className="main-header__link" to="/nosotros">
                    <img src={info} alt="Icono Nosotros" />
                    <span>Nosotros</span>
                </Link>
            </nav>
        </header>
    );
};

export default Header;
