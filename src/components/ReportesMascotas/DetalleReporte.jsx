import icono_calendario from "../../assets/images/icono-calendario-16.png";
import icono_ubicacion from "../../assets/images/icono-ubicacion-16-secondary.png";
import Box from "../Box";
import { useEffect, useRef, useState } from "react";
import L from 'leaflet';
import { obtenerReporte } from "../../services/reportesMascotas";
import ContactoUsuario from "../Usuarios/ContactoUsuario";
import { obtenerUsuarioPorId } from "../../services/usuarios";
import Comentarios from "../Comentarios/Comentarios";

const DetalleReporte = ({ id }) => {
    const reporteID = id;
    const [reporte, setReporte] = useState(null);
    const [contacto, setContacto] = useState(null)
    const mapaRef = useRef(null);

    const getReporte = async () => {
        try {
            const response = await obtenerReporte(reporteID);
            if (response.status === 200) {
                setReporte(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    
    const getContacto = async () => {
        try {
            const response = await obtenerUsuarioPorId(reporte.usuario_id);
            if (response.status === 200) {
                setContacto(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getReporte();
    }, [reporteID]);

    useEffect(() => {
        if (!reporte) return; // Espera a que el reporte esté disponible

        const lat = reporte.latitud_ubicacion;
        const lng = reporte.longitud_ubicacion;

        // Inicializa el mapa
        const mapInstance = L.map(mapaRef.current).setView([lat, lng], 15);

        // Capa de mapa
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
        }).addTo(mapInstance);

        // Marcador en la ubicación
        const marker = L.marker([lat, lng]).addTo(mapInstance)
            .bindPopup(reporte.ubicacion_mascota)
            .openPopup();

        // Limpia el mapa al desmontar el componente
        return () => {
            mapInstance.remove();
        };
    }, [reporte]); // Solo se ejecuta cuando `reporte` cambia

    useEffect(() => {
        if(reporte) {
            getContacto()
        }
    }, [reporte])

    return (
        <div className="l-container black-color">
            <div className="flex flex-column gap 4">
                {reporte ? (
                    <>
                        <Box borde margenAbajo>
                            <h2 className="secondary-color">{reporte.nombre_mascota}</h2>
                            {reporte.estado_mascota === "Perdido" ? (
                                <p className="bg-red white-color px-4 py-1 mb-8 b-radius-4">{reporte.estado_mascota}</p>
                            ) : (
                                <p className="bg-tertiary white-color px-4 py-1 mb-8 b-radius-4">{reporte.estado_mascota}</p>
                            )}
                            <div className="grid grid-cols-s-2 gap-8 mb-8">
                                <div className="flex items-center">
                                    <img className="b-radius-4" src={`${process.env.REACT_APP_URL_API}/uploads/mascotas/${reporte.url_foto_mascota}`} alt="" />
                                </div>
                                <div className="grid grid-cols-2 grid-cols-s-1 gap-5">
                                    <div className="flex flex-column justify-between gap-5">
                                        <span><b>Especie: </b>{reporte.especie_mascota}</span>
                                        <span><b>Raza: </b>{reporte.raza_mascota}</span>
                                        <span><b>Edad: </b>{reporte.edad_mascota}</span>
                                        <span><b>Sexo: </b>{reporte.sexo_mascota}</span>
                                    </div>
                                    <div className="flex flex-column justify-between-s gap-5">
                                        <span><b>Color: </b>{reporte.color_mascota}</span>
                                        <span className="flex items-center gap-3">
                                            <img src={icono_calendario} alt="Icono de calendario" />
                                            <span>{new Date(reporte.fecha_reporte).toISOString().split('T')[0]}</span>
                                        </span>
                                        <span className="flex items-center gap-3">
                                            <img src={icono_ubicacion} alt="Icono de ubicación" />
                                            <span>{reporte.ubicacion_mascota}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-column gap-2 mb-8">
                                <h3 className="secondary-color m-0">Descripción</h3>
                                <p>{reporte.descripcion_mascota}</p>
                            </div>
                            <div className="flex flex-column gap-2 mb-8">
                                <h3 className="secondary-color m-0">Ubicación en el Mapa</h3>
                                <div className="h-25 h-45-s h-60-l " ref={mapaRef} ></div>
                            </div>
                            <div className="flex flex-column gap-2 mb-8">
                                <h3 className="secondary-color m-0">Información de Contacto</h3>
                                {
                                    contacto ? (
                                        <ContactoUsuario
                                            url_foto_usuario={`${process.env.REACT_APP_URL_API}/uploads/usuarios/${contacto.url_foto}`}
                                            nombres={contacto.nombres}
                                            apellidos={contacto.apellidos}
                                            telefono={contacto.telefono}
                                            correo={contacto.correo}
                                        />
                                    ) : (
                                        <div>Error</div>
                                    )
                                }
                            </div>
                        </Box>
                        <Comentarios id_reporte_mascota={reporte.id}/>
                    </>
                ) : (
                    <div>
                        <p className="black-color">No se encontró ningún reporte</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DetalleReporte;
