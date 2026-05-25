import '../styles/RedirectButtons.css'
import { useTranslation } from 'react-i18next';

function RedirectButtons() {
    const { t } = useTranslation();

    return(
        <div className="redirect-container">
            <button className="redirect-button">{t("navigation.schedule")}</button>
            <button className="redirect-button">{t("navigation.results")}</button>
            <button className="redirect-button">{t("navigation.pilots")}</button>
            <button className="redirect-button">{t("navigation.teams")}</button>
            <button className="redirect-button">{t("navigation.news")}</button>
        </div>
    )
};

export default RedirectButtons;