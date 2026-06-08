import { useState, useCallback } from 'react';
import { applyTheme, getSavedTheme, THEMES } from '../services/themeService';

export const useTheme = () => {
    const [theme, setTheme] = useState(() => {
        const saved = getSavedTheme();
        applyTheme(saved);
        return saved;
    });

    const changeTheme = useCallback((newTheme) => {
        if (!Object.values(THEMES).includes(newTheme)) {
            console.warn(`Tema inválido: ${newTheme}`);
            return;
        }
        applyTheme(newTheme);
        setTheme(newTheme);
    }, []);

    return { theme, changeTheme, THEMES };
};