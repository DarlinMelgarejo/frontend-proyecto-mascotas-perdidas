import axios from 'axios';

// Configurar Axios para utilizar la base URL de la API y enviar las cookies
const api = axios.create({
  baseURL: `${process.env.REACT_APP_URL_API}/api/reportes-mascotas`,
  withCredentials: true,
});

// Función para obtener todos los reportes de mascotas
export const obtenerTodosLosReportes = () => api.get('/') 

// Función para registrar un nuevo reporte de mascota
export const registrarReporteMascota = (data) => api.post('/registrar', data);

export const obtenerResportesMascotasRecientes = () => api.get('/recientes')

// Función para obtener los reportes del usuario
export const obtenerMisResportesMascotas = () => api.get('/mis-reportes')

// Función para obtener algunos reportes del usuario
export const obtenerMisUltimosResportesMascotas = (n) => api.get(`/mis-reportes/${n}`)

// Función para obtener un reporte por ID
export const obtenerReporte = (id) => api.get(`/${id}`)

// Función para eliminar un reporte por ID
export const eliminarReporte = (id) => api.delete(`/${id}`);