// src/hooks/useTheme.js
import { useState, useEffect, useCallback } from 'react';
import { applyTheme, getSavedTheme, THEMES } from '../services/themeService';

export const useTheme = () => {
    const [theme, setTheme] = useState(() => {
        const savedTheme = getSavedTheme();
        // Aplicar el tema inmediatamente al inicializar
        applyTheme(savedTheme);
        return savedTheme;
    });

    // Aplicar tema cada vez que cambia
    useEffect(() => {
        applyTheme(theme);
    }, [theme]); 

    const changeTheme = useCallback((newTheme) => {
        // Validar que el nuevo tema sea válido
        if (!Object.values(THEMES).includes(newTheme)) {
            console.warn(`Tema inválido: ${newTheme}`);
            return;
        }
        setTheme(newTheme);
    }, []);

    return { 
        theme, 
        changeTheme, 
        THEMES 
    };
};