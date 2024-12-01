import { useEffect, useState } from "react";

const Toast = ({ titulo, contenido }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (titulo && contenido) {
            setVisible(true); // Mostrar el Toast cuando haya nuevo título y contenido
            const timer = setTimeout(() => {
                setVisible(false); // Ocultar el Toast después de 3 segundos
            }, 3000);

            // Limpiar el timer si el toast es ocultado antes de 3 segundos
            return () => clearTimeout(timer);
        }
    }, [titulo, contenido]); // El useEffect se ejecuta cuando el titulo o contenido cambian

    if (!visible) return null; // Si no está visible, no renderizar el Toast

    return (
        <div className="toast">
            <div className="toast__title">{titulo}</div>
            <div className="toast__content">{contenido}</div>
        </div>
    );
};

export default Toast;
