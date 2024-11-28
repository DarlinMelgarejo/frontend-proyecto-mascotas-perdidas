import "./assets/sass/App.scss"

import Header from "./templates/Header";
import Footer from "./templates/Footer";

import Login from './pages/Login';
import RestablecerContraseña from "./pages/RestablecerContraseña";
import Registro from './pages/Registro';
import Inicio from './pages/Inicio';
import PerfilUsuario from './pages/PerfilUsuario';
import EditarPerfil from './pages/EditarPerfil';
import MisReportes from "./pages/MisReportes";
import ReporteMascota from "./pages/ReporteMascota";
import EditarReporte from "./pages/EditarReporte";
import Buscar from './pages/Buscar';
import Reportar from './pages/Reportar';
import Adoptar from './pages/Adoptar';
import Nosotros from './pages/Nosotros';

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { UserProvider } from "./context/UsuarioContext";

const Container = () => {
    const location = useLocation()
    
    const noHeaderFooter = ["/login", "/restablecer", "/registro"].includes(location.pathname)

    return (
        <>
            {!noHeaderFooter && <Header/>}
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/login" element={<Login/>} />
                <Route path="/restablecer" element={<RestablecerContraseña/>} />
                <Route path="/registro" element={<Registro/>} />
                <Route path="/perfil" element={<PerfilUsuario />} />
                <Route path="/editar-perfil" element={<EditarPerfil />} />
                <Route path="/mis-reportes" element={<MisReportes />} />
                <Route path="/reporte/:id" element={<ReporteMascota />} />
                <Route path="/editar-reporte/:id" element={<EditarReporte />} />
                <Route path="/buscar" element={<Buscar />} />
                <Route path="/adoptar" element={<Adoptar />} />
                <Route path="/reportar" element={<Reportar />} />
                <Route path="/nosotros" element={<Nosotros />} />
            </Routes>
            {!noHeaderFooter && <Footer/>}
        </>
    )
}

const App = () => {
    return (
        <Router>
            <UserProvider>
                <Container/>
            </UserProvider>
        </Router>
    );
}

export default App;
