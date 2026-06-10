// src/components/TrendDriversSection.jsx
import "../styles/TrendDriversSection.css";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../context/ThemeContext";
import { getTeamColor } from "../utils/colorUtils";
import { useNavigate } from "react-router-dom";

function TrendDriversSection({ standings }) {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { theme } = useThemeContext();

    if (!standings?.length) return null;

    const trendingDrivers = standings
        .filter((driver) => [12, 14, 6].includes(driver.driver_number))
        .map((driver) => {
            if (driver.driver_number === 12)
                return { ...driver, title: "Race Winner", description: "First victory in Monaco" };
            if (driver.driver_number === 14)
                return { ...driver, title: "Back to top ten", description: "Managed to score a point" };
            if (driver.driver_number === 6)
                return { ...driver, title: "First podium with Red Bull Racing", description: "Returns to the top three with the big team" };
            return driver;
        });

    return (
        <div className="trend-drivers">
            <div className="trend-header">
                <span className="section-label">{t("trendDrivers.title")}</span>
                <span className="trend-subtitle">{t("trendDrivers.subtitle")}</span>
            </div>

            <div className="trend-list">
                {trendingDrivers.map((driver) => (
                    <div
                        key={driver.driver_number}
                        className="trend-card"
                        style={{ "--team-color": getTeamColor(theme, driver.team_colour) }}
                        onClick={() => navigate(`/driver/${driver.driver_number}`)}
                    >
                        <img
                            src={driver.headshot_url}
                            alt={driver.full_name}
                            className="trend-avatar"
                        />
                        <div className="trend-info">
                            <span className="trend-name">{driver.full_name}</span>
                            <span className="trend-team">{driver.team_name}</span>
                        </div>
                        <div className="trend-highlight">
                            <span className="trend-title">{driver.title}</span>
                            <span className="trend-description">{driver.description}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TrendDriversSection;