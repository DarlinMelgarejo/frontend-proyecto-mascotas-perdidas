import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import L from "leaflet";
import { actualizarReporte, obtenerReporte } from "../../services/reportesMascotas";
import Toast from '../Toast';

const EditarReporteMascota = ({ id }) => {
    const reporteID = id
    const [toast, setToast] = useState({
        titulo: "",
        contenido: ""
    })

    const navigate = useNavigate();
    const [reporteMascota, setReporteMascota] = useState({
        fecha_reporte: new Date().toISOString().split('T')[0],
        nombre_mascota: 'Desconocido',
        especie_mascota: 'Perro',
        raza_mascota: 'Desconocido',
        color_mascota: '',
        sexo_mascota: 'Desconocido',
        edad_mascota: '',
        descripcion_mascota: '',
        url_foto_mascota: '',
        estado_mascota: 'Perdido',
        procedencia_mascota: 'Pacasmayo',
        ubicacion_mascota: '',
        longitud_ubicacion: 0,
        latitud_ubicacion: 0
    });
    const [nuevafotoMascota, setNuevaFotoMascota] = useState(null);
    const fileInputRef = useRef(null);
    const mapRef = useRef(null);

    const getReporte = async () => {
        try {
            const response = await obtenerReporte(reporteID);
            if (response.status === 200) {
                console.log(response.data.reporte)
                setReporteMascota(response.data.reporte);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNuevaFotoMascota(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setReporteMascota({ ...reporteMascota, [name]: value });
    };

    const enviarFormulario = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        
        try {
            formData.append('fecha_reporte', reporteMascota.fecha_reporte.split('T')[0]);
            formData.append('nombre_mascota', reporteMascota.nombre_mascota);
            formData.append('especie_mascota', reporteMascota.especie_mascota);
            formData.append('raza_mascota', reporteMascota.raza_mascota);
            formData.append('color_mascota', reporteMascota.color_mascota);
            formData.append('sexo_mascota', reporteMascota.sexo_mascota);
            formData.append('edad_mascota', reporteMascota.edad_mascota);
            formData.append('descripcion_mascota', reporteMascota.descripcion_mascota);
            formData.append('url_foto_mascota', reporteMascota.url_foto_mascota);
            formData.append('estado_mascota', reporteMascota.estado_mascota);
            formData.append('procedencia_mascota', reporteMascota.procedencia_mascota);
            formData.append('ubicacion_mascota', reporteMascota.ubicacion_mascota);
            formData.append('longitud_ubicacion', reporteMascota.longitud_ubicacion);
            formData.append('latitud_ubicacion', reporteMascota.latitud_ubicacion);
            
            if (nuevafotoMascota) {
                formData.append('foto_mascota', fileInputRef.current.files[0]);
            }
            
            const response = await actualizarReporte(reporteID, formData); // Asegúrate de usar 'await' aquí
            
            if (response.status === 200) {
                setToast({
                    titulo: "Actualización exitosa",
                    contenido: "Se actualizó correctamente el reporte de la mascota."
                })
                
                setReporteMascota({
                    ...reporteMascota,
                    fecha_reporte: new Date().toISOString().split('T')[0],
                    nombre_mascota: '',
                    especie_mascota: 'Perro',
                    raza_mascota: '',
                    color_mascota: '',
                    sexo_mascota: 'Desconocido',
                    edad_mascota: '',
                    descripcion_mascota: '',
                    estado_mascota: 'Perdido',
                    procedencia_mascota: 'Pacasmayo',
                    ubicacion_mascota: '',
                    longitud_ubicacion: 0,
                    latitud_ubicacion: 0
                });
                
                setNuevaFotoMascota(null);
                
                setTimeout(() => {
                    navigate('/buscar');
                }, 3000)
            }
        } catch (error) {
            setToast({
                titulo: "Error al actualizar",
                contenido: "Error al actualizar el reporte de la mascota. Por favor, inténtalo de nuevo."
            })
        }
    };

    useEffect(() => {
        getReporte();
    }, []);
    
    // Inicializa el mapa
    useEffect(() => {
        if (reporteMascota.procedencia_mascota === 'Pacasmayo') {
            [reporteMascota.latitud_ubicacion, reporteMascota.longitud_ubicacion] = [-7.40111, -79.5722]; // Coordenadas de Pacasmayo
        } else if(reporteMascota.procedencia_mascota === 'San Pedro de Lloc'){
            [reporteMascota.latitud_ubicacion, reporteMascota.longitud_ubicacion] = [-7.43194, -79.5042];
        }
        const mapInstance = L.map(mapRef.current).setView([reporteMascota.latitud_ubicacion, reporteMascota.longitud_ubicacion], 15);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
        }).addTo(mapInstance);

        const newMarker = L.marker([reporteMascota.latitud_ubicacion, reporteMascota.longitud_ubicacion]).addTo(mapInstance)
            .bindPopup(`${reporteMascota.ubicacion_mascota}`)
            .openPopup();

        mapInstance.on('click', (e) => {
            const lat = e.latlng.lat;
            const lng = e.latlng.lng;
            newMarker.setLatLng(e.latlng);
            fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`)
                .then(response => response.json())
                .then(data => {
                    const locationName = data.display_name || 'Ubicación desconocida';
                    newMarker.bindPopup(locationName).openPopup();
                    setReporteMascota(prev => {
                        const updatedMascota = { ...prev, ubicacion_mascota: locationName, latitud_ubicacion: Number(lat), longitud_ubicacion: Number(lng) };
                        // console.log(`Latitud: ${updatedMascota.latitud_ubicacion}, Longitud: ${updatedMascota.longitud_ubicacion}`);
                        return updatedMascota;
                    });
                })
                .catch(err => {
                    console.error('Error al obtener el nombre de la ubicación:', err);
                });
        });

        return () => {
            mapInstance.remove(); // Limpiar el mapa al desmontar el componente
        };
    }, [reporteMascota.procedencia_mascota]);

    return (
        <>
            { 
                reporteMascota ? (
                    <form className="w-full" encType="multipart/form-data" onSubmit={enviarFormulario}>
                        <Toast titulo={toast.titulo} contenido={toast.contenido}></Toast>
                        <div className="flex flex-column flex-row-m gap-4 mb-4">
                            <div className="flex flex-column w-1-2-m">
                                <label className="form-label form-label-dark" htmlFor="fecha_reporte">Fecha de Pérdida/Encuentro</label>
                                <input
                                    className="form-control form-control-dark"
                                    type="date"
                                    id="fecha_reporte"
                                    name="fecha_reporte"
                                    value={reporteMascota.fecha_reporte.split('T')[0]}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex flex-column w-1-2-m">
                                <label className="form-label form-label-dark">Tipo de Reporte</label>
                                <div className="flex flex-column flex-row-s items-center gap-4">
                                    <label className="flex gap-2">
                                        <input
                                            type="radio"
                                            name="estado_mascota"
                                            value="Perdido"
                                            checked={reporteMascota.estado_mascota === 'Perdido'}
                                            onChange={handleChange}
                                        />
                                        <span>Animal Perdido</span>
                                    </label>
                                    <label className="flex gap-2">
                                        <input
                                            type="radio"
                                            name="estado_mascota"
                                            value="Encontrado"
                                            checked={reporteMascota.estado_mascota === 'Encontrado'}
                                            onChange={handleChange}
                                        />
                                        <span>Animal Encontrado</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-column flex-row-m gap-4 mb-4">
                            <div className="flex flex-column w-1-2-m">
                                <label className="form-label form-label-dark" htmlFor="especie_mascota">Especie</label>
                                <select className="form-control form-control-dark" id="especie_mascota" name="especie_mascota" value={reporteMascota.especie_mascota} onChange={handleChange}>
                                    <option value="Perro">Perro</option>
                                    <option value="Gato">Gato</option>
                                    <option value="Otro">Otro</option>
                                </select>
                            </div>
                            <div className="flex flex-column w-1-2-m">
                                <label className="form-label form-label-dark" htmlFor="nombre_mascota">Nombre del animal (si se conoce)</label>
                                <input
                                    className="form-control form-control-dark"
                                    type="text"
                                    id="nombre_mascota"
                                    name="nombre_mascota"
                                    value={reporteMascota.nombre_mascota}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="flex flex-column flex-row-m gap-4 mb-4">
                            <div className="flex flex-column w-1-2-m">
                                <label className="form-label form-label-dark" htmlFor="raza_mascota">Raza</label>
                                <input
                                    className="form-control form-control-dark"
                                    type="text"
                                    id="raza_mascota"
                                    name="raza_mascota"
                                    value={reporteMascota.raza_mascota}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex flex-column w-1-2-m">
                                <label className="form-label form-label-dark" htmlFor="color_mascota">Color</label>
                                <input
                                    className="form-control form-control-dark"
                                    type="text"
                                    id="color_mascota"
                                    name="color_mascota"
                                    value={reporteMascota.color_mascota}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex flex-column flex-row-m gap-4 mb-4">
                            <div className="flex flex-column w-1-2-m">
                                <label className="form-label form-label-dark" htmlFor="sexo_mascota">Sexo</label>
                                <select className="form-control form-control-dark" id="sexo_mascota" name="sexo_mascota" value={reporteMascota.sexo_mascota} onChange={handleChange}>
                                    <option value="Desconocido">Desconocido</option>
                                    <option value="Macho">Macho</option>
                                    <option value="Hembra">Hembra</option>
                                </select>
                            </div>
                            <div className="flex flex-column w-1-2-m">
                                <label className="form-label form-label-dark" htmlFor="edad_mascota">Edad Aproximada</label>
                                <input
                                    className="form-control form-control-dark"
                                    type="text"
                                    id="edad_mascota"
                                    name="edad_mascota"
                                    placeholder='Ejem: 1 año y 3 meses'
                                    value={reporteMascota.edad_mascota}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="flex flex-column mb-4">
                            <label className="form-label form-label-dark" htmlFor="procedencia_mascota">Procedencia</label>
                            <select className="form-control form-control-dark" id="procedencia_mascota" name="procedencia_mascota" value={reporteMascota.procedencia_mascota} onChange={handleChange} required>
                                <option value="Pacasmayo">Pacasmayo</option>
                                <option value="San Pedro de Lloc">San Pedro de Lloc</option>
                            </select>
                        </div>
                        <div className="flex flex-column mb-4">
                            <label className="form-label form-label-dark" htmlFor="ubicacion_mascota">Ubicación</label>
                            <div className="mb-4" ref={mapRef} style={{ height: '500px', width: '100%' }}></div>
                            <input
                                className="form-control form-control-dark"
                                type="text"
                                id="ubicacion_mascota"
                                name="ubicacion_mascota"
                                placeholder='Seleccione una ubicación en el mapa'
                                value={reporteMascota.ubicacion_mascota}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-column mb-4">
                            <label className="form-label form-label-dark" htmlFor="descripcion_mascota">Descripción</label>
                            <textarea
                                className="form-control form-control-dark"
                                id="descripcion_mascota"
                                name="descripcion_mascota"
                                placeholder="Coloque todos los detalles que pueda de la mascota"
                                value={reporteMascota.descripcion_mascota}
                                onChange={handleChange}
                                rows="4"
                                cols="50"
                            />
                        </div>
                        <div className="flex flex-column mb-4">
                            <label className="form-label form-label-dark">Foto actual</label>
                            <img 
                                src={nuevafotoMascota || `${process.env.REACT_APP_URL_API}/uploads/mascotas/${reporteMascota.url_foto_mascota}`} 
                                alt={`Foto de  ${reporteMascota.nombre_mascota}`} 
                                title="Cambiar foto de perfil" 
                                onClick={() => fileInputRef.current.click()} 
                            />
                        </div>
                        <div className="flex flex-column mb-4">
                            <label className="form-label form-label-dark" htmlFor="foto_mascota">Foto de la Mascota</label>
                            <div className="flex flex-column flex-row-s items-center-s gap-2">
                                <button
                                    className="btn btn-white"
                                    type="button"
                                    onClick={() => fileInputRef.current.click()}
                                >
                                    Seleccionar Imagen
                                </button>
                                <input
                                    type="file"
                                    id="foto_mascota"
                                    name="foto_mascota"
                                    ref={fileInputRef}
                                    onChange={handleImageChange}
                                    accept="image/*"
                                />
                            </div>
                        </div>
                        <button className='btn btn-secondary w-full' type="submit">Guardar Cambios</button>
                    </form>

                ) : (
                    <div className="dark-color">ERROR</div>
                )
            }
        </>
    )
}

export default EditarReporteMascota