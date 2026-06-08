import "../styles/TrendDriversSection.css";

function TrendDriversSection({ standings }) {
  if (!standings?.length) {
    return null;
  }
  
  const trendingDrivers = standings
    .filter((driver) => [12, 14, 6].includes(driver.driver_number))
    .map((driver) => {
      if (driver.driver_number === 12) {
        return {
          ...driver,
          title: "Race Winner",
          description: "First victory in Monaco",
        };
      }

      if (driver.driver_number === 14) {
        return {
          ...driver,
          title: "Back to top ten",
          description: "Managed to score a point",
        };
      }

      if (driver.driver_number === 6) {
        return {
          ...driver,
          title: "First podium with Red Bull Racing",
          description: "Returns to the top three with the big team",
        };
      }

      return driver;
    });

  return (
    <div className="trend-drivers">
      <div className="trend-header">
        <span className="section-label">Trending Drivers</span>

        <span className="trend-subtitle">
          Standout performers from the last race weekend
        </span>
      </div>

      <div className="trend-list">
        {trendingDrivers.map((driver) => (
          <div
            key={driver.driver_number}
            className="trend-card"
            style={{
              "--team-color": `#${driver.team_colour}`,
            }}
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
