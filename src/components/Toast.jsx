import { useEffect, useState } from "react";

const Toast = ({ titulo, contenido }) => {
    const [visible, setVisible] = useState(false); // Inicialmente no visible

    useEffect(() => {
        if (titulo && contenido) {
            setVisible(true); // Mostrar el Toast cuando haya nuevo título y contenido
            const temporizador = setTimeout(() => {
                setVisible(false); // Ocultar el Toast después de 3 segundos
            }, 3000);

            return () => clearTimeout(temporizador); // Limpiar el temporizador al desmontarse o al actualizar
        }
    }, [titulo, contenido]); // Se ejecuta cuando cambian el título o el contenido

    if (!visible) return null; // Si no está visible, no renderizar el Toast

    return (
        <div className="toast">
            <div className="toast__title">{titulo}</div>
            <div className="toast__content">{contenido}</div>
        </div>
    );
};

export default Toast;
