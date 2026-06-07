import '../styles/TeamFilterBar.css';

import F1Logo from '../assets/F1Logo.png'

const teams = [
    {
        id: 'mercedes',
        name: 'Mercedes-AMG Petronas',
        color: '#00D2BE',
        logo: 'https://media.formula1.com/image/upload/c_fit,h_64/q_auto/v1740000001/common/f1/2025/mercedes/2025mercedeslogowhite.webp'
    },
    {
        id: 'ferrari',
        name: 'Scuderia Ferrari',
        color: '#DC0000',
        logo: 'https://media.formula1.com/image/upload/c_fit,h_64/q_auto/v1740000001/common/f1/2025/ferrari/2025ferrarilogolight.webp'
    },
    {
        id: 'mclaren',
        name: 'McLaren',
        color: '#FF8000',
        logo: 'https://media.formula1.com/image/upload/c_fit,h_64/q_auto/v1740000001/common/f1/2025/mclaren/2025mclarenlogowhite.webp'
    },
    {
        id: 'redbull',
        name: 'Red Bull Racing',
        color: '#1E41FF',
        logo: 'https://media.formula1.com/image/upload/c_lfill,w_48/q_auto/v1740000001/common/f1/2026/redbullracing/2026redbullracinglogowhite.webp'
    },
    {
        id: 'alpine',
        name: 'Alpine',
        color: '#1484b1',
        logo: 'https://media.formula1.com/image/upload/c_lfill,w_48/q_auto/v1740000001/common/f1/2026/alpine/2026alpinelogowhite.webp'
    },
    {
        id: 'racingbulls',
        name: 'Racing Bulls',
        color: '#4B6FFF',
        logo: 'https://media.formula1.com/image/upload/c_lfill,w_48/q_auto/v1740000001/common/f1/2026/racingbulls/2026racingbullslogowhite.webp'
    },
    {
        id: 'haas',
        name: 'Haas',
        color: '#B6BABD',
        logo: 'https://media.formula1.com/image/upload/c_lfill,w_48/q_auto/v1740000001/common/f1/2026/haasf1team/2026haasf1teamlogowhite.webp'
    },
    {
        id: 'williams',
        name: 'Williams',
        color: '#005AFF',
        logo: 'https://media.formula1.com/image/upload/c_lfill,w_48/q_auto/v1740000001/common/f1/2026/williams/2026williamslogowhite.webp'
    },
    {
        id: 'audi',
        name: 'Audi F1 Team',
        color: '#975805',
        logo: 'https://media.formula1.com/image/upload/c_lfill,w_48/q_auto/v1740000001/common/f1/2026/audi/2026audilogowhite.webp'
    },
    {
        id: 'astonmartin',
        name: 'Aston Martin',
        color: '#006F62',
        logo: 'https://media.formula1.com/image/upload/c_lfill,w_48/q_auto/v1740000001/common/f1/2026/astonmartin/2026astonmartinlogowhite.webp'
    },
    {
        id: 'cadillac',
        name: 'Cadillac F1 Team',
        color: '#636260',
        logo: 'https://media.formula1.com/image/upload/c_lfill,w_48/q_auto/v1740000001/common/f1/2026/cadillac/2026cadillaclogowhite.webp'
    },
    {
        id: 'legacy',
        name: 'Legacy',
        color: '#ffffff',
        logo: F1Logo
    }
];

function TeamFilterBar({ onSelectTeam, selectedTeam }) {
    return (
        <div className="teamfilter-container">
            <div className="teamfilter-header">
                <h3>Search by Team</h3>
                <span>Select a constructor to filter products</span>
            </div>
            <div className="teamfilterbar">
                {teams.map(team => (
                    <button
                        key={team.id}
                        className={`team-button ${selectedTeam === team.id ? "active" : ""}`}
                        style={{ backgroundColor: team.color }}
                        onClick={() => onSelectTeam(team.id)}
                        aria-label={team.name}
                        title={team.name}
                    >
                        <img
                            src={team.logo}
                            alt={team.name}
                            className="team-logo"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}

export default TeamFilterBar;