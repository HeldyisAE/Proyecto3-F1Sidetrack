export function searchDriversAndTeams(query, drivers, teams) {
    if (!query.trim()) {
        return [];
    }

    const searchTerm = query.toLowerCase().trim();

    const driverResults = drivers
        .filter(driver =>
            driver.full_name
                ?.toLowerCase()
                .includes(searchTerm)
        )
        .map(driver => ({
            id: driver.driver_number,
            type: "driver",
            name: driver.full_name,
            image: driver.headshot_url
        }));

    const teamResults = teams
        .filter(team =>
            team.name
                ?.toLowerCase()
                .includes(searchTerm)
        )
        .map(team => ({
            id: team.id,
            type: "team",
            name: team.name,
            image: team.logo
        }));

    return [...driverResults, ...teamResults]
        .slice(0, 8);
}