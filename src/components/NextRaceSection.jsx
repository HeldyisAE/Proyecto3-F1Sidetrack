import "../styles/NextRaceSection.css";

function NextRaceSection({ race }) {
  
  if (!race || !race.meeting_name) {
    
    return <div className="standings-loading">Loading next race...</div>;
  }

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
    <section className="next-race">
      <div className="race-info">
        <span className="section-label">Next Race</span>

        <div className="race-title-block">
          <div className="race-title-row">
            <img
              src={race.country_flag}
              alt={race.country_name}
              className="race-flag"
            />

            <h2 className="race-title">{race.meeting_name}</h2>
          </div>

          <span className="circuit-tag">{race.circuit_type}</span>
        </div>

        <div className="race-grid">
          <div className="race-item">
            <span className="item-label">Location</span>

            <span className="item-value">{race.location}</span>
          </div>

          <div className="race-item">
            <span className="item-label">Country</span>

            <span className="item-value">{race.country_name}</span>
          </div>

          <div className="race-item">
            <span className="item-label">Circuit</span>

            <span className="item-value">{race.circuit_short_name}</span>
          </div>

          <div className="race-item">
            <span className="item-label">Date</span>

            <span className="item-value">{formattedDate}</span>
          </div>
        </div>
      </div>

      <div className="circuit-preview">
        <img
          src={race.circuit_image}
          alt={race.circuit_short_name}
          className="circuit-image"
        />
      </div>
    </section>
  );
}

export default NextRaceSection;
