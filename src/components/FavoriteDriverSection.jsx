// src/components/FavoriteDriverSection.jsx
import "../styles/FavoriteDriverSection.css";
import { useTranslation } from 'react-i18next';
import { useThemeContext } from "../context/ThemeContext";
import { getTeamColor } from "../utils/colorUtils";

function FavoriteDriverSection({ standings }) {
  const { t } = useTranslation();
  const { theme } = useThemeContext();

  if (!standings?.length) return null;

  // Lee los favoritos del usuario logueado desde localStorage
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const favoriteIds =
    currentUser?.favoriteDrivers ||
    currentUser?.favoritePilots?.split("|").map(Number) ||
    [];

  const favoriteDrivers = standings.filter(driver =>
    favoriteIds.includes(Number(driver.driver_number))
  );

  return (
    <div className="favorite-drivers">
      <div className="favorite-header">
        <span className="section-label">{t('favoriteDrivers.title')}</span>
        <span className="favorite-subtitle">{t('favoriteDrivers.subtitle')}</span>
      </div>

      <div className="favorite-list">
        {favoriteDrivers.map((driver) => (
          <div
            key={driver.driver_number}
            className="favorite-card"
            style={{ "--team-color": getTeamColor(theme, driver.team_colour) }}
          >
            <img src={driver.headshot_url} alt={driver.full_name} className="driver-avatar" />

            <div className="driver-info">
              <span className="driver-name">{driver.full_name}</span>
              <span className="driver-team">{driver.team_name}</span>
            </div>

            <div className="driver-stats">
              <span className="driver-position">
                {t('favoriteDrivers.position')} {driver.position_current}
              </span>
              <span className="driver-points">
                {driver.points_current} {t('favoriteDrivers.pts')}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoriteDriverSection;
