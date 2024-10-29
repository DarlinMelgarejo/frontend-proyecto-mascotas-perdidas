import { useState, useEffect } from "react";
import CardReporteMascota from "../components/ReportesMascotas/CardReporteMascota";
import axios from "axios";
import Header from "../templates/Header";
import Footer from "../templates/Footer";

const Buscar = () => {
    const [reportesMascotas, setReportesMascotas] = useState([]);
    const [filtro, setFiltro] = useState(""); // Para manejar filtros si es necesario

    // Obtener las mascotas desde el backend
    useEffect(() => {
        const fetchMascotas = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/reportes-mascotas");
                console.log(response.data)
                setReportesMascotas(response.data);
            } catch (error) {
                console.error("Error al obtener las mascotas:", error);
            }
        };

        fetchMascotas();
    }, []); // Solo se ejecuta al cargar el componente

    // Filtrar mascotas por especie si es necesario
    const filtrarMascotas = (especie) => {
        setFiltro(especie);
    };

    const reportesMascotasFiltrados = filtro ? reportesMascotas.filter(m => m.especie_mascota === filtro) : reportesMascotas;

    return (
        <>
            <Header></Header>
            <div className="l-container">
                <h2 className="center-content black-color">Buscar Animales Reportados</h2>
                <div className="search">
                    <input
                        className="form-control form-control-dark"
                        type="text"
                        placeholder="Buscar por nombre, raza, color o ubicación"
                        onChange={(e) => setFiltro(e.target.value)}
                    />
                    <div className="filters">
                        <button className="btn btn-white" onClick={() => filtrarMascotas("")}>Todos los animales</button>
                        <button className="btn btn-white" onClick={() => filtrarMascotas("Perro")}>Perros</button>
                        <button className="btn btn-white" onClick={() => filtrarMascotas("Gato")}>Gatos</button>
                        <button className="btn btn-white" onClick={() => filtrarMascotas("Otro")}>Otros</button>
                    </div>
                </div>
                
                <div className="grid grid-cols-l-3 gap-6">
                    {reportesMascotasFiltrados.length > 0 ? (
                        reportesMascotasFiltrados.map((mascota) => (
                            <CardReporteMascota
                                key={mascota.id}
                                url_imagen={`http://localhost:5000/uploads/mascotas/${mascota.url_foto_mascota}`} // Ruta de la imagen
                                nombre={mascota.nombre_mascota}
                                especie={mascota.especie_mascota}
                                raza={mascota.raza_mascota}
                                color={mascota.color_mascota}
                                procedencia={mascota.procedencia_mascota}
                                fecha_reporte={new Date(mascota.fecha_reporte).toISOString().split('T')[0]}
                            />
                        ))
                    ) : (
                        <p>No se encontraron mascotas.</p>
                    )}
                </div>
            </div>
            <Footer></Footer>
        </>
    );
};

export default Buscar;
