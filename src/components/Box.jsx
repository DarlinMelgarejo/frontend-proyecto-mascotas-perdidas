const Box = ({titulo, children}) => {
    return (
        <div className="box">
            <h3 className="secondary-color mb-10">{titulo}</h3>
            <div className="box__content">
                {children}
            </div>
        </div>
    )
}

export default Box