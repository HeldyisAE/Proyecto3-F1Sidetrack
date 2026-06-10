import { useState, useEffect, useCallback } from 'react';
import { applyTheme, getSavedTheme, THEMES } from '../services/themeService';

export const useTheme = () => {
    const [theme, setTheme] = useState(() => {
        const savedTheme = getSavedTheme();
        applyTheme(savedTheme);
        return savedTheme;
    });

    useEffect(() => {
        applyTheme(theme);
    }, [theme]); 

    const changeTheme = useCallback((newTheme) => {
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