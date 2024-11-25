import { createPortal } from "react-dom"

const Modal = ({ abierto, cerrar, funcion, boton, children}) => {

    if (!abierto) return null

    return createPortal(
        <div role="dialog" aria-modal="true" aria-labelledby="modal-title" className="modal">
            <div className="modal__content">
                {children}
                <div className="modal__buttons">
                    <button onClick={cerrar} className="btn btn-white">Cancelar</button>
                    <button onClick={funcion} className="btn">{boton}</button>
                </div>
            </div>
        </div>,
        document.body // El Modal se renderiza en el <body>
    )
}

export default Modal