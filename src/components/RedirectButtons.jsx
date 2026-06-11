// src/components/RedirectButtons.jsx
import '../styles/RedirectButtons.css';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

function RedirectButtons({ activeMenu, setActiveMenu }) {
    const { t }    = useTranslation();
    const navigate = useNavigate();

    return (
        <div className="redirect-container">

            <button
                className="redirect-button"
                onClick={() => navigate('/schedule')}
            >
                {t("navigation.schedule")}
            </button>

            <button
                className="redirect-button"
                onClick={() => navigate('/results')}
            >
                {t("navigation.results")}
            </button>

            <button
                className="redirect-button"
                onMouseEnter={() => setActiveMenu("drivers")}
            >
                {t("navigation.pilots")}
            </button>

            <button className="redirect-button">
                {t("navigation.teams")}
            </button>

            <button className="redirect-button">
                {t("navigation.news")}
            </button>

        </div>
    );
}

export default RedirectButtons;
