import { useState, useEffect } from "react";
import CardReporteMascota from "../components/ReportesMascotas/CardReporteMascota";
import Header from "../templates/Header";
import Footer from "../templates/Footer";
import { obtenerTodosLosReportes } from "../services/reportesMascotas";

const Buscar = () => {
    const [reportesMascotas, setReportesMascotas] = useState([]);
    const [reportesMascotasActuales, setReportesMascotasActuales] = useState([]);
    const [especieSeleccionada, setEspecieSeleccionada] = useState("Todos")
    const [busqueda, setBusqueda] = useState("")

    // Obtener las mascotas desde el backend
    const fetchMascotas = async () => {
        try {
            const response = await obtenerTodosLosReportes()
            if(response.status === 200) {
                setReportesMascotas(response.data);
                filtrarAnimales()
            }
        } catch (error) {
            console.error("Error al obtener las mascotas:", error);
        }
    };

    fetchMascotas();
    
    useEffect(() => {
        filtrarAnimales()
    }, [especieSeleccionada, busqueda]); // Solo se ejecuta al cargar el componente
    
    const filtrarAnimales = () => {
        let reportesFiltrados = reportesMascotas
    
        if (especieSeleccionada !== "Todos") {
            reportesFiltrados = reportesFiltrados.filter(animal => animal.especie_mascota === especieSeleccionada)
        }
    
        if (busqueda) {
            const busquedaLower = busqueda.toLowerCase()
            reportesFiltrados = reportesFiltrados.filter(animal => 
                animal.nombre_mascota.toLowerCase().includes(busquedaLower) ||
                animal.color_mascota.toLowerCase().includes(busquedaLower) ||
                animal.raza_mascota.toLowerCase().includes(busquedaLower) ||
                animal.especie_mascota.toLowerCase().includes(busquedaLower) ||
                animal.procedencia_mascota.toLowerCase().includes(busquedaLower)
            )
        }

        setReportesMascotasActuales(reportesFiltrados)
    }

    return (
        <>
            <Header></Header>
            <div className="l-container">
                <h2 className="center-content black-color">Buscar Animales Reportados</h2>
                <div className="search">
                    <input
                        className="form-control form-control-dark"
                        type="text"
                        placeholder="Buscar por nombre, color, raza, especie o procedencia"
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                    <div className="w-full w-3-4-s flex justify-around">
                        <button className="btn btn-white" onClick={() => setEspecieSeleccionada("Todos")}>Todos los animales</button>
                        <button className="btn btn-white" onClick={() => setEspecieSeleccionada("Perro")}>Perros</button>
                        <button className="btn btn-white" onClick={() => setEspecieSeleccionada("Gato")}>Gatos</button>
                        <button className="btn btn-white" onClick={() => setEspecieSeleccionada("Otro")}>Otros</button>
                    </div>
                </div>
                
                <div className="grid grid-cols-s-2 grid-cols-xl-3 gap-6">
                    {reportesMascotasActuales.length > 0 ? (
                        reportesMascotasActuales.map((mascota) => (
                            <CardReporteMascota
                                key={mascota.id}
                                url_imagen={`${process.env.REACT_APP_URL_API}/uploads/mascotas/${mascota.url_foto_mascota}`} // Ruta de la imagen
                                nombre={mascota.nombre_mascota}
                                especie={mascota.especie_mascota}
                                raza={mascota.raza_mascota}
                                color={mascota.color_mascota}
                                procedencia={mascota.procedencia_mascota}
                                fecha_reporte={new Date(mascota.fecha_reporte).toISOString().split('T')[0]}
                            />
                        ))
                    ) : (
                        <p className="black-color text-bold">No se encontraron mascotas.</p>
                    )}
                </div>
            </div>
            <Footer></Footer>
        </>
    );
};

export default Buscar
