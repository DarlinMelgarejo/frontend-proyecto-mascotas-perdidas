import { useState, useEffect } from "react";
import reportar from "../assets/images/icono-agregar-16.png";

import { useNavigate } from "react-router-dom";
import CardReporteMascota from "../components/ReportesMascotas/CardReporteMascota";
import { obtenerMisResportesMascotas } from "../services/reportesMascotas";

const MisReportes = () => {
    const [misReportesMascotas, setMisReportesMascotas] = useState([])
    const [filtro, setFiltro] = useState("");
    const navigate = useNavigate()
    const reportarNuevaMascota = () => navigate('/reportar')
    
    // Filtrar mascotas por especie si es necesario
    const filtrarMascotas = (especie) => {
        setFiltro(especie);
    };

    const misReportesMascotasFiltradas = filtro ? misReportesMascotas.filter(m => m.estado_mascota === filtro) : misReportesMascotas;


    // Queda pendiente optimizar el useEffect ya que se ejecuta indefinidamente
    useEffect(() => {
        const fetchMascotas = async () => {
            try {
                const response = await obtenerMisResportesMascotas()
                if(response.status === 200) {
                    console.log(response.data)
                    setMisReportesMascotas(response.data);
                    setFiltro("")
                }
            } catch (error) {
                console.error("Error al obtener las mascotas:", error);
            }
        };

        fetchMascotas();
    }, []) //misReportesMascotasFiltradas


    return (
        <div className="l-container black-color">
            <div className="flex flex-row justify-between mb-4">
                <h2 className="secondary-color m-0">Mis Reportes</h2>
                <button className="btn btn-tertiary flex justify-center items-center"
                onClick={reportarNuevaMascota}
                >
                    <img src={reportar} alt="Icono de Reportar" />
                    <span>Nuevo Reporte</span>
                </button>
            </div>
            <div className="flex flex-row gap-4 mb-8">            
                <button className="btn btn-white" onClick={() => filtrarMascotas("")}>Todos los reportes</button>
                <button className="btn btn-white" onClick={() => filtrarMascotas("Perdido")}>Perdidos</button>
                <button className="btn btn-white" onClick={() => filtrarMascotas("Encontrado")}>Encontrados</button>
            </div>
            <div className="grid grid-cols-m-2 grid-cols-l-3 gap-4">
                {misReportesMascotasFiltradas.length > 0 ? (
                    misReportesMascotasFiltradas.map((mascota) => (
                        <CardReporteMascota
                            key={mascota.id}
                            id_reporte={mascota.id}
                            url_imagen={`${process.env.REACT_APP_URL_API}/uploads/mascotas/${mascota.url_foto_mascota}`} // Ruta de la imagen
                            nombre={mascota.nombre_mascota}
                            especie={mascota.especie_mascota}
                            raza={mascota.raza_mascota}
                            color={mascota.color_mascota}
                            procedencia={mascota.procedencia_mascota}
                            fecha_reporte={new Date(mascota.fecha_reporte).toISOString().split('T')[0]}
                            opciones
                        />
                    ))
                ) : (
                    <p className="text-bold py-20">No se encontraron reportes.</p>
                )}
            </div>
        </div>
    )
}

export default MisReportes