import icono_alerta from "../assets/images/icono-alerta-16-rojo.png" 

import Box from "../components/Box"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { restablecerContraseña, solicitarCodigoVerificacion, validarCodigoVerificacion } from "../services/usuarios"

const PASOS = {
    CORREO: 'correo',
    CODIGO: 'codigo',
    NUEVA_CONTRASEÑA: 'nueva_contraseña'
  }

const RestablecerContraseña = () => {
    const [paso, setPaso] = useState(PASOS.CORREO)
    const [correo, setCorreo] = useState('')
    const [codigo, setCodigo] = useState('')
    const [nuevaCotraseña, setNuevaContraseña] = useState('')
    const [confirmarContraseña, setConfirmarContraseña] = useState('')
    const [enviado, setEnviado] = useState(false)
    const navigate = useNavigate()

    const enviarCorreo = async (e) => {
        e.preventDefault()
        setEnviado(true)
        
        try {
            const response = await solicitarCodigoVerificacion(correo);
            if (response.status === 200) {
                setEnviado(false)
                alert(response.data.mensaje)
                setPaso(PASOS.CODIGO)
            }
        } catch (err) {
            alert(err)
        }
    }

    const verificarCodigo = async (e) => {
        e.preventDefault()
        setEnviado(true)

        try {
            const response = await validarCodigoVerificacion(correo, codigo);
            if (response.status === 200) {
                setEnviado(false)
                alert(response.data.mensaje)
                setPaso(PASOS.NUEVA_CONTRASEÑA)
            }
        } catch (err) {
            alert(err)
        }
    }

    const cambiarContraseña = async (e) => {
        e.preventDefault()

        if(nuevaCotraseña !== confirmarContraseña) {
            alert("Las contraseñas no coinciden")
            return
        }

        setEnviado(true)

        try {
            const response = await restablecerContraseña(correo, nuevaCotraseña);
            if (response.status === 200) {
                setEnviado(false)
                alert(response.data.mensaje)
                navigate('/login')
            }
        } catch (err) {
            alert(err)
        }
    }

    return (
        <div className="restablecer-contraseña">
            <div className="restablecer-contraseña__content">
                {paso === PASOS.CORREO && <>
                    <Box titulo="Restablecer Contraseña" borde>
                        <p className="mb-6">Ingresa tu correo electrónico para recibir el código de verificación.</p>
                        <form onSubmit={enviarCorreo}>
                            <div className="flex flex-column mb-4">
                                <label htmlFor="correo" className="text-bold mb-2">Correo Electrónico</label>
                                <input
                                    className="form-control form-control-dark"
                                    type="email"
                                    name="correo"
                                    id="correo"
                                    placeholder="tu@gmail.com"
                                    value={correo}
                                    onChange={(e) => setCorreo(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex">
                                <button className="btn btn-secondary w-full" type="submit">{enviado ? "Enviando..." : "Enviar código"}</button>
                            </div>
                        </form>
                    </Box>
                    <div className="restablecer-contraseña__alert mt-8">
                        <div className="flex items-start gap-2">
                            <img className="mt-1" src={icono_alerta} alt="Icono de Alerta" />
                            <div>
                                <span className="restablecer-contraseña__alert-title text-bold">Importante</span>
                                <p className="restablecer-contraseña__alert-content">Si no recibes el código en unos minutos, revisa tu carpeta de spam o correo no deseado.</p>
                            </div>
                        </div>
                    </div>
                </>}

                {paso === PASOS.CODIGO && <>
                    <Box titulo="Restablecer Contraseña" borde>
                        <p className="mb-6">Ingresa el código de 6 dígitos enviado a tu correo electrónico.</p>
                        <form onSubmit={verificarCodigo}>
                            <div className="flex flex-column mb-4">
                                <label htmlFor="codigo" className="text-bold mb-2">Código de Verificación</label>
                                <input
                                    className="form-control form-control-dark"
                                    type="text"
                                    name="codigo"
                                    id="codigo"
                                    placeholder="Ingresa el código de 6 dígitos"
                                    value={codigo}
                                    onChange={(e) => setCodigo(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex">
                                <button className="btn btn-secondary w-full" type="submit">{enviado ? "Verificando..." : "Verificar código"}</button>
                            </div>
                        </form>
                    </Box>
                    <div className="restablecer-contraseña__alert mt-8">
                        <div className="flex items-start gap-2">
                            <img className="mt-1" src={icono_alerta} alt="Icono de Alerta" />
                            <div>
                                <span className="restablecer-contraseña__alert-title text-bold">Importante</span>
                                <p className="restablecer-contraseña__alert-content">El código de verificación expirará en 10 minutos. Si no lo recibes, puedes solicitar uno nuevo.</p>
                            </div>
                        </div>
                    </div>
                </>}

                {paso === PASOS.NUEVA_CONTRASEÑA && <>
                    <Box titulo="Restablecer Contraseña" borde>
                        <p className="mb-6">Ingresa y confirma tu nueva contraseña. </p>
                        <form onSubmit={cambiarContraseña}>
                            <div className="flex flex-column mb-4">
                                <label htmlFor="nueva_contraseña" className="text-bold mb-2">Nueva Contraseña</label>
                                <input
                                    className="form-control form-control-dark"
                                    type="password"
                                    name="nueva_contraseña"
                                    id="nueva_contraseña"
                                    placeholder="Nueva contraseña"
                                    value={nuevaCotraseña}
                                    onChange={(e) => setNuevaContraseña(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex flex-column mb-4">
                                <label htmlFor="confirmar_contraseña" className="text-bold mb-2">Confirmar Contraseña</label>
                                <input
                                    className="form-control form-control-dark"
                                    type="password"
                                    name="confirmar_contraseña"
                                    id="confirmar_contraseña"
                                    placeholder="Confirmar contraseña"
                                    value={confirmarContraseña}
                                    onChange={(e) => setConfirmarContraseña(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex">
                                <button className="btn btn-secondary w-full" type="submit">{enviado ? "Actualizando..." : "Actualizar contraseña"}</button>
                            </div>
                        </form>
                    </Box>
                    <div className="restablecer-contraseña__alert mt-8">
                        <div className="flex items-start gap-2">
                            <img className="mt-1" src={icono_alerta} alt="Icono de Alerta" />
                            <div>
                                <span className="restablecer-contraseña__alert-title text-bold">Importante</span>
                                <p className="restablecer-contraseña__alert-content">Asegurate de elegir una contraseña segura y única que no hayas usado en otros sitios.</p>
                            </div>
                        </div>
                    </div>
                </>}
            </div>
        </div>
    )
}

export default RestablecerContraseña