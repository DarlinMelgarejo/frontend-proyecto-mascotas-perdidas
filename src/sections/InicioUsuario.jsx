import reportar from "../assets/images/icono-agregar-16.png";
import buscar from "../assets/images/icono-buscar-16.png";
import adoptar from "../assets/images/icono-adoptar-16.png";
import info from "../assets/images/icono-info-16.png";
import corazon from "../assets/images/icono-adoptar-16-rojo.png";
import notificacion from "../assets/images/icono-notificacion-16.png";
import Box from "../components/Box";
import { Link } from "react-router-dom";


const InicioUsuario = ({nombres, apellidos, url_foto}) => {


    return (
        <>
            <div className="flex justify-between items-center px-4 pt-6">
                <h2 className="secondary-color m-0">Bienvenido, {nombres + " " + apellidos}</h2>
                <Link className="perfil__miniatura" to="/perfil">
                    <img src={`http://localhost:5000/uploads/usuarios/${url_foto}`} alt="Imagen perfil" title="Ver Perfil"/>
                </Link>
            </div>

            <div className="grid grid-cols-1 grid-cols-m-3 gap-8 py-4 px-4">
                <Box titulo="Acciones Rápidas" margenTitulo borde>
                    <button className="btn btn-tertiary w-full mb-3 flex justify-center items-center gap-2">
                        <img src={reportar} alt="Icono de Reportar" />
                        <span>Reportar Animal</span>
                    </button>
                    <button className="btn btn-secondary w-full mb-3 flex justify-center items-center gap-2">
                        <img src={buscar} alt="Icono de Buscar" />
                        <span>Buscar Animales</span>
                    </button>
                    <button className="btn btn-secondary w-full flex justify-center items-center gap-2">
                        <img src={adoptar} alt="Icono de Adoptar" />
                        <span>Ver Adopciones</span>
                    </button>
                </Box>
                <Box titulo="Actividad Reciente" margenTitulo borde>
                    <div className="flex justify-center items-start gap-2 mb-3">
                        <img className="pt-1" src={info} alt="Icono de Notificación" />
                        <div className="flex flex-column">
                            <p>Reportaste un perro perdido por el Parque Central</p>
                            <span className="gray-color">2023-05-20</span>
                        </div>
                    </div>
                    <div className="flex justify-center items-start gap-2">
                        <img className="pt-1" src={corazon} alt="Icono de Notificación" />
                        <div className="flex flex-column">
                            <p>Tu solicitud de adopación para Luna fue aprobada</p>
                            <span className="gray-color">2023-05-18</span>
                        </div>
                    </div>
                </Box>
                <Box titulo="Noticias y Actualizaciones" margenTitulo borde>
                    <div className="flex justify-center items-start gap-2 mb-3">
                        <img className="pt-1" src={notificacion} alt="Icono de Notificación" />
                        <p>Acá se mostraran las nuevas actualizaciones o alguna noticia</p>
                    </div>
                    <div className="flex justify-center items-start gap-2">
                        <img className="pt-1" src={notificacion} alt="Icono de Notificación" />
                        <p>Acá se mostraran las nuevas actualizaciones o alguna noticia</p>
                    </div>
                </Box>
            </div>

            <div className="py-4 px-4">
                <Box titulo="Mis Animales Reportados" margenTitulo borde>
                    <div className="grid grid-cols-1 grid-cols-m-3 gap-8 py-2 mb-8">
                        <Box titulo="HOLA1" borde></Box>
                        <Box titulo="HOLA2" borde></Box>
                        <Box titulo="HOLA3" borde></Box>
                    </div>
                    <button className="btn btn-tertiary w-full">
                        <span>Ver Todos Mis Reportes</span>
                    </button>
                </Box>
            </div>

            <div className="py-4 px-4">
                <Box titulo="Estadísticas del Sitio" margenTitulo borde>
                    <div className="grid grid-cols-1 grid-cols-m-3 gap-8 py-2 mb-8">
                        <Box>
                            <div className="flex flex-column justify-center items-center">
                                <h4 className="tertiary-color m-0 fs-8">1234</h4>
                                <span className="gray-color">Animales Reportados</span>
                            </div>
                        </Box>
                        <Box>
                            <div className="flex flex-column justify-center items-center">
                                <h4 className="tertiary-color m-0 fs-8">567</h4>
                                <span className="gray-color">Animales Adoptados</span>
                            </div>
                        </Box>
                        <Box>
                            <div className="flex flex-column justify-center items-center">
                                <h4 className="tertiary-color m-0 fs-8">890</h4>
                                <span className="gray-color">Usuarios Activos</span>
                            </div>
                        </Box>
                    </div>
                </Box>
            </div>
        
        </>
    )
}

export default InicioUsuario