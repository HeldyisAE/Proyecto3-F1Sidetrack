import "../styles/NextRaceSection.css";
import { useTranslation } from 'react-i18next';

function NextRaceSection({ race }) {
  const { t } = useTranslation();

  if (!race || !race.meeting_name) {
    return <div className="standings-loading">{t('standings.loading')}</div>;
  }

  const startDate = new Date(race.date_start);
  const endDate   = new Date(race.date_end);

  const formattedDate = `${startDate.toLocaleDateString("en-US", {
    month: "short", day: "numeric",
  })} - ${endDate.toLocaleDateString("en-US", {
    month: "short", day: "numeric",
  })}`;

  return (
    <section className="next-race">
      <div className="race-info">
        <span className="section-label">{t('nextRace.title')}</span>

        <div className="race-title-block">
          <div className="race-title-row">
            <img src={race.country_flag} alt={race.country_name} className="race-flag" />
            <h2 className="race-title">{race.meeting_name}</h2>
          </div>
          <span className="circuit-tag">{t('nextRace.permanent')}</span>
        </div>

        <div className="race-grid">
          <div className="race-item">
            <span className="item-label">{t('nextRace.location')}</span>
            <span className="item-value">{race.location}</span>
          </div>
          <div className="race-item">
            <span className="item-label">{t('nextRace.country')}</span>
            <span className="item-value">{race.country_name}</span>
          </div>
          <div className="race-item">
            <span className="item-label">{t('nextRace.circuit')}</span>
            <span className="item-value">{race.circuit_short_name}</span>
          </div>
          <div className="race-item">
            <span className="item-label">{t('nextRace.date')}</span>
            <span className="item-value">{formattedDate}</span>
          </div>
        </div>
      </div>

      <div className="circuit-preview">
        <img src={race.circuit_image} alt={race.circuit_short_name} className="circuit-image" />
      </div>
    </section>
  );
}

export default NextRaceSection;
