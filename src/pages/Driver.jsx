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
        (d) => d.driver_number === Number(driverNumber),
    );

    if (!driver) {
        return <div className="driver-loading">Loading driver...</div>;
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
                        <div
                            className="driver-header-card"
                            style={{ "--team-color": `#${driver.team_colour}` }}
                        >
                            <span className="driver-team-label">
                                {driver.team_name}
                            </span>

                            <h1 className="driver-name">{driver.full_name}</h1>

                            <span className="driver-nationality">
                                {staticData.nationality}
                            </span>
                        </div>
                    </div>

                    <div className="driver-current-container">
                        {/* Current championship status */}
                        <div className="driver-current-card">
                            <h2>Current Championship Status</h2>

                            <div className="championship-grid" style={{"--team-color": `#${driver.team_colour}`}}>
                                <div className="championship-stat" >
                                    <span className="stat-label">Position</span>

                                    <span className="stat-value">
                                        P{driver.position_current}
                                    </span>
                                </div>

                                <div className="championship-stat">
                                    <span className="stat-label">Points</span>

                                    <span className="stat-value">
                                        {driver.points_current}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="driver-history-container">
                        {/* Historical statistics */}
                        <div className="driver-history-card" style={{"--team-color": `#${driver.team_colour}`}}>
                            <h2>Career Statistics</h2>

                            <p className="driver-description">
                                {staticData.description}
                            </p>

                            <div className="career-grid">
                                <div className="career-stat">
                                    <span className="career-label">
                                        World Championships
                                    </span>

                                    <span className="career-value">
                                        {staticData.worldChampionships}
                                    </span>
                                </div>

                                <div className="career-stat">
                                    <span className="career-label">Wins</span>

                                    <span className="career-value">
                                        {staticData.wins}
                                    </span>
                                </div>

                                <div className="career-stat">
                                    <span className="career-label">
                                        Podiums
                                    </span>

                                    <span className="career-value">
                                        {staticData.podiums}
                                    </span>
                                </div>

                                <div className="career-stat">
                                    <span className="career-label">
                                        Pole Positions
                                    </span>

                                    <span className="career-value">
                                        {staticData.poles}
                                    </span>
                                </div>

                                <div className="career-stat">
                                    <span className="career-label">
                                        Formula 1 Debut
                                    </span>

                                    <span className="career-value">
                                        {staticData.debut}
                                    </span>
                                </div>

                                <div className="career-stat">
                                    <span className="career-label">
                                        Date of Birth
                                    </span>

                                    <span className="career-value small">
                                        {staticData.birthDay}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section
                    className="driver-hero-section"
                    style={{
                        background: `
                                linear-gradient(
                                    135deg,
                                    #${driver.team_colour},
                                    #111
                                )
                            `,
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
