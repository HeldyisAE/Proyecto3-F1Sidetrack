import '../../styles/views/NewsView.css';
import { useTranslation } from 'react-i18next';

//emojis por tipo de sesión
const SESSION_ICONS = {
    Race:        '🏁',
    Qualifying:  '⏱',
    Practice:    '🔧',
    Sprint:      '⚡',
    default:     '📋',
};

function NewsView({ data }) {
    const { t } = useTranslation();

    if (!data || !data.news || data.news.length === 0) {
        return <p className="nv-empty">{t('views.noData', 'No hay noticias disponibles.')}</p>;
    }

    const { year, news } = data;

    return (
        <div className="nv-container">
            <h2 className="nv-title">
                {t('navigation.news')} · <span className="nv-year">{year}</span>
            </h2>
            <div className="nv-list">
                {news.map((item) => {
                    const icon = SESSION_ICONS[item.session_type] ?? SESSION_ICONS.default;
                    return (
                        <div key={item.id} className="nv-card">
                            <div className="nv-card-left">
                                <span className="nv-icon">{icon}</span>
                            </div>
                            <div className="nv-card-body">
                                <h3 className="nv-card-title">{item.title}</h3>
                                <p className="nv-card-sub">{item.subtitle}</p>
                                <p className="nv-card-date">{item.date}</p>
                            </div>
                            {item.flag_url && (
                                <div className="nv-card-right">
                                    <img
                                        className="nv-flag"
                                        src={item.flag_url}
                                        alt={item.country}
                                        onError={e => { e.target.style.display = 'none'; }}
                                    />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
export default NewsView;