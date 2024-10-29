import { useEffect, useState } from "react"
import MiniaturaReporteMascota from "./ReportesMascotas/MiniaturaReporteMascota"
import { obtenerResportesMascotasRecientes } from "../services/reportesMascotas"

const ReportesMascotasRecientes = () => {
    const [reportesMascotasRecientes, setReportesMascotasRecientes] = useState()

    const getReportesMascotasRecientes = async () => {
        try {
            const response = await obtenerResportesMascotasRecientes()

            if(response.status === 200) {
                setReportesMascotasRecientes(response.data)
            }
        } catch (error) {
            console.log("Ha ocurrido un error al traer los datos desde el backend")
            console.error(error)
        }

    }


    useEffect(() => {
        getReportesMascotasRecientes()
    }, [])


    return (
        <div className="flex flex-column gap-4">
            {reportesMascotasRecientes && (
                reportesMascotasRecientes.map((reporte) => (
                    <MiniaturaReporteMascota
                        key={reporte.id}
                        url_foto_mascota={`http://localhost:5000/uploads/mascotas/${reporte.url_foto_mascota}`}
                        nombre_mascota={reporte.nombre_mascota}
                        especie_mascota={reporte.especie_mascota}
                        estado_mascota={reporte.estado_mascota}
                        fecha_reporte={new Date(reporte.creado_en).toISOString().split('T')[0]}
                    />
                ))
            )}
        </div>
    )
}

export default ReportesMascotasRecientes