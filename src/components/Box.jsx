const Box = ({titulo, margenTitulo, borde, children}) => {
    const claseBox = borde ? "box border w-full" : "border w-full"
    const claseTitulo = margenTitulo ? "secondary-color mb-8" : "secondary-color m-0"
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