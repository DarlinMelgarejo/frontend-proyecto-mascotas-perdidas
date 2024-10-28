import Box from "../components/Box"
import FormularioMascota from "../components/Mascotas/FormularioMascota"
import Footer from "../templates/Footer"
import Header from "../templates/Header"

const Reportar = () => {
    return (
        <>
            <Header></Header>
            <div className="l-container">
                <h2 className="center-content secondary-color">Reportar un Animal Perdido o Encontrado</h2>
                <div className="grid grid-cols-1 grid grid-cols-l-2 gap-8">
                    <Box titulo="Formulario Reporte" borde margenTitulo>
                        <FormularioMascota/>
                    </Box>
                    <Box titulo="Animales Reportados Recientemente" borde></Box>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}

export default Reportar