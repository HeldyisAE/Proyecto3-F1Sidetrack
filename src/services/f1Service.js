const API_URL = "https://api.openf1.org/v1";

// ─── CACHÉ EN MEMORIA ────────────────────────────────────────────────────────
//
// Cada entrada almacena el valor resuelto 
// Las entradas de "promesas en vuelo" se guardan en los mapas *Promise
// para evitar race conditions: si dos llamadas llegan antes de que la
// primera resuelva, ambas reciben la misma promesa en lugar de lanzar
// dos fetches paralelos idénticos.

const cache = {
    // Valores resueltos
    latestRaceSession: null,
    driverStandings:   null,
    teamStandings:     null,
    nextRace:          null,

    //Por sesión
    driversBySession:  {},

    //Por año
    meetingsByYear:    {},
    sessionsByYear:    {},

    latestRacePromise:         null,
    driversBySessionPromises:  {},  
    meetingsByYearPromises:    {}, 
    sessionsByYearPromises:    {},   
};

// ─── CAPA DE TRANSPORTE ──────────────────────────────────────────────────────

const request = async (endpoint) => {
    const response = await fetch(`${API_URL}/${endpoint}`);
    if (!response.ok) throw new Error(`Error al consultar: ${endpoint}`);
    return response.json();
};

// ─── HELPERS INTERNOS CON CACHÉ Y DEDUPLICACIÓN ──────────────────────────────

/**
 * Devuelve los meetings del año solicitado.
 * Una sola llamada HTTP por año, compartida por getSchedule y getNews.
 */
const getMeetingsByYear = (year) => {
    if (cache.meetingsByYear[year]) {
        return Promise.resolve(cache.meetingsByYear[year]);
    }

    if (cache.meetingsByYearPromises[year]) {
        return cache.meetingsByYearPromises[year];
    }

    cache.meetingsByYearPromises[year] = request(`meetings?year=${year}`)
        .then((meetings) => {
            cache.meetingsByYear[year] = meetings;
            return meetings;
        });

    return cache.meetingsByYearPromises[year];
};

/**
 * Devuelve las sesiones del año solicitado.
 * Una sola llamada HTTP por año, compartida entre funciones.
 */
const getSessionsByYear = (year) => {
    if (cache.sessionsByYear[year]) {
        return Promise.resolve(cache.sessionsByYear[year]);
    }

    if (cache.sessionsByYearPromises[year]) {
        return cache.sessionsByYearPromises[year];
    }

    cache.sessionsByYearPromises[year] = request(`sessions?year=${year}`)
        .then((sessions) => {
            cache.sessionsByYear[year] = sessions;
            return sessions;
        });

    return cache.sessionsByYearPromises[year];
};

/**
 * Devuelve los pilotos de una sesión concreta.
 * Una sola llamada HTTP por session_key, compartida entre
 * getDriverStandings, getResults y getDrivers.
 */
const getDriversBySession = (sessionKey) => {
    if (cache.driversBySession[sessionKey]) {
        return Promise.resolve(cache.driversBySession[sessionKey]);
    }

    if (cache.driversBySessionPromises[sessionKey]) {
        return cache.driversBySessionPromises[sessionKey];
    }

    cache.driversBySessionPromises[sessionKey] = request(`drivers?session_key=${sessionKey}`)
        .then((drivers) => {
            cache.driversBySession[sessionKey] = drivers;
            return drivers;
        });

    return cache.driversBySessionPromises[sessionKey];
};

/**
 * Devuelve la sesión de carrera más reciente ya finalizada.
 * Reutiliza getMeetingsByYear para no duplicar el fetch de sesiones.
 */
const getLatestCompletedRaceSession = () => {
    if (cache.latestRaceSession) {
        return Promise.resolve(cache.latestRaceSession);
    }

    if (cache.latestRacePromise) {
        return cache.latestRacePromise;
    }

    const currentYear = new Date().getFullYear();

    cache.latestRacePromise = getSessionsByYear(currentYear)
        .then((sessions) => {
            const latestRace = sessions
                .filter(
                    (session) =>
                        session.session_type === "Race" &&
                        session.date_end &&
                        new Date(session.date_end) < new Date()
                )
                .sort((a, b) => new Date(b.date_end) - new Date(a.date_end))[0];

            cache.latestRaceSession = latestRace;
            return latestRace;
        });

    return cache.latestRacePromise;
};

// ─── CALENDARIO ──────────────────────────────────────────────────────────────

export const getSchedule = async () => {
    const currentYear = new Date().getFullYear();
    const meetings = await getMeetingsByYear(currentYear);
    return [...meetings].sort(
        (a, b) => new Date(a.date_start) - new Date(b.date_start)
    );
};

// ─── DRIVER STANDINGS ────────────────────────────────────────────────────────

export const getDriverStandings = async () => {
    if (cache.driverStandings) {
        return cache.driverStandings;
    }

    const latestRace = await getLatestCompletedRaceSession();
    if (!latestRace) {
      throw new Error("No completed race session found");
    }
    const sessionKey = latestRace.session_key;

    const [standings, drivers] = await Promise.all([
        request(`championship_drivers?session_key=${sessionKey}`),
        getDriversBySession(sessionKey),   // ← reutiliza caché compartido
    ]);

    const driversMap = {};
    drivers.forEach((driver) => {
        driversMap[driver.driver_number] = driver;
    });

    const result = standings
        .sort((a, b) => a.position_current - b.position_current)
        .map((driver) => ({
            ...driver,
            full_name:    driversMap[driver.driver_number]?.full_name    ?? `Driver #${driver.driver_number}`,
            team_name:    driversMap[driver.driver_number]?.team_name    ?? "Unknown Team",
            team_colour:  driversMap[driver.driver_number]?.team_colour  ?? "FFFFFF",
            headshot_url: driversMap[driver.driver_number]?.headshot_url ?? null,
        }));

    cache.driverStandings = result;
    return result;
};

// ─── CONSTRUCTOR STANDINGS ───────────────────────────────────────────────────

export const getTeamStandings = async () => {
    if (cache.teamStandings) {
        return cache.teamStandings;
    }

    const latestRace = await getLatestCompletedRaceSession();

    if (!latestRace) {
      throw new Error("No completed race session found");
    }

    const standings = await request(
        `championship_teams?session_key=${latestRace.session_key}`
    );

    const result = standings.sort(
        (a, b) => a.position_current - b.position_current
    );

    cache.teamStandings = result;
    return result;
};

// ─── RESULTADOS ──────────────────────────────────────────────────────────────

export const getResults = async () => {
    const lastRace = await getLatestCompletedRaceSession();
    const sessionKey = lastRace.session_key;

    const [positions, drivers] = await Promise.all([
        request(`position?session_key=${sessionKey}&position<=20`),
        getDriversBySession(sessionKey),   // ← reutiliza caché compartido
    ]);

    const latest = {};
    positions.forEach((p) => {
        const prev = latest[p.driver_number];
        if (!prev || new Date(p.date) > new Date(prev.date)) {
            latest[p.driver_number] = p;
        }
    });

    const driversMap = {};
    drivers.forEach((driver) => {
        driversMap[driver.driver_number] = driver;
    });

    const results = Object.values(latest)
        .sort((a, b) => a.position - b.position)
        .map((position) => ({
            position:      position.position,
            driver_number: position.driver_number,
            full_name:     driversMap[position.driver_number]?.full_name    ?? `Piloto #${position.driver_number}`,
            team_name:     driversMap[position.driver_number]?.team_name    ?? "—",
            team_colour:   driversMap[position.driver_number]?.team_colour  ?? "FFFFFF",
            headshot_url:  driversMap[position.driver_number]?.headshot_url ?? null,
        }));

    return { session: lastRace, results };
};

// ─── PILOTOS ─────────────────────────────────────────────────────────────────

export const getDrivers = async () => {
    const latestRace = await getLatestCompletedRaceSession();
    const drivers = await getDriversBySession(latestRace.session_key);   // ← reutiliza caché compartido

    const unique = {};
    drivers.forEach((driver) => {
        if (!unique[driver.driver_number]) {
            unique[driver.driver_number] = driver;
        }
    });

    return Object.values(unique).sort(
        (a, b) => a.driver_number - b.driver_number
    );
};

// ─── EQUIPOS ─────────────────────────────────────────────────────────────────

export const getTeams = async () => {
    const drivers = await getDrivers();

    const teamsMap = {};
    drivers.forEach((d) => {
        const team = d.team_name ?? "Desconocido";
        if (!teamsMap[team]) {
            teamsMap[team] = {
                team_name:   team,
                team_colour: d.team_colour ?? "FFFFFF",
                drivers:     [],
            };
        }
        teamsMap[team].drivers.push({
            driver_number: d.driver_number,
            full_name:     d.full_name,
            name_acronym:  d.name_acronym,
            headshot_url:  d.headshot_url ?? null,
            country_code:  d.country_code ?? "—",
        });
    });

    return Object.values(teamsMap).sort((a, b) =>
        a.team_name.localeCompare(b.team_name)
    );
};

// ─── NOTICIAS ────────────────────────────────────────────────────────────────

export const getNews = async () => {
    const currentYear = new Date().getFullYear();

    const [meetings, sessions] = await Promise.all([
        getMeetingsByYear(currentYear),
        getSessionsByYear(currentYear),
    ]);

    const recentSessions = sessions
        .filter((s) => s.date_end && new Date(s.date_end) < new Date())
        .sort((a, b) => new Date(b.date_end) - new Date(a.date_end))
        .slice(0, 10);

    const meetingsMap = {};
    meetings.forEach((m) => {
        meetingsMap[m.meeting_key] = m;
    });

    const news = recentSessions.map((s) => {
        const meeting = meetingsMap[s.meeting_key] ?? {};
        const date = new Date(s.date_end).toLocaleDateString("es-CR", {
            day: "2-digit", month: "long", year: "numeric",
        });
        return {
            id:           s.session_key,
            title:        `${meeting.meeting_name ?? "Gran Premio"} — ${s.session_name}`,
            subtitle:     `${meeting.circuit_short_name ?? ""} · ${meeting.country_name ?? ""}`,
            date,
            circuit:      meeting.circuit_short_name ?? "—",
            country:      meeting.country_name        ?? "—",
            flag_url:     meeting.country_code
                ? `https://flagcdn.com/w40/${meeting.country_code.toLowerCase()}.png`
                : null,
            session_type: s.session_type,
            meeting_key:  s.meeting_key,
        };
    });

    return { year: currentYear, news };
};

// ─── PRÓXIMA CARRERA ─────────────────────────────────────────────────────────

export const getNextRace = async () => {
    if (cache.nextRace) {
        return cache.nextRace;
    }

    try {
        const currentYear = new Date().getFullYear();
        const meetings = await getMeetingsByYear(currentYear);

        const now = new Date();
        const nextRace = meetings
            .filter((meeting) => new Date(meeting.date_start) > now)
            .sort((a, b) => new Date(a.date_start) - new Date(b.date_start))[0];

        if (!nextRace) {
            throw new Error("No upcoming races found.");
        }

        cache.nextRace = nextRace;
        return nextRace;

    } catch (error) {
        console.error("API Error in getNextRace:", error);
        throw error;
    }
};

// ─── PODIO ÚLTIMA CARRERA ────────────────────────────────────────────────────

export const getLastRacePodium = async () => {
    const latestRace = await getLatestCompletedRaceSession();
    if (!latestRace) {
      throw new Error("No completed race session found");
    }
    const sessionKey = latestRace.session_key;

    const [podiumResults, drivers] = await Promise.all([
        request(`session_result?session_key=${sessionKey}&position<=3`),
        getDriversBySession(sessionKey),   // ← reutiliza caché compartido
    ]);

    const driversMap = {};
    drivers.forEach((driver) => {
        driversMap[driver.driver_number] = driver;
    });

    return podiumResults
        .sort((a, b) => a.position - b.position)
        .map((result) => ({
            position:      result.position,
            driver_number: result.driver_number,
            full_name:     driversMap[result.driver_number]?.full_name,
            team_name:     driversMap[result.driver_number]?.team_name,
            team_colour:   driversMap[result.driver_number]?.team_colour,
            headshot_url:  driversMap[result.driver_number]?.headshot_url,
        }));
};