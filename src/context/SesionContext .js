import React, { createContext, useContext, useState } from 'react';

const SesionContext = createContext();

export const SesionProvider = ({ children }) => {
    const [sesion, setSesion] = useState(null);

    return (
        <SesionContext.Provider value={{ sesion, setSesion }}>
            {children}
        </SesionContext.Provider>
    );
};

export const useSesion = () => useContext(SesionContext);
