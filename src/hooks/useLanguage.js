import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getSavedLanguage, saveLanguage } from '../services/themeService';

export const LANGUAGES = [
    { code: 'es', label: 'Español',    flag: '🇪🇸' },
    { code: 'en', label: 'English',    flag: '🇬🇧' },
    { code: 'fr', label: 'Français',   flag: '🇫🇷' },
    { code: 'it', label: 'Italiano',   flag: '🇮🇹' },
    { code: 'pt', label: 'Português',  flag: '🇵🇹' },
];

export const useLanguage = () => {
    const { i18n } = useTranslation();
    const [language, setLanguage] = useState(getSavedLanguage);

    const changeLanguage = (code) => {
        i18n.changeLanguage(code);
        setLanguage(code);
        saveLanguage(code);
    };

    return { language, changeLanguage, LANGUAGES };
};