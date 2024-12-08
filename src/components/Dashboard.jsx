import reportar from "../assets/images/icono-agregar-16.png"
import buscar from "../assets/images/icono-buscar-16.png"
import info from "../assets/images/icono-info-16.png"
import corazon from "../assets/images/icono-adoptar-16-rojo.png"
import notificacion from "../assets/images/icono-notificacion-16.png"
import Box from "./Box"
import { Link, useNavigate } from "react-router-dom"
import MisUltimosReportes from "./ReportesMascotas/MisUltimosReportes"
import { useEffect, useRef, useState } from "react"
import { obtenerMisUltimosResportesMascotas, obtenerTodosLosReportes } from "../services/reportesMascotas"
import L from "leaflet"
import { obtenerTodas } from "../services/estadisticas"



const Dashboard = ({id, nombres, apellidos, url_foto}) => {
    const navigate = useNavigate()
    const mapRef = useRef(null)
    const [reportesMascotas, setReportesMascotas] = useState([])
    const [misUltimosReportes, setMisUltimosReportes] = useState([])
    const [estadisticas, setEstadisticas] = useState({
        cantidad_reportes: 0,
        cantidad_reportes_resueltos: 0,
        cantidad_usuarios_activos: 0
    })

    const reportarNuevaMascota = () => navigate('/reportar')
    const buscarReportesMascotas = () => navigate('/buscar')
    const misReportes = () => navigate('/mis-reportes')

    // Obtener los reportes desde el backend
    const fetchMascotas = async () => {
        try {
            const response = await obtenerTodosLosReportes()
            if (response.status === 200) {
                console.log(response.data.reportes)
                setReportesMascotas(response.data.reportes)
            }
        } catch (error) {
            setReportesMascotas([])
        }
    }

    const fecthMisReportes = async () => {
        try {
            const response = await obtenerMisUltimosResportesMascotas(4)
            if(response.status === 200) {
                setMisUltimosReportes(response.data.reportes)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchMascotas()
    }, [])

    useEffect(() => {
        fecthMisReportes()
    }, [])

    useEffect(() => {
        // Crear el mapa con Leaflet
        const mapInstance = L.map(mapRef.current).setView([20.5937, 78.9629], 5) // Establecer vista predeterminada
    
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
        }).addTo(mapInstance)
    
        // Marcar las ubicaciones de las mascotas reportadas en el mapa
        reportesMascotas.forEach(reporteMascota => {
          const marker = L.marker([reporteMascota.latitud_ubicacion, reporteMascota.longitud_ubicacion])
            .addTo(mapInstance)
            .bindPopup(`${reporteMascota.nombre_mascota}: ${reporteMascota.especie_mascota} ${reporteMascota.estado_mascota.toLowerCase()}`)
            .openPopup()
        })
    
        return () => {
          mapInstance.remove() // Limpiar el mapa al desmontar el componente
        }
    }, [reportesMascotas])

    const fetchEstadisticas = async () => {
        try {
            const response = await obtenerTodas()

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
        <>
            <div className="flex justify-between items-center px-4 pt-6">
                <h2 className="secondary-color m-0">Bienvenido, {nombres.split(" ")[0] + " " + apellidos.split(" ")[0]}</h2>
                <Link className="perfil__miniatura" to="/perfil">
                    <img 
                        src={`${process.env.REACT_APP_URL_API}/uploads/usuarios/${url_foto}`} 
                        alt="Imagen perfil" 
                        title="Ver Perfil"
                    />
                </Link>
            </div>
            <div className="grid grid-cols-1 grid-cols-m-3 gap-8 py-4 px-4">
                <Box titulo="Acciones Rápidas" margenTitulo borde>
                    <button 
                        className="btn btn-tertiary w-full mb-3 flex justify-center items-center gap-2" 
                        onClick={reportarNuevaMascota}
                    >
                        <img src={reportar} alt="Icono de Reportar" />
                        <span>Reportar Animal</span>
                    </button>
                    <button 
                        className="btn btn-secondary w-full mb-3 flex justify-center items-center gap-2" 
                        onClick={buscarReportesMascotas}
                    >
                        <img src={buscar} alt="Icono de Buscar" />
                        <span>Buscar Animales</span>
                    </button>
                </Box>
                <Box titulo="Actividad Reciente" margenTitulo borde>
                    {
                        misUltimosReportes.length > 0 ? (
                            misUltimosReportes.map((reporte) => (
                                <div className="flex justify-start items-start gap-2 mb-3" key={reporte.id}>
                                    <img className="pt-1" src={reporte.estado_reporte === "Resuelto" ? corazon : info} alt="Icono de Notificación" />
                                    <div className="flex flex-column">
                                        <p>
                                            {
                                                reporte.estado_reporte === "Resuelto" ? (
                                                    reporte.estado_mascota === "Perdido" ? (
                                                        `Encontraste a tu mascota ${reporte.nombre_mascota}.`
                                                    ) : (
                                                        `Ayudaste a  ${reporte.nombre_mascota} a encontrar su hogar (.`
                                                    )
                                                )  : (
                                                    `Reportaste un ${reporte.especie_mascota.toLowerCase()} ${reporte.estado_mascota.toLowerCase()} en ${reporte.procedencia_mascota}.`
                                                )
                                            }
                                        </p>
                                        <span className="gray-color">{new Date(reporte.fecha_reporte).toISOString().split('T')[0]}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex justify-center items-start gap-2 mb-3">
                                <p>Aún no has reportado a ningún animal.</p>
                            </div>
                        )
                    }
                </Box>
                <Box titulo="Noticias y Actualizaciones" margenTitulo borde>
                    <div className="flex justify-start items-start gap-2 mb-3">
                        <img className="pt-1" src={notificacion} alt="Icono de Notificación" />
                        <p>Acá se mostraran las nuevas actualizaciones o alguna noticia</p>
                    </div>
                </Box>
            </div>
            <div className="py-4 px-4">
                <Box titulo="Mis Animales Reportados" margenTitulo borde>
                    <MisUltimosReportes/>
                    <button className="btn btn-tertiary w-full" onClick={misReportes}>
                        <span>Ver Todos Mis Reportes</span>
                    </button>
                </Box>
            </div>
            <div className="py-4 px-4">
                <Box titulo="Estadísticas del Sitio" margenTitulo borde>
                    <div className="grid grid-cols-1 grid-cols-s-3 gap-8 py-2 mb-8">
                        <Box>
                            <div className="flex flex-column justify-center items-center">
                                <h4 className="tertiary-color m-0 fs-8">{estadisticas.cantidad_reportes}</h4>
                                <span className="gray-color">Animales Reportados</span>
                            </div>
                        </Box>
                        <Box>
                            <div className="flex flex-column justify-center items-center">
                                <h4 className="tertiary-color m-0 fs-8">{estadisticas.cantidad_reportes_resueltos}</h4>
                                <span className="gray-color">Reportes Resueltos</span>
                            </div>
                        </Box>
                        <Box>
                            <div className="flex flex-column justify-center items-center">
                                <h4 className="tertiary-color m-0 fs-8">{estadisticas.cantidad_usuarios_activos}</h4>
                                <span className="gray-color">Usuarios Activos</span>
                            </div>
                        </Box>
                    </div>
                </Box>
            </div>
            <div className="py-4 px-4">
                <Box titulo="Mapa de Mascotas Perdidas y Encontradas" margenTitulo borde>
                    <div className="mb-4" ref={mapRef} style={{ height: '500px', width: '100%' }}></div>
                </Box>
            </div>
        </>
    )
}

export default Dashboard