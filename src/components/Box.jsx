const Box = ({titulo, margenTitulo, margenAbajo, borde, children}) => {
    const claseBox = `box w-full ${borde ? "border" : ""} ${margenAbajo ? "mb-8" : ""}`.trim();
    const claseTitulo = margenTitulo ? "secondary-color mb-6" : "secondary-color m-0"
    return (
        <div className={claseBox}>
            {
                titulo && <h3 className={claseTitulo}>{titulo}</h3>
            }
            <div className="box__content">
                {children}
            </div>
        </div>
    )
}

export default Box