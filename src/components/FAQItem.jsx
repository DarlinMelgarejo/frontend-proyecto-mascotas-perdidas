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
        <div class={`faq-item ${abierto ? 'open' : ''}`}>
            <summary className="faq-item__title" onClick={abrir}>{titulo}</summary>
            <div class={`faq-item__content ${abierto ? 'open' : ''}`}>
                <p>{contenido}</p>
            </div>
        </div>
    )
}

export default FAQItem