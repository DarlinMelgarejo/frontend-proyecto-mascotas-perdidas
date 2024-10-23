import axios from 'axios';

// Configurar Axios para utilizar la base URL de la API y enviar las cookies
const api = axios.create({
  baseURL: 'http://localhost:5000/api/usuarios',
  withCredentials: true,
});

// Función para registrar un nuevo usuario
export const registrarUsuario = (data) => api.post('/registrar', data);

// Función para logear un usuario
export const logearUsuario = (data) => api.post('/logear', data);

// Función para cerrar la sesión del usuario autenticado
export const cerrarSesion = () => api.post('/cerrar-sesion');

// Función para obtener todos los usuarios (requeriría autenticación)
export const obtenerUsuarios = () => api.get('/');

// Función para verificar si el usuario está autenticado
export const verificarAutenticacion = () => api.get('/verificado');

// Función para obtener el perfil del usuario autenticado
export const obtenerPerfil = () => api.get('/perfil');

// Función para obtener un usuario por ID (requeriría autenticación)
export const obtenerUsuarioPorId = (id) => api.get(`/${id}`);

// Función para actualizar un usuario por ID
export const actualizarUsuario = (data) => api.patch('/', data);

// Función para actualizar un usuario por ID
export const actualizarFotoUsuario = (data) => api.patch('/foto', data);

// Función para eliminar un usuario por ID
export const eliminarUsuario = (id) => api.delete(`/${id}`);
