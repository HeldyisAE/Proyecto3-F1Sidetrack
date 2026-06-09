import "../styles/TrendDriversSection.css";
import { useTranslation } from 'react-i18next';
import { useThemeContext } from "../context/ThemeContext";
import { getTeamColor } from "../utils/colorUtils";

function TrendDriversSection({ standings }) {
  const { t } = useTranslation();
  const { theme } = useThemeContext();

  if (!standings?.length) return null;

  const trendingDrivers = standings
    .filter((driver) => [12, 43, 44].includes(driver.driver_number))
    .map((driver) => {
      if (driver.driver_number === 12) return { ...driver, title: "Race Winner",        description: "First Formula 1 victory" };
      if (driver.driver_number === 43) return { ...driver, title: "Strong Consistency", description: "Excellent race pace throughout" };
      if (driver.driver_number === 44) return { ...driver, title: "Back on the Podium", description: "Returns to the top three" };
      return driver;
    });

  return (
    <div className="trend-drivers">
      <div className="trend-header">
        <span className="section-label">{t('trendDrivers.title')}</span>
        <span className="trend-subtitle">{t('trendDrivers.subtitle')}</span>
      </div>
      <div className="trend-list">
        {trendingDrivers.map((driver) => (
          <div
            key={driver.driver_number}
            className="trend-card"
            style={{ "--team-color": getTeamColor(theme, driver.team_colour) }}
          >
            <img src={driver.headshot_url} alt={driver.full_name} className="trend-avatar" />
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
