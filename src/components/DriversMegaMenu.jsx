import '../styles/DriversMegaMenu.css'
import { useF1 } from "../hooks/useF1";
import { useNavigate } from "react-router-dom";

function DriversMegaMenu() {
    const { driverStandings } = useF1();
    const navigate = useNavigate();

    return (
        <div className="drivers-megamenu">
            <div className="drivers-menu-header">
                <span className="section-label">Drivers Directory</span>
                <h3>Explore every driver on the grid</h3>
            </div>
            <div className="drivers-grid">
                {driverStandings.map((driver) => (
                    <div
                        key={driver.driver_number}
                        className="driver-card"
                        style={{ "--team-color": `#${driver.team_colour}` }}
                        onClick={() => navigate(`/driver/${driver.driver_number}`)}
                    >
                        <img src={driver.headshot_url} alt={driver.full_name} />
                        <div className="driver-card-info">
                            <span className="driver-number">#{driver.driver_number}</span>
                            <h4>{driver.full_name}</h4>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DriversMegaMenu;