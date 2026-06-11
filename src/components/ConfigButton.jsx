import '../styles/ConfigButton.css';
import { VscSettingsGear } from 'react-icons/vsc';

function ConfigButton({ onClick, isActive }) {
    return (
        <div className="configbutton-container">
            <button
                className={`config-button ${isActive ? 'config-button--active' : ''}`}
                onClick={onClick}
                aria-label="Configuración"
            >
                <VscSettingsGear className="config-icon" />
            </button>
        </div>
    );
}

export default ConfigButton;
