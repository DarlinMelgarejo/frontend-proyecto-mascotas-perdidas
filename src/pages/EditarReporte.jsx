import { useParams } from "react-router-dom"
import Box from "../components/Box"

import EditarReporteMascota from "../components/ReportesMascotas/EditarReporteMascota"

const EditarReporte = () => {
    const {id} = useParams()

    return (
        <div className="l-container">
            <h2 className="center-content secondary-color">Editar Reporte de un Animal Perdido o Encontrado</h2>
            <div className="grid grid-cols-1 gap-8">
                <Box titulo="Editar Reporte" borde margenTitulo>
                    <EditarReporteMascota id={id}></EditarReporteMascota>
                </Box>
            </div>
        </div>
    )
}

export default EditarReporte