// src/hooks/useTheme.js
import { useState, useEffect } from 'react';
import { applyTheme, getSavedTheme, THEMES } from '../services/themeService';

export const useTheme = () => {
    const [theme, setTheme] = useState(getSavedTheme);

    // ESTO ES LO QUE FALTABA: 
    // Ahora el efecto se ejecuta cada vez que 'theme' cambia
    useEffect(() => {
        applyTheme(theme);
    }, [theme]); 

    const changeTheme = (newTheme) => {
        if (!Object.values(THEMES).includes(newTheme)) return;
        setTheme(newTheme);
        // Ya no hace falta llamar a applyTheme aquí, 
        // porque el useEffect se encarga automáticamente al cambiar el estado
    };

    return { theme, changeTheme, THEMES };
};