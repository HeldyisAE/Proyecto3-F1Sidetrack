import "../styles/LogoButton.css"
import { useNavigate } from "react-router-dom";
import F1SidetrackLogo from '../assets/F1SidetrackLogo.png'


function LogoButton() {
    const navigate = useNavigate();

    return(
        <div className="logobutton-container">
            <button 
                onClick={() => navigate("/")} 
                className="logo-button"
            >
                <img 
                    src={F1SidetrackLogo} 
                    alt='Logo F1: Sidetrack'
                />
            </button>
        </div>
    )
}

export default LogoButton;