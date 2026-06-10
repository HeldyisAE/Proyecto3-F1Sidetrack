import { useMemo } from "react";
import { searchDriversAndTeams } from "../services/searchService";

export function useSearch(query, drivers, teams) {

    return useMemo(() => {

        return searchDriversAndTeams(
            query,
            drivers,
            teams
        );

    }, [query, drivers, teams]);
}