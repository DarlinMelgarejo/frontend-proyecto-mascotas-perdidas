import { useState } from "react"

const FAQItem = ({titulo, contenido}) => {
    const [abierto, setAbierto] = useState(false)

    const abrir = () => {
        if(abierto) {
            setAbierto(false)
        } else {
            setAbierto(true)
        }
    }

    return (
        <div className={`faq-item ${abierto ? 'open' : ''}`}>
            <summary className="faq-item__title" onClick={abrir}>{titulo}</summary>
            <div className={`faq-item__content ${abierto ? 'open' : ''}`}>
                <p>{contenido}</p>
            </div>
        </div>
    )
}

export default FAQItem