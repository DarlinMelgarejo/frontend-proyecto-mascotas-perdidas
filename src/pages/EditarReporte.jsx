import { useNavigate, useParams } from "react-router-dom"
import Box from "../components/Box"

import EditarReporteMascota from "../components/ReportesMascotas/EditarReporteMascota"
import { useUsuario } from "../context/UsuarioContext"

const EditarReporte = () => {
    const {usuario} = useUsuario()
    const navigate = useNavigate()
    const {id} = useParams()

    return (
        <>
            {
                usuario ? (
                    <div className="l-container">
                        <h2 className="center-content secondary-color">Editar Reporte de un Animal Perdido o Encontrado</h2>
                        <div className="grid grid-cols-1 gap-8">
                            <Box titulo="Editar Reporte" borde margenTitulo>
                                <EditarReporteMascota id={id}></EditarReporteMascota>
                            </Box>
                        </div>
                    </div>
                ) : (
                    navigate("/login")
                )
            }
        </>
    )
}

export default EditarReporte