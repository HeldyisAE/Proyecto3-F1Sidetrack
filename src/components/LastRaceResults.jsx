import "../styles/LastRaceResults.css";

function LastRaceResults() {

    const podium = [
        {
            position: 2,
            driver: "Lewis Hamilton",
            team: "Ferrari"
        },
        {
            position: 1,
            driver: "Kimi Antonelli",
            team: "Mercedes"
        },
        {
            position: 3,
            driver: "Max Verstappen",
            team: "Red Bull"
        }
    ];

    return (
        <div className="last-race-results">
            
            <div className="results-header">
                <span className="results-title">
                    Last Race Summary
                </span>

                <span className="results-subtitle">
                    Canada Grand Prix • Round 5
                </span>
            </div>

            <div className="podium-section">

                <div className="podium-step second">
                    <span className="podium-position">2</span>
                    <span className="podium-driver">
                        {podium[0].driver}
                    </span>
                    <span className="podium-team">
                        {podium[0].team}
                    </span>
                </div>

                <div className="podium-step first">
                    <span className="podium-position">1</span>
                    <span className="podium-driver">
                        {podium[1].driver}
                    </span>
                    <span className="podium-team">
                        {podium[1].team}
                    </span>
                </div>

                <div className="podium-step third">
                    <span className="podium-position">3</span>
                    <span className="podium-driver">
                        {podium[2].driver}
                    </span>
                    <span className="podium-team">
                        {podium[2].team}
                    </span>
                </div>

            </div>

            <div className="race-highlights">

                <div className="highlight-card">
                    <span className="highlight-label">
                        Pole Position
                    </span>

                    <span className="highlight-driver">
                        George Russell
                    </span>
                </div>

                <div className="highlight-card">
                    <span className="highlight-label">
                        Fastest Lap
                    </span>

                    <span className="highlight-driver">
                        Kimi Antonelli
                    </span>

                    <span className="highlight-time">
                        1:14.210
                    </span>
                </div>

            </div>

        </div>
    );
}

export default LastRaceResults;