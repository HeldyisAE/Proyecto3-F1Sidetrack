import { useEffect, useState } from "react";

import {
    getDriverStandings,
    getTeamStandings,
    getNextRace
} from "../services/f1Service";

export function useF1Data() {

    const [driverStandings, setDriverStandings] = useState([]);
    const [teamStandings, setTeamStandings] = useState([]);
    const [nextRace, setNextRace] = useState(null);

    useEffect(() => {

        const loadData = async () => {

            try {

                const [drivers, teams, race] =
                    await Promise.all([
                        getDriverStandings(),
                        getTeamStandings(),
                        getNextRace()
                    ]);

                setDriverStandings(drivers);
                setTeamStandings(teams);
                setNextRace(race);

            } catch (error) {
                console.error(error);
            }
        };

        loadData();

    }, []);

    return {
        driverStandings,
        teamStandings,
        nextRace
    };
}