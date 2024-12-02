import React, { createContext, useState, useContext, useEffect } from 'react';
import { logearUsuario, obtenerPerfil, cerrarSesion } from '../services/usuarios'; // Aquí importamos las funciones de API
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
                setUsuario(response.data.usuario)
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
                setUsuario(response.data.usuario); // Guardamos los datos del perfil
            } else {
                setUsuario(null)
            }
        } catch (error) {
            setUsuario(null);
        } finally {
            setCargando(false);
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
            return
        }
    }, [usuario])

    return (
        <UserContext.Provider value={{ usuario, cargando, setUsuario, login, logout, fetchUsuario }}>
            {children}
        </UserContext.Provider>
    );
}

// Hook personalizado para usar el contexto
export function useUsuario() {
    return useContext(UserContext);
}
