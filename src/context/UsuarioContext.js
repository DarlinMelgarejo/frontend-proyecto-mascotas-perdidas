import React, { createContext, useState, useContext, useEffect } from 'react';
import { logearUsuario, obtenerPerfil, actualizarUsuario, actualizarFotoUsuario, cerrarSesion } from '../services/usuarios'; // Aquí importamos las funciones de API
import { useNavigate } from 'react-router-dom';

// Crear el contexto de usuario
const UserContext = createContext();

// Componente Provider para envolver tu aplicación
export function UserProvider({ children }) {
    const [usuario, setUsuario] = useState(null); // El usuario estará vacío inicialmente (no logueado)
    const [cargando, setCargando] = useState(true)
    const navigate = useNavigate()

    const login = async (data) => {
        try {
            const response = await logearUsuario(data)
            if(response.status === 200) {
                setUsuario(response.data)
                navigate("/")
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
        }
    }

    // Función para obtener el perfil del usuario (cuando recargamos la página o al iniciar sesión)
    const fetchUsuario = async () => {
        try {
            setCargando(true)
            const response = await obtenerPerfil(); // Obtenemos el perfil del usuario
            if(response.status === 200) {
                setUsuario(response.data); // Guardamos los datos del perfil
            } else {
                setUsuario(null)
            }
        } catch (error) {
            setUsuario(null);
        } finally {
            setCargando(false);
        }
    };

    // Función para actualizar la información del usuario
    const updateUser = async (newData) => {
        try {
            const response = await actualizarUsuario(newData); // Enviamos los datos actualizados al servidor
            setUsuario(response.data); // Actualizamos el estado con los datos del usuario
        } catch (error) {
            console.error('Error actualizando los datos del usuario:', error);
        }
    };

    // Función para actualizar la foto del usuario
    const updateUserPhoto = async (photoData) => {
        try {
            const response = await actualizarFotoUsuario(photoData); // Enviamos la nueva foto de perfil
            setUsuario(response.data); // Actualizamos el estado con los nuevos datos del usuario
        } catch (error) {
            console.error('Error actualizando la foto del usuario:', error);
        }
    };

    // Función para cerrar sesión
    const logout = async () => {
        try {
            const response = await cerrarSesion(); // Hacemos la petición para cerrar sesión
            if(response.status === 200) {
                setUsuario(null); // Limpiamos el estado de usuario
                navigate("/")
            }
        } catch (error) {
            console.error('Error cerrando sesión:', error);
        }
    };

    useEffect(() => {
        if(!usuario) {
            fetchUsuario()
            console.log("Obteniendo usuario")
            return
        }
        console.log(usuario.id)
    }, [usuario])

    return (
        <UserContext.Provider value={{ usuario, cargando, setUsuario, login, logout, fetchUsuario, updateUser, updateUserPhoto }}>
            {children}
        </UserContext.Provider>
    );
}

// Hook personalizado para usar el contexto
export function useUsuario() {
    return useContext(UserContext);
}
