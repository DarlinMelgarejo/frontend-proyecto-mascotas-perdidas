import Login from './pages/Login';
import Registro from './pages/Registro';
import Inicio from './pages/Inicio';
import Buscar from './pages/Buscar';
import Reportar from './pages/Reportar';
import Adoptar from './pages/Adoptar';
import Nosotros from './pages/Nosotros';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => (
    <Router>
        <Routes>
            <Route path='/login' element={<Login/>} />
            <Route path='/registro' element={<Registro/>} />
            <Route path="/" element={<Inicio />} />
            <Route path="/buscar" element={<Buscar />} />
            <Route path="/adoptar" element={<Adoptar />} />
            <Route path="/reportar" element={<Reportar />} />
            <Route path="/nosotros" element={<Nosotros />} />
        </Routes>
    </Router>
);

export default App;
