// src/components/F1ContentController.jsx
import { useF1Menu } from '../hooks/useF1Menu';
import ScheduleView from './views/ScheduleView';
import ResultsView from './views/ResultsView';
import DriversView from './views/DriversView';
import TeamsView from './views/TeamsView';
import NewsView from './views/NewsView';
import '../styles/F1ContentController.css';

// Mapeo de nombre de servicio → componente de vista
const VIEW_MAP = {
    getSchedule: ScheduleView,
    getResults:  ResultsView,
    getDrivers:  DriversView,
    getTeams:    TeamsView,
    getNews:     NewsView,
};

/**
 * F1ContentController
 * Se monta dentro del .content-container de Home.jsx.
 * Recibe el estado del hook useF1Menu y renderiza la vista correspondiente.
 */
function F1ContentController({ data, loading, error, activeView, clearView }) {
    // Nada seleccionado → pantalla de bienvenida
    if (!activeView) {
        return (
            <div className="f1cc-welcome">
                <p className="f1cc-welcome-text">
                    Selecciona una sección del menú para comenzar.
                </p>
            </div>
        );
    }

    // Loading
    if (loading) {
        return (
            <div className="f1cc-state">
                <div className="f1cc-spinner" />
                <p>Cargando datos…</p>
            </div>
        );
    }

    // Error
    if (error) {
        return (
            <div className="f1cc-state f1cc-error">
                <span className="f1cc-error-icon">⚠</span>
                <p>{error}</p>
                <button className="f1cc-retry-btn" onClick={clearView}>Volver</button>
            </div>
        );
    }

    // Sin datos todavía (entre renders)
    if (!data) return null;

    const ViewComponent = VIEW_MAP[activeView];
    if (!ViewComponent) return <p>Vista no encontrada: {activeView}</p>;

    return (
        <div className="f1cc-content">
            <ViewComponent data={data} />
        </div>
    );
}

export default F1ContentController;
