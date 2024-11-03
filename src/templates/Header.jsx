import logo from "../assets/images/logo.png";
import buscar from "../assets/images/icono-buscar-24.png";
import reportar from "../assets/images/icono-reportar-24.png";
import adoptar from "../assets/images/icono-adoptar-24.png";
import info from "../assets/images/icono-info-24.png";

import { Link, useNavigate } from "react-router-dom";
import { cerrarSesion, verificarAutenticacion } from "../services/usuarios";
import { useEffect, useState } from "react";

const Header = () => {
    const [sesion, setSesion] = useState(false); // Para manejar el estado de la sesión
    const navigate = useNavigate();

    const registrarse = () => navigate('/registro');
    const iniciarSesion = () => navigate('/login');

    // Llamar a la función para verificar si el usuario está autenticado al cargar el componente
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await verificarAutenticacion(); // Llamar al servicio
                if (response.data.authenticated) { // Cambia esto a `response.data.authenticated` para acceder correctamente
                    setSesion(true); // Si está autenticado, guardar el estado de la sesión
                } else {
                    setSesion(false); // Si no está autenticado, resetear la sesión
                }
            } catch (err) {
                console.error("Error al verificar la autenticación:", err);
                setSesion(false); // Si hay algún error, asumir que no está autenticado
            }
        };

        checkAuth(); // Ejecutar la verificación al cargar el componente
    }, []); // Dependencias vacías para que solo se ejecute al cargar

    // Función para cerrar la sesión
    const handleCerrarSesion = async () => {
        try {
            const response = await cerrarSesion();
            if (response.status === 200) {
                setSesion(false); // Esto cerraría la sesión
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
                <div className="flex gap-3">
                    {sesion ? (
                        <button className="btn btn-tertiary" onClick={handleCerrarSesion}>Cerrar Sesión</button>
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
