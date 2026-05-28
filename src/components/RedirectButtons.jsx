// src/components/RedirectButtons.jsx
import '../styles/RedirectButtons.css';
import { useTranslation } from 'react-i18next';

// Recibe handleConsult y activeView como props desde Header → Home
function RedirectButtons({ handleConsult, activeView }) {
    const { t } = useTranslation();

    const buttons = [
        { service: 'getSchedule', label: t('navigation.schedule') },
        { service: 'getResults',  label: t('navigation.results')  },
        { service: 'getDrivers',  label: t('navigation.pilots')   },
        { service: 'getTeams',    label: t('navigation.teams')    },
        { service: 'getNews',     label: t('navigation.news')     },
    ];

    return (
        <div className="redirect-container">
            {buttons.map(({ service, label }) => (
                <button
                    key={service}
                    className={`redirect-button ${activeView === service ? 'redirect-button--active' : ''}`}
                    onClick={() => handleConsult(service)}
                >
                    {label}
                </button>
            ))}
        </div>
    );
}

export default RedirectButtons;
