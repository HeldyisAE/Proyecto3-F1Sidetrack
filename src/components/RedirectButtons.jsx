import "../styles/RedirectButtons.css";
import { useTranslation } from "react-i18next";
import { useState } from "react";

import ComingSoonModal from "./ComingSoonModal";

function RedirectButtons({ activeMenu, setActiveMenu }) {
    const { t } = useTranslation();

    const [showComingSoon, setShowComingSoon] = useState(false);

    return (
        <div className="redirect-container">
            <button
                className="redirect-button"
                onMouseEnter={() => setActiveMenu(null)}
            >
                {t("navigation.schedule")}
            </button>

            <button
                className="redirect-button"
                onMouseEnter={() => setActiveMenu(null)}
            >
                {t("navigation.results")}{" "}
            </button>

            <button
                className="redirect-button"
                onMouseEnter={() => setActiveMenu("drivers")}
            >
                {" "}
                {t("navigation.pilots")}{" "}
            </button>

            <button
                className="redirect-button"
                onMouseEnter={() => setActiveMenu("teams")}
            >
                {t("navigation.teams")}
            </button>

            <button
                className="redirect-button"
                onMouseEnter={() => setActiveMenu(null)}
                onClick={() => setShowComingSoon(true)}
            >
                {t("navigation.news")}
            </button>

            {showComingSoon && (
                <ComingSoonModal onClose={() => setShowComingSoon(false)} />
            )}
        </div>
    );
}

export default RedirectButtons;
