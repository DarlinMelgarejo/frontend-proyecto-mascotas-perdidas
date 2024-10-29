import axios from 'axios';

// Configurar Axios para utilizar la base URL de la API y enviar las cookies
const api = axios.create({
  baseURL: 'http://localhost:5000/api/reportes-mascotas',
  withCredentials: true,
});

// Función para registrar un nuevo reporte de mascota
export const registrarReporteMascota = (data) => api.post('/registrar', data);

export const obtenerResportesMascotasRecientes = () => api.get('/recientes')