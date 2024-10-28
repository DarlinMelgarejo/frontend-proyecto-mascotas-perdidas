import RegistrarUsuario from "../components/Usuarios/RegistrarUsuario";

const Registro = () => {
    

    return (
        <div className="registro">
            <div className="registro__content">
                <div className="registro__header py-6 px-6">
                    <h2 className="registro__title">Registro de Usuario</h2>
                    <p className="registro__description">Crea una cuenta para poder reportar animales</p>
                </div>
                <RegistrarUsuario/>
            </div>
        </div>
    );
};

export default Registro;
