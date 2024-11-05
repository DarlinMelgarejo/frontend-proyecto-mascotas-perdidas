import { useParams } from "react-router-dom"
import DetalleReporte from "../components/ReportesMascotas/DetalleReporte"
import Footer from "../templates/Footer"
import Header from "../templates/Header"

const ReporteMascota = () => {
    const {id} = useParams()
    return (
        <>
            <Header></Header>
            <DetalleReporte id={id}></DetalleReporte>
            <Footer></Footer>
        </>
    )
}

export default ReporteMascota