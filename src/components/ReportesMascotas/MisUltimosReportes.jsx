import { useEffect, useState } from "react"
import { obtenerMisUltimosResportesMascotas } from "../../services/reportesMascotas"
import MiniaturaReporteMascota from "./MiniaturaReporteMascota"

const MisUltimosReportes = () => {
    const [reportes, setReportes] = useState([])

    useEffect(() => {
        const getUltimosReportes = async () => {
            try {
                const response = await obtenerMisUltimosResportesMascotas(3)
                if(response.status === 200) {
                    setReportes(response.data.reportes)
                }
            } catch (error) {
                console.log(error)
            }
        }

        getUltimosReportes()
    }, [])


    return(
        <>
            {
                reportes.length > 0 ? (
                    <div className="grid grid-cols-1 grid-cols-m-3 gap-8 py-2 mb-8">
                        {
                            reportes.map((reporte) => (
                                <MiniaturaReporteMascota
                                    key={reporte.id}
                                    url_foto_mascota={`${process.env.REACT_APP_URL_API}/uploads/mascotas/${reporte.url_foto_mascota}`}
                                    nombre_mascota={reporte.nombre_mascota}
                                    especie_mascota={reporte.especie_mascota}
                                    estado_mascota={reporte.estado_mascota}
                                    fecha_reporte={new Date(reporte.fecha_reporte).toISOString().split('T')[0]}
                                />
                            ))
                        }
                    </div>
                ) : (
                    <p className="black-color text-bold center-content mb-8">No se encontraron reportes</p>
                )
            }
        </>
    )
}

export default MisUltimosReportes