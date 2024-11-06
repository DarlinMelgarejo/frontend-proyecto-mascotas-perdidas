import { useParams } from "react-router-dom"
import DetalleReporte from "../components/ReportesMascotas/DetalleReporte"

const ReporteMascota = () => {
    const {id} = useParams()
    return (
        <DetalleReporte id={id}></DetalleReporte>
    )
}

export default ReporteMascota