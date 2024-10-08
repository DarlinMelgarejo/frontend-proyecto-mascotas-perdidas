import logo from "../assets/images/logo.png";
import buscar from "../assets/images/buscar.png";
import reportar from "../assets/images/reportar.png";
import adoptar from "../assets/images/adoptar.png";
import info from "../assets/images/info.png";

import "../assets/sass/components/header.scss";

import { Link } from "react-router-dom";

const Header = () => (
    <header className="main-header">
        <div className="container">
            <div className="first">
                <Link to="/" className="main-header__logo">
                    <img src={logo} alt="Logo de SOS Mascotas" />
                    <span>SOS Mascotas</span>
                </Link>
                <nav className="main-header__menu">
                    <Link className="main-header__link" to="/buscar">Buscar</Link>
                    <Link className="main-header__link" to="/reportar">Reportar</Link>
                    <Link className="main-header__link" to="/adoptar">Adoptar</Link>
                    <Link className="main-header__link" to="/nosotros">Sobre Nosotros</Link>
                </nav>
                <div>
                    <button>Reportar Animal</button>
                </div>
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
)

export default Header;
