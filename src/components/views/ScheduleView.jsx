import '../../styles/views/ScheduleView.css';
import { useTranslation } from 'react-i18next';

function ScheduleView({ data }) {
    const { t } = useTranslation();
    const today = new Date();

    if (!data || data.length === 0) {
        return <p className="sv-empty">{t('views.noData', 'No hay datos de calendario disponibles.')}</p>;
    }

    return (
        <div className="sv-container">
            <h2 className="sv-title">{t('navigation.schedule')} {new Date().getFullYear()}</h2>
            <div className="sv-grid">
                {data.map((meeting, idx) => {
                    const raceDate = new Date(meeting.date_start);
                    const isPast = raceDate < today;
                    const isNext = !isPast && data
                        .filter(m => new Date(m.date_start) >= today)
                        .indexOf(meeting) === 0;

                    return (
                        <div
                            key={meeting.meeting_key}
                            className={`sv-card ${isPast ? 'sv-card--past' : ''} ${isNext ? 'sv-card--next' : ''}`}
                        >
                            <span className="sv-round">R{idx + 1}</span>
                            {isNext && <span className="sv-badge">PRÓXIMA</span>}
                            <div className="sv-card-body">
                                <h3 className="sv-race-name">{meeting.meeting_name}</h3>
                                <p className="sv-circuit">{meeting.circuit_short_name}</p>
                                <p className="sv-location">
                                    {meeting.country_name}
                                </p>
                                <p className="sv-date">
                                    {raceDate.toLocaleDateString('es-CR', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric',
                                    })}
                                </p>
                            </div>
                            {isPast && <div className="sv-past-overlay">Finalizado</div>}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
export default ScheduleView;