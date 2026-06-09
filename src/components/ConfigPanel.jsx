import '../styles/ConfigPanel.css';
import { useTranslation } from 'react-i18next';
import { THEMES, THEME_LABELS } from '../services/themeService';
import { useEffect, useRef } from 'react';

function ConfigPanel({ isOpen, closePanel, theme, changeTheme, language, changeLanguage, LANGUAGES }) {
    const { t } = useTranslation();
    const panelRef = useRef(null);

    useEffect(() => {
        if (!isOpen) return;
        const handleClickOutside = (e) => {
            if (panelRef.current && !panelRef.current.contains(e.target)) {
                closePanel();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, closePanel]);

    useEffect(() => {
        if (!isOpen) return;
        const handleKey = (e) => { if (e.key === 'Escape') closePanel(); };
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [isOpen, closePanel]);

    return (
        <div className={`config-panel-overlay ${isOpen ? 'config-panel-overlay--visible' : ''}`}>
            <div
                ref={panelRef}
                className={`config-panel ${isOpen ? 'config-panel--open' : ''}`}
                role="dialog"
                aria-label={t('config.title')}
            >
                <div className="config-panel-header">
                    <h2 className="config-panel-title">{t('config.title')}</h2>
                    <button className="config-panel-close" onClick={closePanel} aria-label="Cerrar">✕</button>
                </div>

                <section className="config-section">
                    <h3 className="config-section-title">{t('config.appearance')}</h3>
                    <div className="config-theme-grid">
                        {Object.values(THEMES).map((t_key) => (
                            <button
                                key={t_key}
                                className={`config-theme-btn ${theme === t_key ? 'config-theme-btn--active' : ''}`}
                                onClick={() => changeTheme(t_key)}
                                title={t(THEME_LABELS[t_key])}
                            >
                                <span className="config-theme-label">{t(THEME_LABELS[t_key])}</span>
                            </button>
                        ))}
                    </div>

                    {theme === THEMES.TRITANOPIA && (
                        <p className="config-accessibility-note">
                            {t('config.tritanopiaNote')}
                        </p>
                    )}
                </section>

                <section className="config-section">
                    <h3 className="config-section-title">{t('config.language')}</h3>
                    <div className="config-lang-list">
                        {LANGUAGES.map((lang) => (
                            <button
                                key={lang.code}
                                className={`config-lang-btn ${language === lang.code ? 'config-lang-btn--active' : ''}`}
                                onClick={() => changeLanguage(lang.code)}
                            >
                                <span className="config-lang-flag">{lang.flag}</span>
                                <span className="config-lang-label">{lang.label}</span>
                                {language === lang.code && (
                                    <span className="config-lang-check">✓</span>
                                )}
                            </button>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default ConfigPanel;
