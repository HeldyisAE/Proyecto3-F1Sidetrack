import "../styles/LastRaceResults.css";
import { FaStopwatch } from "react-icons/fa";
import { BsLightning } from "react-icons/bs";
import { useTranslation } from 'react-i18next';
import { useThemeContext } from "../context/ThemeContext";
import { getTeamColor } from "../utils/colorUtils";

function LastRaceResults({ standings }) {
  const { t } = useTranslation();
  const { theme } = useThemeContext();

  if (!standings?.length) return null;

  const kimi   = standings.find((d) => d.driver_number === 12);
  const lewis  = standings.find((d) => d.driver_number === 44);
  const max    = standings.find((d) => d.driver_number === 3);
  const george = standings.find((d) => d.driver_number === 63);

  const podium = [
    { pos: 2, data: lewis, cls: "second" },
    { pos: 1, data: kimi,  cls: "first"  },
    { pos: 3, data: max,   cls: "third"  },
  ];

  return (
    <div className="last-race-results">
      <div className="results-header">
        <div className="results-header-left">
          <span className="results-title">{t('lastRace.title')}</span>
          <span className="results-subtitle">Canada Grand Prix • {t('lastRace.round')} 5</span>
        </div>
        <span className="results-round-badge">{t('lastRace.round')} 5 / 24</span>
      </div>

      <div className="podium-section">
        {podium.map(({ pos, data, cls }) => (
          <div
            key={pos}
            className={`podium-step ${cls}`}
            style={{ "--team-color": getTeamColor(theme, data?.team_colour) }}
          >
            <img src={data?.headshot_url} alt={data?.full_name} className="podium-avatar" />
            <span className="podium-position">{pos}</span>
            <span className="podium-driver">{data?.full_name}</span>
            <span className="podium-number">#{data?.driver_number}</span>
            <span className="podium-team">{data?.team_name}</span>
          </div>
        ))}
      </div>

      <div className="race-highlights">
        <div className="highlight-card" style={{ "--team-color": getTeamColor(theme, george?.team_colour) }}>
          <div className="highlight-icon"><FaStopwatch /></div>
          <div className="highlight-content">
            <span className="highlight-label">{t('lastRace.polePosition')}</span>
            <div className="highlight-driver-row">
              <img src={george?.headshot_url} alt={george?.full_name} className="highlight-avatar" />
              <span className="highlight-driver">{george?.full_name}</span>
            </div>
            <span className="highlight-time">1:12.578</span>
          </div>
        </div>

        <div className="highlight-card" style={{ "--team-color": getTeamColor(theme, kimi?.team_colour) }}>
          <div className="highlight-icon"><BsLightning /></div>
          <div className="highlight-content">
            <span className="highlight-label">{t('lastRace.fastestLap')}</span>
            <div className="highlight-driver-row">
              <img src={kimi?.headshot_url} alt={kimi?.full_name} className="highlight-avatar" />
              <span className="highlight-driver">{kimi?.full_name}</span>
            </div>
            <span className="highlight-time">1:14.210</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LastRaceResults;
