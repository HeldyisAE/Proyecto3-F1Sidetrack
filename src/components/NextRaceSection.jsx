import "../styles/NextRaceSection.css";
import { useTranslation } from "react-i18next";
import { useState } from "react";

import ComingSoonModal from "./ComingSoonModal";

function NextRaceSection({ race }) {
    const [showComingSoon, setShowComingSoon] = useState(false);

    const { t } = useTranslation();

    if (!race || !race.meeting_name) {
        return (
            <div className="standings-loading">{t("standings.loading")}</div>
        );
    }

    const circuitImage =
    race.circuit_short_name === "Catalunya"
        ? "https://openclipart.org/image/2000px/291822"
        : race.circuit_image;

    const startDate = new Date(race.date_start);
    const endDate = new Date(race.date_end);

    const formattedDate = `${startDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
    })} - ${endDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
    })}`;

    return (
      <>
        <section className="next-race" onClick={() => setShowComingSoon(true)}>
            <div className="race-info">
                <span className="section-label">{t("nextRace.title")}</span>

                <div className="race-title-block">
                    <div className="race-title-row">
                        <img
                            src={race.country_flag}
                            alt={race.country_name}
                            className="race-flag"
                        />
                        <h2 className="race-title">{race.meeting_name}</h2>
                    </div>
                    <span className="circuit-tag">
                        {t("nextRace.permanent")}
                    </span>
                </div>

                <div className="race-grid">
                    <div className="race-item">
                        <span className="item-label">
                            {t("nextRace.location")}
                        </span>
                        <span className="item-value">{race.location}</span>
                    </div>
                    <div className="race-item">
                        <span className="item-label">
                            {t("nextRace.country")}
                        </span>
                        <span className="item-value">{race.country_name}</span>
                    </div>
                    <div className="race-item">
                        <span className="item-label">
                            {t("nextRace.circuit")}
                        </span>
                        <span className="item-value">
                            {race.circuit_short_name}
                        </span>
                    </div>
                    <div className="race-item">
                        <span className="item-label">{t("nextRace.date")}</span>
                        <span className="item-value">{formattedDate}</span>
                    </div>
                </div>
            </div>

            <div className="circuit-preview">
                <img
                    src={circuitImage}
                    alt={race.circuit_short_name}
                    className="circuit-image"
                />
            </div>

            
        </section>
        {showComingSoon && (
                <ComingSoonModal onClose={() => setShowComingSoon(false)} />
            )}
      </>
    );
}

export default NextRaceSection;
