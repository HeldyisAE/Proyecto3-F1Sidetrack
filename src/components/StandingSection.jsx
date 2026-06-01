import { useEffect, useState, useRef } from "react";

import "../styles/StandingSection.css";
import { useTranslation } from "react-i18next";

const AUTO_INTERVAL = 7000;

function StandingSection({ standings, teamStandings }) {
  const [mode, setMode] = useState("drivers");
  const intervalRef = useRef(null);

  const { t } = useTranslation();

  const resetInterval = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setMode(prev => (prev === "drivers" ? "teams" : "drivers"));
    }, AUTO_INTERVAL);
  };

  useEffect(() => {
    resetInterval();
    return () => clearInterval(intervalRef.current);
  }, []);

  const handleToggle = (newMode) => {
    if (newMode === mode) return;
    setMode(newMode);
    resetInterval(); // reinicia el timer al hacer clic manual
  }; 

  const list = mode === "drivers" ? standings : teamStandings;

  if (standings.length === 0 || teamStandings.length === 0) {
    return <div className="standings-loading">{t("standings.loading")}</div>;
  }

  const TEAM_COLORS = {
    "Mercedes": "00D2BE",
    "Red Bull Racing": "3671C6",
    "Ferrari": "E8002D",
    "McLaren": "FF8000",
    "Aston Martin": "229971",
    "Alpine": "FF87BC",
    "Williams": "64C4FF",
    "Racing Bulls": "6692FF",
    "Haas F1 Team": "B6BABD",
    "Audi": "646864",
    "Cadillac" : "814904",
    };

  return (
    <div className="standings-section">
      <div className="standings-header">
        <div className="standings-toggle">
          <button
            className={`toggle-btn ${mode === "drivers" ? "active" : ""}`}
            onClick={() => handleToggle("drivers")}
          >
            {t("standings.drivers")}
          </button>
          <button
            className={`toggle-btn ${mode === "teams" ? "active" : ""}`}
            onClick={() => handleToggle("teams")}
          >
            {t("standings.constructors")}
          </button>
          <div className={`toggle-pill ${mode === "teams" ? "right" : ""}`} />
        </div>

        {/* barra de progreso del auto-rotate */}
        <div className="standings-progress" key={mode}>
          <div className="standings-progress-bar" />
        </div>
      </div>

      <div className="standings-list">
        {list.slice(0, 10).map((item, i) => {
          const key = mode === "drivers" ? item.driver_number : item.team_name;
          const name = mode === "drivers" ? item.full_name : item.team_name;
          const color = TEAM_COLORS[item.team_name] 
            ? `#${TEAM_COLORS[item.team_name]}` 
            : "#888888";
          const pos = item.position_current;
          const pts = item.points_current;

          return (
            <div
              key={key}
              className="standing-row"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <span className={`position ${pos <= 3 ? "podium" : ""}`}>{pos}</span>
              <span className="team-color" style={{ background: color }} />
              <span className="name">{name}</span>
              <span className="points">{pts} <span className="pts-label">{t("standings.points")}</span></span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StandingSection;