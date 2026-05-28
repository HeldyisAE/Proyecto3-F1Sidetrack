import '../../styles/views/ResultsView.css';
import { useTranslation } from 'react-i18next';

// Medallas del podio
const MEDALS = ['🥇', '🥈', '🥉'];

function ResultsView({ data }) {
    const { t } = useTranslation();

    if (!data || !data.results || data.results.length === 0) {
        return <p className="rv-empty">{t('views.noData', 'No hay resultados disponibles.')}</p>;
    }

    const { session, results } = data;
    const raceDate = new Date(session.date_end).toLocaleDateString('es-CR', {
        day: '2-digit', month: 'long', year: 'numeric',
    });

    return (
        <div className="rv-container">
            <div className="rv-header">
                <h2 className="rv-title">{session.meeting_name ?? 'Última Carrera'}</h2>
                <span className="rv-meta">{session.session_name} · {raceDate}</span>
            </div>

            <div className="rv-table-wrapper">
                <table className="rv-table">
                    <thead>
                        <tr>
                            <th className="rv-th rv-th--pos">POS</th>
                            <th className="rv-th rv-th--driver">PILOTO</th>
                            <th className="rv-th rv-th--team">EQUIPO</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((r) => (
                            <tr key={r.driver_number} className="rv-row">
                                <td className="rv-td rv-td--pos">
                                    {r.position <= 3
                                        ? <span className="rv-medal">{MEDALS[r.position - 1]}</span>
                                        : <span className="rv-pos-num">{r.position}</span>
                                    }
                                </td>
                                <td className="rv-td rv-td--driver">
                                    <div className="rv-driver-info">
                                        {r.headshot_url && (
                                            <img
                                                className="rv-headshot"
                                                src={r.headshot_url}
                                                alt={r.full_name}
                                                onError={e => { e.target.style.display = 'none'; }}
                                            />
                                        )}
                                        <div>
                                            <p className="rv-driver-name">{r.full_name}</p>
                                            <p className="rv-driver-num">#{r.driver_number}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="rv-td rv-td--team">
                                    <span
                                        className="rv-team-dot"
                                        style={{ backgroundColor: `#${r.team_colour}` }}
                                    />
                                    {r.team_name}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default ResultsView;