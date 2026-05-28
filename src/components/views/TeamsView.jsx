import '../../styles/views/TeamsView.css';
import { useTranslation } from 'react-i18next';

function TeamsView({ data }) {
    const { t } = useTranslation();

    if (!data || data.length === 0) {
        return <p className="tv-empty">{t('views.noData', 'No hay equipos disponibles.')}</p>;
    }

    return (
        <div className="tv-container">
            <h2 className="tv-title">{t('navigation.teams')}</h2>
            <div className="tv-grid">
                {data.map((team) => (
                    <div
                        key={team.team_name}
                        className="tv-card"
                        style={{ '--team-color': `#${team.team_colour ?? 'E10600'}` }}
                    >
                        <div className="tv-card-header">
                            <div className="tv-color-bar" />
                            <h3 className="tv-team-name">{team.team_name}</h3>
                        </div>
                        <div className="tv-drivers">
                            {team.drivers.map((driver) => (
                                <div key={driver.driver_number} className="tv-driver-row">
                                    {driver.headshot_url ? (
                                        <img
                                            className="tv-driver-headshot"
                                            src={driver.headshot_url}
                                            alt={driver.full_name}
                                            onError={e => { e.target.style.display = 'none'; }}
                                        />
                                    ) : (
                                        <div className="tv-driver-placeholder">
                                            {driver.name_acronym ?? '?'}
                                        </div>
                                    )}
                                    <div className="tv-driver-info">
                                        <p className="tv-driver-name">{driver.full_name}</p>
                                        <p className="tv-driver-meta">
                                            #{driver.driver_number} · {driver.country_code}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default TeamsView;