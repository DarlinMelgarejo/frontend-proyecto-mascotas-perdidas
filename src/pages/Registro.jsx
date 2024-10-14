import "../assets/sass/registro.scss"

const Registro = () => {

    return (
        <div className="registro">
            <div className="registro__content">
                <div className="registro__header py-6 px-6">
                    <h2 className="registro__title">Registro de Usuario</h2>
                    <p className="registro__description">Crea una cuenta para poder reportar animales</p>
                </div>
                <form className="py-6 px-6">
                    <div className="flex flex-column flex-row-m gap-4 mb-4">
                        <div className="flex flex-column w-1-2-m">
                            <label htmlFor="nombres" className="registro__label">Nombres</label>
                            <input
                                className="form-control"
                                type="text"
                                name="nombres"
                                id="nombres"
                            />
                        </div>
                        <div className="flex flex-column w-1-2-m">
                            <label htmlFor="apellidos" className="registro__label">Apellidos</label>
                            <input
                                className="form-control"
                                type="text"
                                name="apellidos"
                                id="apellidos"
                            />
                        </div>
                    </div>
                    <div className="flex flex-column flex-row-m gap-4 mb-4">
                        <div className="flex flex-column w-1-2-m">
                            <label htmlFor="dni" className="registro__label">DNI</label>
                            <input
                                className="form-control"
                                type="text"
                                name="dni"
                                id="dni"
                            />
                        </div>
                        <div className="flex flex-column w-1-2-m">
                            <label htmlFor="correo" className="registro__label">Correo</label>
                            <input
                                className="form-control"
                                type="email"
                                name="correo"
                                id="correo"
                            />
                        </div>
                    </div>
                    <div className="flex flex-column flex-row-m gap-4 mb-4">
                        <div className="flex flex-column w-1-2-m">
                            <label htmlFor="contraseña" className="registro__label">Contraseña</label>
                            <input
                                className="form-control"
                                type="password"
                                name="contraseña"
                                id="contraseña"
                            />
                        </div>
                        <div className="flex flex-column w-1-2-m">
                            <label htmlFor="confirmarContraseña" className="registro__label">Confirmar Contraseña</label>
                            <input
                                className="form-control"
                                type="password"
                                name="confirmarContraseña"
                                id="confirmarContraseña"
                            />
                        </div>
                    </div>
                    <div className="flex flex-column mb-4">
                        <label htmlFor="telefono" className="registro__label">Teléfono</label>
                        <input
                            className="form-control"
                            type="tel"
                            name="telefono"
                            id="telefono"
                        />
                    </div>
                    <div className="flex flex-column">
                        <label htmlFor="direccion" className="registro__label">Dirección</label>
                        <input
                            className="form-control"
                            type="text"
                            name="direccion"
                            id="direccion"
                        />
                    </div>
                    <div className="flex flex-row items-center gap-2 mb-6 py-2">
                        <input
                            type="checkbox" 
                            name="recordarme" 
                            id="recordarme" 
                        />
                        <label className="registro__label flex gap-2 w-full secondary-color mb-1">Acepto los términos y condiciones y la política de privacidad</label>
                    </div>
                    <div className="flex flex-column center-content">
                        <button className="btn btn-tertiary w-full" type="submit">Registrarse</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Registro