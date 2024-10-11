import "../assets/sass/buscar.scss";

import { useState, useEffect } from "react";
import Mascota from "../components/Mascotas/Mascota";
import axios from "axios";
import Header from "../templates/Header";
import Footer from "../templates/Footer";

const Buscar = () => {
    const [mascotas, setMascotas] = useState([]);
    const [filtro, setFiltro] = useState(""); // Para manejar filtros si es necesario

    // Obtener las mascotas desde el backend
    useEffect(() => {
        const fetchMascotas = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/mascotas");
                setMascotas(response.data);
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

    const mascotasFiltradas = filtro ? mascotas.filter(m => m.especie === filtro) : mascotas;

    return (
        <>
            <Header></Header>
            <div className="l-container">
                <h2 className="center-content black-color">Buscar Animales Reportados</h2>
                <div className="search">
                    <input
                        type="text"
                        placeholder="Buscar por nombre, raza, color o ubicación"
                        onChange={(e) => setFiltro(e.target.value)}
                    />
                    <div className="filters">
                        <button onClick={() => filtrarMascotas("")}>Todos los animales</button>
                        <button onClick={() => filtrarMascotas("Perro")}>Perros</button>
                        <button onClick={() => filtrarMascotas("Gato")}>Gatos</button>
                        <button onClick={() => filtrarMascotas("Otro")}>Otros</button>
                    </div>
                </div>
                
                <div className="cards-grid">
                    {mascotasFiltradas.length > 0 ? (
                        mascotasFiltradas.map((mascota) => (
                            <Mascota
                                key={mascota.id}
                                url_imagen={`http://localhost:5000/uploads/mascotas/${mascota.url_imagen}`} // Ruta de la imagen
                                nombre={mascota.nombre}
                                especie={mascota.especie}
                                raza={mascota.raza}
                                color={mascota.color}
                                procedencia={mascota.procedencia}
                                fecha_reporte={mascota.fecha_reporte}
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
