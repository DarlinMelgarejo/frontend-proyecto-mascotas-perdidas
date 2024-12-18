import { useNavigate } from "react-router-dom"
import Box from "../components/Box"
import RegistrarReporteMascota from "../components/ReportesMascotas/RegistrarReporteMascota"
import ReportesMascotasRecientes from "../components/ReportesMascotasRecientes"
import { useUsuario } from "../context/UsuarioContext"

const Reportar = () => {
    const {usuario} =useUsuario()
    const navigate = useNavigate()
    return (
        <>
            {
                usuario ? (
                    <div className="l-container">
                        <h2 className="center-content secondary-color">Reportar un Animal Perdido o Encontrado</h2>
                        <div className="grid grid-cols-1 grid grid-cols-l-2 gap-8">
                            <Box titulo="Formulario Reporte" borde margenTitulo>
                                <RegistrarReporteMascota/>
                            </Box>
                            <div className="flex flex-column gap-8">
                                <Box titulo="Consejos para Reportar" borde margenTitulo>
                                    <ul className="black-color flex flex-column gap-3 ml-4">
                                        <li>Proporciona la mayor cantidad de detalles posibles</li>
                                        <li>Incluye una foto clara y reciente del animal</li>
                                        <li>Sé lo más preciso posible con la ubicación y la fecha</li>
                                        <li>Mantén actualizada tu información de contacto</li>
                                        <li>Revisa regularmente la sección de animales encontrados</li>
                                    </ul>
                                </Box>
                                <Box titulo="Animales Reportados Recientemente" borde margenTitulo>
                                    <ReportesMascotasRecientes></ReportesMascotasRecientes>
                                </Box>
                            </div>
                        </div>
                    </div>
                ) : (
                    navigate("/login")
                )
            }
        </>
    )
}

export default Reportar