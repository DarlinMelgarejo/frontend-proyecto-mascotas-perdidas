import { useEffect, useState } from "react"

const Toast = ({titulo, contenido}) => {
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        if(visible) {
            const temporizador = setTimeout(() => {
                setVisible(false)
            }, 3000)
            return () => clearTimeout(temporizador)
        }
    }, [titulo, contenido])

    if (!visible) return null

    return (
        <div className="toast">
            <div className="toast__title">{titulo}</div>
            <div className="toast__content">{contenido}</div>
        </div>
    )
}

export default Toast