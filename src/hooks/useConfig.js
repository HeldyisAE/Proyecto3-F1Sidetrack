import { useState, useCallback } from 'react';
import { useThemeContext } from '../context/ThemeContext';
import { useLanguage } from './useLanguage';

export const useConfig = () => {
    const [isOpen, setIsOpen] = useState(false);

    const togglePanel = useCallback(() => setIsOpen(prev => !prev), []);
    const closePanel  = useCallback(() => setIsOpen(false), []);

    const themeState    = useThemeContext();
    const languageState = useLanguage();

    return {
        isOpen,
        togglePanel,
        closePanel,
        ...themeState,
        ...languageState,
    };
};