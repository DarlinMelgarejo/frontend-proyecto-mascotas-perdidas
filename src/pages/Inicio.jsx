import Banner from "../sections/Banner";
import Search from "../sections/Search";
import Card from "../components/Card";

import reportar from "../assets/images/icono-reportar-64.png";
import adoptar from "../assets/images/icono-adoptar-64.png";
import info from "../assets/images/icono-info-64.png";
import Header from "../templates/Header";
import Footer from "../templates/Footer";
import Section from "../components/Section";
import CTASection from "../sections/CTASection";
import InicioUsuario from "../sections/InicioUsuario";

import { obtenerPerfil } from "../services/usuarios";
import { useEffect, useState } from "react";

const Inicio = () => {
    const [usuario, setUsuario] = useState()

    useEffect(() => {
      getPerfil()
    }, [])
    
    const getPerfil = async () => {
        try {

            // Llamar a la función del servicio para obtener al usuario
            const response = await obtenerPerfil();

            if (response.status === 200) {
                setUsuario(response.data)
            } else {
                console.warn(response.message)
            }
        } catch (err) {
            console.error(err)
        }
    };    

    // Obtener el perfil del usuario desde el backend
    
    return (
        <>
            <Header></Header>

            {usuario ? <InicioUsuario nombres={usuario.nombres} apellidos={usuario.apellidos} url_foto={usuario.url_foto}></InicioUsuario> :
                <>
                    <Banner></Banner>
                    <Search></Search>
                    <div className="grid grid-cols-1 grid-cols-s-3 gap-8 py-16 px-4">
                        <Card icono={reportar} cantidad="1234" contenido="Animales Reportados"></Card>
                        <Card icono={adoptar} cantidad="789" contenido="Reunidos con sus familias"></Card>
                        <Card icono={info} cantidad="456" contenido="Necesitan ayuda"></Card>
                    </div>

                    <div className="bg-soft py-12 px-4">
                        <h2 className="center-content black-color">Cómo funciona</h2>
                        <div className="grid grid-cols-1 grid-cols-s-3 gap-8">
                            <Section numero="1" titulo="Reporta" contenido="Reporta un animal perdido o encontrado con todos los detalles posibles"></Section>
                            <Section numero="2" titulo="Busca" contenido="Utiliza nuestra herramienta de búsqueda para encontrar coincidencias"></Section>
                            <Section numero="3" titulo="Reúne" contenido="Contacta y ayuda a reunir a los animales con sus familias o encuentra un nuevo hogar"></Section>
                        </div>
                    </div>
                    <CTASection></CTASection>
                </>
            }

            <Footer></Footer>
        </>
    );
};

export default Inicio;