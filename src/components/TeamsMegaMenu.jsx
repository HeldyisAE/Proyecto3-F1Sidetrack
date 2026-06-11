import '../styles/TeamsMegaMenu.css'
import { useNavigate } from "react-router-dom";
import { teams } from "../data/teams";

function TeamsMegaMenu({ setActiveMenu }) {
    const navigate = useNavigate();

    return (
        <div
            className="teams-megamenu"
            onMouseEnter={() => setActiveMenu("teams")}
            onMouseLeave={() => setActiveMenu(null)}
        >
            <div className="teams-grid">
                {teams.map((team) => (
                    <div
                        key={team.id}
                        className="team-card"
                        style={{
                            "--team-color": team.color,
                        }}
                        onClick={() => navigate(`/team/${team.id}`)}
                    >
                        <img src={team.logo} alt={team.name} />

                        <span>{team.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TeamsMegaMenu;
