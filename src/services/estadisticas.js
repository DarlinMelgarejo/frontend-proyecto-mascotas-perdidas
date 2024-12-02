import axios from 'axios';

// Configurar Axios para utilizar la base URL de la API y enviar las cookies
const api = axios.create({
  baseURL: `${process.env.REACT_APP_URL_API}/api/estadisticas`,
  withCredentials: true,
});

// Función para obtener todas las estadisticas del sitio
export const obtenerTodas = () => api.get('/') 

// Función para obtener todas las estadisticas de un usuario
export const obtenerTodasDeUnUsuario = () => api.get('/usuario') 
