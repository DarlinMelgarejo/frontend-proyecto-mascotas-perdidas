import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const FormularioMascota = () => {
    const navigate = useNavigate();
    const [mascota, setMascota] = useState({
        nombre: 'Sin nombre', // Valor por defecto según la base de datos
        especie: 'Perro',
        raza: '',
        color: '',
        sexo: 'Desconocido',
        edad: '',
        descripcion: '',
        estado: 'Perdido',
        estado_adopcion: 'No aplica',
        procedencia: 'Pacasmayo',
        ubicacion: '',  // Verificar si sesion existe
    });

    const [imagen, setImagen] = useState(null);  // Para manejar la imagen
    const [error, setError] = useState('');

    // Manejar el cambio de los inputs del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setMascota({ ...mascota, [name]: value });
    };

    // Manejar la carga de imagen
    const handleImageChange = (e) => {
        setImagen(e.target.files[0]);
    };

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        

        // Crear un objeto FormData para enviar los datos y la imagen
        const formData = new FormData();
        Object.keys(mascota).forEach((key) => {
            if (mascota[key] !== null && mascota[key] !== undefined) {
                formData.append(key, mascota[key]);
            }            
        });
        if (imagen) {
            formData.append('imagen', imagen);  // Añadir la imagen
        }

        try {
            // Enviar la petición al backend
            const response = await axios.post('http://localhost:5000/api/mascotas/registrar', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,  // Asegura que se envíen las cookies para la autenticación
            });

            if (response.status === 201) {
                alert('Mascota registrada exitosamente');
                setMascota({
                    nombre: 'Sin nombre',
                    especie: 'Perro',
                    raza: '',
                    color: '',
                    sexo: 'Desconocido',
                    edad: '',
                    descripcion: '',
                    estado: 'Perdido',
                    estado_adopcion: 'No aplica',
                    procedencia: 'Pacasmayo',
                    ubicacion: ''
                });
                setImagen(null);
                navigate('/buscar')
            }
        } catch (error) {
            console.error('Error al registrar mascota:', error);
            setError('Error al registrar la mascota. Por favor, inténtalo de nuevo.');
        }
    };

    return (
        <div className="l-container">
            <form className="formMascota" onSubmit={handleSubmit} encType="multipart/form-data">
                {error && <p className="error">{error}</p>}
                <div className="formMascota__section">
                    <label className="formMascota__label center-block">Tipo de Reporte</label>
                    <div className="formMascota__options">
                        <label>
                            <input
                                type="radio"
                                name="estado"
                                value="Perdido"
                                checked={mascota.estado === 'Perdido'}
                                onChange={handleChange}
                            />
                            Animal Perdido
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="estado"
                                value="Encontrado"
                                checked={mascota.estado === 'Encontrado'}
                                onChange={handleChange}
                            />
                            Animal Encontrado
                        </label>
                    </div>
                </div>

                <div className="formMascota__section-double">
                    <div className="formMascota__part">
                        <label className="formMascota__label" htmlFor="especie">Especie:</label>
                        <select id="especie" name="especie" value={mascota.especie} onChange={handleChange}>
                            <option value="Perro">Perro</option>
                            <option value="Gato">Gato</option>
                            <option value="Otro">Otro</option>
                        </select>
                    </div>
                    <div className="formMascota__part">
                        <label className="formMascota__label" htmlFor="nombre">Nombre del animal (si se conoce):</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={mascota.nombre}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="formMascota__section-double">
                    <div className="formMascota__part">
                        <label className="formMascota__label" htmlFor="raza">Raza:</label>
                        <input
                            type="text"
                            id="raza"
                            name="raza"
                            value={mascota.raza}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="formMascota__part">
                        <label className="formMascota__label" htmlFor="color">Color:</label>
                        <input
                            type="text"
                            id="color"
                            name="color"
                            value={mascota.color}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="formMascota__section-double">
                    <div className="formMascota__part">
                        <label className="formMascota__label" htmlFor="sexo">Sexo:</label>
                        <select id="sexo" name="sexo" value={mascota.sexo} onChange={handleChange}>
                            <option value="Desconocido">Desconocido</option>
                            <option value="Macho">Macho</option>
                            <option value="Hembra">Hembra</option>
                        </select>
                    </div>
                    <div className="formMascota__part">
                        <label className="formMascota__label" htmlFor="edad">Edad Aproximada:</label>
                        <input
                            type="text"
                            id="edad"
                            name="edad"
                            value={mascota.edad}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="formMascota__section">
                    <label className="formMascota__label" htmlFor="procedencia">Procedencia:</label>
                    <select id="procedencia" name="procedencia" value={mascota.procedencia} onChange={handleChange} required>
                        <option value="Pacasmayo">Pacasmayo</option>
                        <option value="San Pedro de Lloc">San Pedro de Lloc</option>
                    </select>
                </div>

                <div className="formMascota__section">
                    <label className="formMascota__label" htmlFor="ubicacion">Ubicación:</label>
                    <input
                        type="text"
                        id="ubicacion"
                        name="ubicacion"
                        value={mascota.ubicacion}
                        onChange={handleChange}
                    />
                </div>

                <div className="formMascota__section">
                    <label className="formMascota__label" htmlFor="descripcion">Descripción:</label>
                    <textarea
                        id="descripcion"
                        name="descripcion"
                        value={mascota.descripcion}
                        onChange={handleChange}
                        rows="4"
                        cols="50"
                    />
                </div>

                <div className="formMascota__section">
                    <label className="formMascota__label" htmlFor="imagen">Imagen de la Mascota:</label>
                    <label className="formMascota__file">
                        Seleccionar Archivo
                        <input
                            type="file"
                            id="imagen"
                            name="imagen"
                            onChange={handleImageChange}
                            accept="image/*"
                            required
                        />
                    </label>
                </div>

                <button type="submit">Reportar Mascota</button>
            </form>
        </div>
    );
};

export default FormularioMascota;
