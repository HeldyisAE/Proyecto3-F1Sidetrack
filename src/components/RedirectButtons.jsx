import '../styles/RedirectButtons.css'
import { useTranslation } from 'react-i18next';

function RedirectButtons({ activeMenu, setActiveMenu }) {
    const { t } = useTranslation();

    return(
        <div className="redirect-container">
            <button className="redirect-button" onMouseEnter={() => setActiveMenu(null)}>{t("navigation.schedule")}</button>

            <button className="redirect-button" onMouseEnter={() => setActiveMenu(null)}>{t("navigation.results")} </button>

            <button className="redirect-button" onMouseEnter={() => setActiveMenu("drivers")}> {t("navigation.pilots")} </button>

            <button className="redirect-button" onMouseEnter={() => setActiveMenu("teams")}>{t("navigation.teams")}</button>

            <button className="redirect-button" onMouseEnter={() => setActiveMenu(null)}>{t("navigation.news")}</button>

        </div>
        
    )
};

export default RedirectButtons;