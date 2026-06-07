export const THEMES = {
    DARK:        'dark',
    LIGHT:       'light',
    TRITANOPIA:  'tritanopia',
};

export const THEME_LABELS = {
    dark:       'config.theme.dark',
    light:      'config.theme.light',
    tritanopia: 'config.theme.tritanopia',
};

const STORAGE_KEY_THEME    = 'f1sidetrack_theme';
const STORAGE_KEY_LANGUAGE = 'f1sidetrack_language';

//Tema ────────────────────────────────────────────────────────────────────

export const getSavedTheme = () =>
    localStorage.getItem(STORAGE_KEY_THEME) ?? THEMES.DARK;

export const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY_THEME, theme);
};

//Lenguaje ──────────────────────────────────────────────────────────────────

export const getSavedLanguage = () =>
    localStorage.getItem(STORAGE_KEY_LANGUAGE) ?? 'es';

export const saveLanguage = (lang) =>
    localStorage.setItem(STORAGE_KEY_LANGUAGE, lang);