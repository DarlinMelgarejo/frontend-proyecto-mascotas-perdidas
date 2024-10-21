const Box = ({titulo, children, borde}) => {
    const claseBox = borde ? "box border w-full" : "border w-full"
    return (
        <div className={claseBox}>
            {
                titulo && <h3 className="secondary-color mb-10">{titulo}</h3>
            }
            <div className="box__content">
                {children}
            </div>
        </div>
    )
}

export default Box