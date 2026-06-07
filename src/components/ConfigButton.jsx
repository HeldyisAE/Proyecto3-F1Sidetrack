import '../styles/ConfigButton.css'
import { VscSettingsGear } from "react-icons/vsc";


function ConfigButton() {

    return (
        <div className="configbutton-container">
            <button className="config-button">
                <VscSettingsGear className="config-icon"/>
            </button>
        </div>
    )
};

export default ConfigButton;