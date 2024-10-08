import "../assets/sass/components/footer.scss";

import { Link } from "react-router-dom";

const Footer = () => (
    <footer className="main-footer">
        <div className="main-footer__content">
            <div className="main-footer__section">
                <h4>SOS Mascotas</h4>
                <p>Ayudando a reunir mascotas con sus dueños desde 2024</p>
                <div className="main-footer__social">
                    <a className="main-footer__link" href="">
                        <img src="" alt="Logo de Facebook" />
                    </a>
                    <a className="main-footer__link" href="">
                        <img src="" alt="Logo de Twitter" />
                    </a>
                    <a className="main-footer__link" href="">
                        <img src="" alt="Logo de Instagram" />
                    </a>
                </div>
            </div>
            <div className="main-footer__section">
                <h4>Enlaces Rápidos</h4>
                <Link className="main-footer__link" to="/buscar">Buscar</Link>
                <Link className="main-footer__link" to="/reportar">Reportar</Link>
                <Link className="main-footer__link" to="/adoptar">Adoptar</Link>
                <Link className="main-footer__link" to="/nosotros">Sobre Nosotros</Link>
            </div>
            <div className="main-footer__section">
                <h4>Contacto</h4>
                <div className="main-footer__contact">
                    <img src="" alt="Logo correo" />
                    <span>info@sosmascotas.com</span>
                </div>
                <div className="main-footer__contact">
                    <img src="" alt="Logo telefono" />
                    <span>+01(234)567-89</span>
                </div>
            </div>
            <div className="main-footer__section">
                <h4>Registro e Inicio de Sesión</h4>
                <p>Registrate o inicia sesión para poder estar alerta sobre las mascotas perdidas o reportar alguna mascota</p>
            </div>
        </div>
        <div className="main-footer__copyright">
            &copy; 2024 SOS Mascotas. Todos los derechos reservados
        </div>
    </footer>
)

export default Footer