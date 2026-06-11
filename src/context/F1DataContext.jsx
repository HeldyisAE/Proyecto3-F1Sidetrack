import { createContext, useEffect, useState } from "react";

import {
    getDriverStandings,
    getTeamStandings,
    getNextRace
} from "../services/f1Service";

export const F1DataContext = createContext();

export function F1DataProvider({ children }) {

    const [driverStandings, setDriverStandings] = useState([]);
    const [teamStandings, setTeamStandings] = useState([]);
    const [nextRace, setNextRace] = useState(null);

    const [loading, setLoading] = useState(true);

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

            } finally {

                setLoading(false);

            }
        };

        loadData();

    }, []);

    return (
        <F1DataContext.Provider
            value={{
                driverStandings,
                teamStandings,
                nextRace,
                loading
            }}
        >
            {children}
        </F1DataContext.Provider>
    );
}