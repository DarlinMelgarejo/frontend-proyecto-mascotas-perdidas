import axios from 'axios';

// Configurar Axios para utilizar la base URL de la API y enviar las cookies
const api = axios.create({
  baseURL: `${process.env.REACT_APP_URL_API}/api/usuarios`,
  withCredentials: true,
});

// Función para registrar un nuevo usuario
export const registrarUsuario = (data) => api.post('/registrar', data);

// Función para logear un usuario
export const logearUsuario = (data) => api.post('/logear', data);

// Función para cerrar la sesión del usuario autenticado
export const cerrarSesion = () => api.post('/cerrar-sesion');

// Función para solicitar el código de verificación (envío al correo)
export const solicitarCodigoVerificacion = (correo) => api.post('/solicitar-codigo', { correo });

// Función para validar el código de verificación
export const validarCodigoVerificacion = (correo, codigoVerificacion) => api.post('/validar-codigo', { correo, codigoVerificacion });

// Función para restablecer la contraseña (validación del código y actualización de la contraseña)
export const restablecerContraseña = (correo, nuevaContrasena) => api.post('/restablecer-contrasena', { correo, nuevaContrasena });

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

// Función para eliminar un usuario por ID
export const eliminarUsuario = (id) => api.delete(`/${id}`);
