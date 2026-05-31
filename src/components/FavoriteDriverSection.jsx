import '../styles/FavoriteDriverSection.css'

function FavoriteDriverSection() {

    const favoriteDrivers = [
      {
        driver_number: 1,
        name: "Max Verstappen",
        team: "Red Bull Racing",
        position: 3,
        points: 185,
        color: "#3671C6",
        headshot_url: "https://placehold.co/200x200",
      },
      {
        driver_number: 43,
        name: "Franco Colapinto",
        team: "Alpine",
        position: 14,
        points: 22,
        color: "#FF87BC",
        headshot_url: "https://placehold.co/200x200",
      },
      {
        driver_number: 11,
        name: "Sergio Pérez",
        team: "Red Bull Racing",
        position: 8,
        points: 91,
        color: "#3671C6",
        headshot_url: "https://placehold.co/200x200",
      },
    ];

    return (
        <div className="favorite-drivers">

            <div className="favorite-header">

                <span className="section-label">
                    Favorite Drivers
                </span>

                <span className="favorite-subtitle">
                    Keep an eye on the drivers you support
                </span>

            </div>

            <div className="favorite-list">

                {favoriteDrivers.map(driver => (

                    <div
                        key={driver.name}
                        className="favorite-card"
                        style={{
                            "--team-color": driver.color
                        }}
                    >

                        <img
                            src={driver.headshot_url}
                            alt={driver.name}
                            className="driver-avatar"
                        />

                        <div className="driver-info">

                            <span className="driver-name">
                                {driver.name}
                            </span>

                            <span className="driver-team">
                                {driver.team}
                            </span>

                        </div>

                        <div className="driver-stats">

                            <span className="driver-position">
                                P{driver.position}
                            </span>

                            <span className="driver-points">
                                {driver.points} pts
                            </span>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    )
}

export default FavoriteDriverSection;