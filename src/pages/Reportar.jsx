import FormularioMascota from "../components/Mascotas/FormularioMascota"
import Footer from "../templates/Footer"
import Header from "../templates/Header"

const Reportar = () => {
    return (
        <>
            <Header></Header>
            <div className="l-container">
                <h2 className="center-content black-color">Reportar un Animal</h2>
                <FormularioMascota></FormularioMascota>
            </div>
            <Footer></Footer>
        </>
    )
}

export default Reportar