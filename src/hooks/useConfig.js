import { useState, useCallback } from 'react';
import { useTheme } from './useTheme';
import { useLanguage } from './useLanguage';

export const useConfig = () => {
    const [isOpen, setIsOpen] = useState(false);

    const togglePanel = useCallback(() => setIsOpen(prev => !prev), []);
    const closePanel  = useCallback(() => setIsOpen(false), []);

    const themeState    = useTheme();
    const languageState = useLanguage();

    return {
        isOpen,
        togglePanel,
        closePanel,
        ...themeState,
        ...languageState,
    };
};