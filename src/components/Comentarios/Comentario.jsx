import { useState, useEffect, useRef } from "react"

const Comentario = ({ usuario, contenido }) => {
    
    const [ reportado, setReportado ] = useState(false)

    const comentarioReferencia = useRef()

    const reportar = () => {
        setReportado(true)
        const comentario = comentarioReferencia.current
        comentario.classList.add("reportado")
    }

    useEffect(() => {
        console.log("Iniciando componente Comentario", Date.now())
    }, [])
    
    return (
        <div className="comentario" ref={comentarioReferencia}>
            <strong>{usuario}</strong>
            <p>
                {
                    reportado ? "Comentario reportado" : contenido
                }
            </p>
            {   
                !reportado && <button onClick={reportar}>Reportar</button>
            }
        </div>
    )
}

export default Comentario