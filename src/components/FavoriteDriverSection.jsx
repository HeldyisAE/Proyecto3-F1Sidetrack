import { useEffect, useState } from "react";
import { getDriverStandings } from "../services/f1Service";
import "../styles/FavoriteDriverSection.css";

function FavoriteDriverSection() {
  const [favoriteDrivers, setFavoriteDrivers] = useState([]);

  useEffect(() => {
    const loadDrivers = async () => {
      const standings = await getDriverStandings();

      const favorites = standings.filter((driver) =>
        [3, 43, 11].includes(driver.driver_number),
      );

      setFavoriteDrivers(favorites);
    };

    loadDrivers();
  }, []);

  return (
    <div className="favorite-drivers">
      <div className="favorite-header">
        <span className="section-label">Favorite Drivers</span>

        <span className="favorite-subtitle">
          Keep an eye on the drivers you support
        </span>
      </div>

      <div className="favorite-list">
        {favoriteDrivers.map((driver) => (
          <div
            key={driver.driver_number}
            className="favorite-card"
            style={{
              "--team-color": `#${driver.team_colour}`,
            }}
          >
            <img
              src={driver.headshot_url}
              alt={driver.full_name}
              className="driver-avatar"
            />

            <div className="driver-info">
              <span className="driver-name">{driver.full_name}</span>

              <span className="driver-team">{driver.team_name}</span>
            </div>

            <div className="driver-stats">
              <span className="driver-position">
                Championship position {driver.position_current}
              </span>

              <span className="driver-points">{driver.points_current} pts</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoriteDriverSection;
