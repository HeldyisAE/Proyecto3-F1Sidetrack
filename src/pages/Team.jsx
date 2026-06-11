import { useParams, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { teams } from "../data/teams";
import { useF1 } from "../hooks/useF1";
import "../styles/Team.css";

const TEAM_NAME_MAP = {
    mercedes: "Mercedes",
    ferrari: "Ferrari",
    mclaren: "McLaren",
    redbull: "Red Bull Racing",
    alpine: "Alpine",
    racingbulls: "Racing Bulls",
    haas: "Haas F1 Team",
    williams: "Williams",
    audi: "Audi",
    astonmartin: "Aston Martin",
    cadillac: "Cadillac",
};

const TEAM_CARS = {
    mercedes: "https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000001/common/f1/2026/mercedes/2026mercedescarright.webp",
    ferrari: "https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000001/common/f1/2026/ferrari/2026ferraricarright.webp",
    mclaren: "https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000001/common/f1/2026/mclaren/2026mclarencarright.webp",
    redbull: "https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000001/common/f1/2026/redbullracing/2026redbullracingcarright.webp",
    alpine: "https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000001/common/f1/2026/alpine/2026alpinecarright.webp",
    racingbulls: "https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000001/common/f1/2026/racingbulls/2026racingbullscarright.webp",
    haas: "https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000001/common/f1/2026/haas/2026haascarright.webp",
    williams: "https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000001/common/f1/2026/williams/2026williamscarright.webp",
    audi: "https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000001/common/f1/2026/audi/2026audicarright.webp",
    cadillac: "https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000001/common/f1/2026/cadillac/2026cadillaccarright.webp",
    astonmartin: "https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000001/common/f1/2026/astonmartin/2026astonmartincarright.webp",
};

function Team() {
    const { teamId } = useParams();
    const navigate = useNavigate();
    const { teamStandings, driverStandings } = useF1();

    const team = teams.find((t) => t.id === teamId);

    if (!team) return <h1>Team not found</h1>;

    const teamDrivers = driverStandings.filter(
        (driver) => driver.team_name === TEAM_NAME_MAP[team.id]
    );

    const currentTeam = teamStandings.find(
        (standing) => standing.team_name === TEAM_NAME_MAP[team.id]
    );

    return (
        <div
            className="team-page"
            style={{
                "--team-color": team.color,  
                background: `radial-gradient(circle at top right, ${team.color}40, transparent 60%), #0a0a0a`,
            }}
        >
            <button className="team-back-button" onClick={() => navigate(-1)}>
                <IoMdArrowRoundBack />
            </button>

            <section className="team-hero">
                <div className="team-logo-container">
                    <img src={team.logo} alt={team.name} className="team-logo" />
                </div>

                <img src={TEAM_CARS[team.id]} alt={team.name} className="team-car" />

                <div className="team-drivers">
                    {teamDrivers.map((driver) => (
                        <div key={driver.driver_number} className="team-driver-chip">
                            <img src={driver.headshot_url} alt={driver.full_name} />
                            <span>{driver.full_name}</span>
                        </div>
                    ))}
                </div>
            </section>

            <section className="team-content">
                <div className="team-card team-info-card">
                    <h2>{team.name}</h2>
                    <div className="team-info-grid">
                        <div><span>Founded</span><strong>{team.founded}</strong></div>
                        <div><span>Founder</span><strong>{team.founder}</strong></div>
                        <div><span>Principal</span><strong>{team.principal}</strong></div>
                        <div><span>Base</span><strong>{team.base}</strong></div>
                    </div>
                </div>

                <div className="team-card team-current-season-card">
                    <h2>2026 Season</h2>
                    <div className="season-stats-row">
                        <div className="season-stat">
                            <span className="season-value">
                                {currentTeam?.position_current}
                            </span>

                            <span className="season-label">
                                Championship Position
                            </span>
                        </div>

                        <div className="season-stat">
                            <span className="season-value">
                                {currentTeam?.points_current}
                            </span>

                            <span className="season-label">
                                Points
                            </span>
                        </div>
                    </div>
                </div>

                <div className="team-card team-achievements-card">
                    <h2>Achievements</h2>
                    <div className="achievement-grid">
                        <div className="achievement-item">
                            <span className="achievement-number">{team.constructorsChampionships}</span>
                            <span className="achievement-label">Constructors Titles</span>
                        </div>
                        <div className="achievement-item">
                            <span className="achievement-number">{team.driversChampionships}</span>
                            <span className="achievement-label">Drivers Titles</span>
                        </div>
                        <div className="achievement-item">
                            <span className="achievement-number">{team.wins}</span>
                            <span className="achievement-label">Race Wins</span>
                        </div>
                        <div className="achievement-item">
                            <span className="achievement-number">{team.podiums}</span>
                            <span className="achievement-label">Podiums</span>
                        </div>
                        <div className="achievement-item">
                            <span className="achievement-number">{team.poles}</span>
                            <span className="achievement-label">Pole Positions</span>
                        </div>
                        <div className="achievement-item">
                            <span className="achievement-number">{team.fastestLaps}</span>
                            <span className="achievement-label">Fastest Laps</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="team-description-section">
                <div className="team-card team-description-card">
                    <h2>About The Team</h2>
                    <p>{team.description}</p>
                </div>
            </section>
        </div>
    );
}

export default Team;