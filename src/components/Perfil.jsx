import icono_editar from "../assets/images/icono-editar-16.png"
import icono_correo from "../assets/images/icono-correo-16-secondary.png"
import icono_telefono from "../assets/images/icono-telefono-16-secondary.png"
import icono_direccion from "../assets/images/icono-ubicacion-16-secondary.png"
import icono_calendario from "../assets/images/icono-calendario-16.png"

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { obtenerMisResportesMascotas } from "../services/reportesMascotas"
import { obtenerTodasDeUnUsuario} from "../services/estadisticas"

const Perfil = ({ nombres, apellidos, url_foto, fecha_registro, correo, telefono, direccion, procedencia }) => {
    const [misReportesMascotas, setMisReportesMascotas] = useState([])
    const [estadisticas, setEstadisticas] = useState({
        cantidad_reportes: 0,
        cantidad_animales_encontrados: 0,
        cantidad_comentarios: 0
    })

    // Estado para manejar el botón activo
    const [activo, setActivo] = useState(0); // 0 para Información, 1 para Estadísticas, 2 para Actividad Reciente
    const navigate = useNavigate();

    const cambiarActivo = (index) => {
        setActivo(index); // Actualiza el botón activo
    };

    const fetchMisReportes = async () => {
        try {
            const response = await obtenerMisResportesMascotas()
            if(response.status === 200) {
                setMisReportesMascotas(response.data.reportes);
            }
        } catch (error) {
            console.error("Error al obtener las mascotas:", error);
        }
    };

    const irAEditarPerfil = () => navigate('/editar-perfil')

    useEffect(() => {
        fetchMisReportes()
    }, [])

    const fetchEstadisticas = async () => {
        try {
            const response = await obtenerTodasDeUnUsuario()

            if (response.status === 200) {
                setEstadisticas(response.data)
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchEstadisticas()
    }, [])
    return (
        <div className="py-6 px-4">
            <div className="perfil">
                <div className="perfil__foto">
                    <img src={`${process.env.REACT_APP_URL_API}/uploads/usuarios/${url_foto}`} alt={`Foto de perfil de ${nombres} ${apellidos}`} />
                    <span className="secondary-color fs-6 text-bold text-center mb-4">{`${nombres} ${apellidos}`}</span>
                    <span className="gray-color">Miembro desde {new Date(fecha_registro).toISOString().split('T')[0]}</span>
                </div>
                <div className="perfil__menu">
                    <div className="perfil__options">
                        <button 
                            className={activo === 0 ? "activo" : ""} 
                            onClick={() => cambiarActivo(0)}
                        >
                            Información
                        </button>
                        <button 
                            className={activo === 1 ? "activo" : ""} 
                            onClick={() => cambiarActivo(1)}
                        >
                            Estadísticas
                        </button>
                        <button 
                            className={activo === 2 ? "activo" : ""} 
                            onClick={() => cambiarActivo(2)}
                        >
                            Actividad
                        </button>
                    </div>
                </div>
                <div className="perfil__content">
                    <div className={activo === 0 ? "perfil__informacion show" : "perfil__informacion"}>
                        <div className="perfil__informacion-header mb-10">
                            <h2 className="black-color m-0">Información Personal</h2>
                            <button className="btn btn-white flex items-center gap-2" onClick={irAEditarPerfil}>
                                <img src={icono_editar} alt="Icono de Editar" title="Editar Datos del Perfil"/>
                                Editar
                            </button>
                        </div>
                        <div className="perfil__informacion-body">
                            <div className="black-color flex items-center gap-2 mb-3">
                                <img src={icono_correo} alt="Icono de Correo" />
                                <span>{correo}</span>
                            </div>
                            <div className="black-color flex items-center gap-2 mb-3">
                                <img src={icono_telefono} alt="Icono de Teléfono" />
                                <span>{telefono}</span>
                            </div>
                            <div className="black-color flex items-center gap-2">
                                <img src={icono_direccion} alt="Icono de Dirección" />
                                <span>{`${direccion}, ${procedencia}`}</span>
                            </div>
                        </div>
                    </div>

                    <div className={activo === 1 ? "perfil__estadisticas show" : "perfil__estadisticas"}>
                        <h2 className="black-color mb-10">Estadísticas</h2>
                        <div className="grid grid-cols-1 grid-cols-m-3 gap-8">
                            <div className="flex flex-column justify-center items-center">
                                <h4 className="secondary-color m-0 fs-6">{estadisticas.cantidad_reportes}</h4>
                                <span className="gray-color">Publicaciones</span>
                            </div>
                            <div className="flex flex-column justify-center items-center">
                                <h4 className="secondary-color m-0 fs-6">{estadisticas.cantidad_animales_encontrados}</h4>
                                <span className="gray-color">Animales Encontrados</span>
                            </div>
                            <div className="flex flex-column justify-center items-center">
                                <h4 className="secondary-color m-0 fs-6">{estadisticas.cantidad_comentarios}</h4>
                                <span className="gray-color">Comentarios</span>
                            </div>
                        </div>
                    </div>

                    <div className={activo === 2 ? "perfil__actividades show" : "perfil__actividades"}>
                        <h2 className="black-color mb-10">Actividad Reciente</h2>
                        <div className="actividades">
                            {
                                misReportesMascotas.length > 0 ? (
                                    misReportesMascotas.map((reporte) => (
                                        <div className="actividad">
                                            <div className="actividad__image">
                                                <img src={icono_calendario} alt="Icono de Calendario" />
                                            </div>
                                            <div className="actividad__content">
                                                <p className="black-color">{`Reportó un ${reporte.especie_mascota.toLowerCase()} ${reporte.estado_mascota.toLowerCase()} en ${reporte.procedencia_mascota}.`}</p>
                                                <span>{new Date(reporte.fecha_reporte).toISOString().split('T')[0]}</span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>Aún no hay actividad.</p>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Perfil;
