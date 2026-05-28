import '../styles/RedirectButtons.css'
import { useTranslation } from 'react-i18next';
import { useF1Menu } from '../hooks/useF1Menu';

function RedirectButtons() {
    const { t } = useTranslation();
    const { handleConsult } = useF1Menu();

    return(
        <div className="redirect-container">
            <button className="redirect-button" onClick={() => handleConsult('getSchedule')}>{t("navigation.schedule")}</button>
            <button className="redirect-button" onClick={() => handleConsult('getResults')}>{t("navigation.results")}</button>
            <button className="redirect-button" onClick={() => handleConsult('getDrivers')}>{t("navigation.pilots")}</button>
            <button className="redirect-button" onClick={() => handleConsult('getTeams')}>{t("navigation.teams")}</button>
            <button className="redirect-button" onClick={() => handleConsult('getNews')}>{t("navigation.news")}</button>
        </div>
    )
};

export default RedirectButtons;