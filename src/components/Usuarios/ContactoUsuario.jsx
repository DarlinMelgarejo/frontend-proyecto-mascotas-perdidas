import icono_telefono from "../../assets/images/icono_telefono.svg"
import icono_correo from "../../assets/images/icono_correo_secondary.svg"

const ContactoUsuario = ({url_foto_usuario, nombres, apellidos, telefono, correo}) => {
    return (
        <div className="box border w-full">
            <div className="flex flex-row items-center gap-6">
                <div className="w-15">
                    <img className="b-radius-25" src={url_foto_usuario} alt={`Foto de ${nombres.split(" ")[0]} ${apellidos.split(" ")[0]}`} />
                </div>
                <div className="flex flex-column gap-2">
                    <h4 className="m-0">{`${nombres.split(" ")[0]} ${apellidos.split(" ")[0]}`}</h4>
                    <div className="flex flex-row items-center gap-2">
                        <div className="w-5">
                            <img src={icono_telefono} alt="Icono Teléfono" />
                        </div>
                        <span className="mb-1">{telefono}</span>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                        <div className="w-5">
                            <img src={icono_correo} alt="Icono Correo" />
                        </div>
                        <span className="mb-1">{correo}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactoUsuario