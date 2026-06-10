import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { useF1 } from "../hooks/useF1";
import { driverData } from "../data/driverData";
import "../styles/Driver.css";

function Driver() {
    const navigate = useNavigate();

    const { driverNumber } = useParams();
    const { driverStandings } = useF1();
    const staticData = driverData[Number(driverNumber)];

    const driver = driverStandings.find(
        d => d.driver_number === Number(driverNumber)
    );

    if (!driver) {
        return (
            <div className="driver-loading">
                Loading driver...
            </div>
        );
    }

    return (
        <div className="driver-page">
            <button
                className="driver-back-button"
                onClick={() => navigate("/home")}
            >
                <IoMdArrowRoundBack />
            </button>

            <div className="driver-layout">
                <section className="driver-info-section">
                    <div className="driver-header-container">
                        {/* Driver name */}
                        <div className="driver-header-card" style={{"--team-color": `#${driver.team_colour}`}}>
                            <span className="driver-team-label">
                                {driver.team_name}
                            </span>

                            <h1 className="driver-name">
                                {driver.full_name}
                            </h1>

                            <span className="driver-nationality">
                                {staticData.nationality}
                            </span>
                        </div>
                    </div>

                    <div className="driver-current-container">
                        {/* Current championship status */}
                        <div className="driver-current-card">
                            <h2>Current Championship Status</h2>
                        </div>
                    </div>

                    <div className="driver-history-container">
                        {/* Historical statistics */}
                        <div className="driver-history-card">
                            <h2>Career Statistics</h2>
                        </div>
                    </div>
                </section>

                <section className="driver-hero-section"
                    style={{
                            background: `
                                linear-gradient(
                                    135deg,
                                    #${driver.team_colour},
                                    #111
                                )
                            `
                        }}
                >
                    <div className="driver-number-background">
                        {driver.driver_number}
                    </div>

                    <div className="driver-image-container">
                        <img
                            src={staticData.fullImage}
                            alt={driver.full_name}
                        />
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Driver;
