import banner_s from "../assets/images/banner-s.jpg";
import banner_m from "../assets/images/banner-m.jpg";
import banner_l from "../assets/images/banner-l.jpg";

const Banner = () => {
    return (
        <div className="main-banner">
            <img 
                src={banner_s} 
                srcSet={`${banner_m} 600w, ${banner_l} 1200w`} 
                sizes="(max-width: 600px) 100vw, 600px" 
                alt="Imagen del banner" 
                className="main-banner__image" 
            />
            <div className="main-banner__overlay"></div>
            <div className="main-banner__content">
                <h2 className="main-banner__title">Ayuda a reunir mascotas con sus familias</h2>
                <p className="main-banner__description">Reporta animales perdidos o abandonados y ayuda a que encuentren un hogar</p>
                <button className="main-banner__button">Reportar un animal</button>
            </div>
        </div>
    );
};

export default Banner;
