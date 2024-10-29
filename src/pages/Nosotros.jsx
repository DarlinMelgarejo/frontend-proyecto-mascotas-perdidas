import Footer from "../templates/Footer"
import Header from "../templates/Header"

import Box from "../components/Box"
import FAQItem from "../components/FAQItem"

const Nosotros = () => {

    return (
        <>
            <Header></Header>

            <div className="l-container">
                <h2 className="secondary-color center-block">Sobre Huellas Perdidas</h2>
                <p className="black-color text-center">Huellas Perdidas es una plataforma dedicada a facilitar el reporte y búsqueda de animales perdidos o abandonados. Nuestro objetivo es proporcionar una herramienta eficiente para ayudar a reunir mascotas con sus dueños y asistir en la localización de animales que necesitan ayuda.</p>
            </div>

            <section className="l-container">
                <h3 className="primary-color center-block">Nuestro Impacto</h3>
                <div className="grid grid-cols-1 grid-cols-m-3 gap-8 py-2 mb-8">
                    <Box borde>
                        <div className="flex flex-column justify-center items-center">
                            <h4 className="tertiary-color m-0 fs-7 mb-4">5,000+</h4>
                            <span className="fs-4 gray-color text-bold">Animales Reportados</span>
                        </div>
                    </Box>
                    <Box borde>
                        <div className="flex flex-column justify-center items-center">
                            <h4 className="tertiary-color m-0 fs-7 mb-4">3,000+</h4>
                            <span className="fs-4 gray-color text-bold">Animales Encontrados</span>
                        </div>
                    </Box>
                    <Box borde>
                        <div className="flex flex-column justify-center items-center">
                            <h4 className="tertiary-color m-0 fs-7 mb-4">10,000+</h4>
                            <span className="fs-4 gray-color text-bold">Usuarios Activos</span>
                        </div>
                    </Box>
                </div>
            </section>

            <section className="l-container">
                <h2 className="secondary-color">Como Funciona</h2>
                <ol className="black-color">
                    <li className="mx-4 mb-2">Regístrate en nuestra plataforma de forma gratuita.</li>
                    <li className="mx-4 mb-2">Si has perdido o encontrado un animal, crea un reporte detallado con toda la información relevante.</li>
                    <li className="mx-4 mb-2">Incluye fotos claras y la ubicación donde se perdióo encontró el animal.</li>
                    <li className="mx-4 mb-2">Nuestro sistema notificará a los usuarios cercanos sobre el reporte.</li>
                    <li className="mx-4 mb-2">Los usuarios pueden buscar en la base de datos de animales reportados.</li>
                    <li className="mx-4 mb-2">Si hay coincidencias, facilitamos el contacto entre las partes involucradas.</li>
                </ol>
            </section>

            <section className="l-container">
                <h2 className="secondary-color">Preguntas Frecuentes</h2>
                <div className="faq-container">
                    <FAQItem titulo="¿Como puedo reportar una mascota perdida?" contenido='Puedes reportar una mascota perdida utilizando nuestro formulario en línea en la sección "Reportar". Asegúrate de incluir una foto reciente, una descripción detallada y la última ubicación conocida de tu mascota.'></FAQItem>
                    <FAQItem titulo="¿Cuál es el proceso de adopción?" contenido='El proceso de adopción comienza con la selección de un animal de nuestra lista de adopción. Luego, realizamos una entrevista y una visita al hogar para asegurarnos de que sea una buena coincidencia. Finalmente, se completa el papeleo y se programa una fecha para llevar a tu nuevo amigo a casa.'></FAQItem>
                    <FAQItem titulo="¿Como puedo ser voluntario?" contenido='Siempre estamos buscando voluntarios apasionados. Puedes registrarte como voluntario en nuestra sección "Voluntariado", donde encontrarás diferentes oportunidades, desde ayudar en eventos de adopción hasta cuidar temporalmente a animales.'></FAQItem>
                </div>
            </section>
            <Footer></Footer>
        </>
    )
}

export default Nosotros