import "../styles/NextRaceSection.css";
import MonacoCircuit from "../assets/MonacoShape.png";

function NextRaceSection() {
  return (
    <section className="next-race">
      <div className="race-info">
        <span className="section-label">NEXT RACE</span>

        <h2 className="race-title">Monaco Grand Prix</h2>

        <div className="race-grid">
          <div className="race-item">
            <span className="item-label">Round</span>

            <span className="item-value">9</span>
          </div>

          <div className="race-item">
            <span className="item-label">Country</span>

            <span className="item-value">Monaco</span>
          </div>

          <div className="race-item">
            <span className="item-label">Circuit</span>

            <span className="item-value">Circuit de Monaco</span>
          </div>

          <div className="race-item">
            <span className="item-label">Date</span>

            <span className="item-value">Jun 5 - Jun 7</span>
          </div>
        </div>
      </div>

      <div className="circuit-preview">
        <img
          src={MonacoCircuit}
          alt="Monaco Circuit"
          className="circuit-image"
        />
      </div>
    </section>
  );
}

export default NextRaceSection;
