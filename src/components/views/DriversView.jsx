import '../../styles/views/DriversView.css';
import { useTranslation } from 'react-i18next';

function DriversView({ data }) {
    const { t } = useTranslation();

    if (!data || data.length === 0) {
        return <p className="dv-empty">{t('views.noData', 'No hay pilotos disponibles.')}</p>;
    }

    return (
        <div className="dv-container">
            <h2 className="dv-title">{t('navigation.pilots')}</h2>
            <div className="dv-grid">
                {data.map((driver) => (
                    <div
                        key={driver.driver_number}
                        className="dv-card"
                        style={{ '--team-color': `#${driver.team_colour ?? 'E10600'}` }}
                    >
                        <div className="dv-card-accent" />
                        <div className="dv-card-body">
                            {driver.headshot_url ? (
                                <img
                                    className="dv-headshot"
                                    src={driver.headshot_url}
                                    alt={driver.full_name}
                                    onError={e => { e.target.style.display = 'none'; }}
                                />
                            ) : (
                                <div className="dv-headshot-placeholder">
                                    {driver.name_acronym ?? '?'}
                                </div>
                            )}
                            <div className="dv-info">
                                <span className="dv-number">#{driver.driver_number}</span>
                                <h3 className="dv-name">{driver.full_name}</h3>
                                <p className="dv-team">{driver.team_name ?? '—'}</p>
                                <p className="dv-country">{driver.country_code ?? '—'}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default DriversView;