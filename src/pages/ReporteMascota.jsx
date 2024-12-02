import { useNavigate, useParams } from "react-router-dom"
import DetalleReporte from "../components/ReportesMascotas/DetalleReporte"
import { useUsuario } from "../context/UsuarioContext"

const ReporteMascota = () => {
    const {usuario} = useUsuario()
    const navigate = useNavigate()
    const {id} = useParams()
    return (
        <>
            {
                usuario ? (
                    <DetalleReporte id={id}></DetalleReporte>
                ) : (
                    navigate("/login")
                )
            }
        </>
    )
}

export default ReporteMascota