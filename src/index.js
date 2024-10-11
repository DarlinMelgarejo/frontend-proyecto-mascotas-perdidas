import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SesionProvider } from './context/SesionContext '; // Asegúrate de la ruta correcta

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SesionProvider>
      <App />
    </SesionProvider>
  </React.StrictMode>
);
