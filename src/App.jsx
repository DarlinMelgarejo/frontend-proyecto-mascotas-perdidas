import Header from './templates/Header';
import Footer from './templates/Footer';
import Home from './pages/Home';
import Buscar from './pages/Buscar';
import Reportar from './pages/Reportar';
import Adoptar from './pages/Adoptar';
import Nosotros from './pages/Nosotros';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => (
    <Router>
        <Header />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/buscar" element={<Buscar />} />
            <Route path="/reportar" element={<Reportar />} />
            <Route path="/adoptar" element={<Adoptar />} />
            <Route path="/nosotros" element={<Nosotros />} />
        </Routes>
        <Footer />
    </Router>
);

export default App;
