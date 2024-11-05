import axios from 'axios';

// Configurar Axios para utilizar la base URL de la API y enviar las cookies
const api = axios.create({
  baseURL: `${process.env.REACT_APP_URL_API}/api/comentarios`,
  withCredentials: true,
});

// Función para obtener todos los reportes de mascotas
export const obtenerTodos = (id) => api.get(`/${id}`) 

// Función para registrar un nuevo reporte de mascota
export const registrarComentario = (data) => api.post('/registrar', data);

// Función para eliminar un reporte por ID
export const eliminarComentario = (id) => api.delete(`/${id}`);