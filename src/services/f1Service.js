const API_URL = "https://api.openf1.org/v1";

const DEMO_MODE = false;

const TTL = {
    driverStandings: 24 * 60 * 60 * 1000,
    teamStandings:   24 * 60 * 60 * 1000,
    nextRace:        24 * 60 * 60 * 1000,
    lastRacePodium:  24 * 60 * 60 * 1000,
    drivers:         24 * 60 * 60 * 1000,
    teams:           24 * 60 * 60 * 1000,
    schedule:        24 * 60 * 60 * 1000,
    news:             6 * 60 * 60 * 1000,
    results:         24 * 60 * 60 * 1000,
    sessions:        24 * 60 * 60 * 1000,
    meetings:        24 * 60 * 60 * 1000,
};

function loadCache(key) {
    try {
        const raw = localStorage.getItem(`f1_${key}`);
        if (!raw) return null;
        return JSON.parse(raw);
    } catch {
        return null;
    }
}

function saveCache(key, data) {
    try {
        localStorage.setItem(`f1_${key}`, JSON.stringify({ timestamp: Date.now(), data }));
    } catch {}
}

function isCacheValid(entry, maxAge) {
    if (!entry) return false;
    if (DEMO_MODE) return true;
    return Date.now() - entry.timestamp < maxAge;
}

const mem = {
    latestRaceSession:         null,
    latestRacePromise:         null,
    driversBySession:          {},
    driversBySessionPromises:  {},
    meetingsByYearPromises:    {},
    sessionsByYearPromises:    {},
};

const request = async (endpoint) => {
    const response = await fetch(`${API_URL}/${endpoint}`);
    if (!response.ok) throw new Error(`Error al consultar: ${endpoint}`);
    return response.json();
};

const getMeetingsByYear = (year) => {
    const cacheKey = `meetings_${year}`;
    const entry = loadCache(cacheKey);
    if (isCacheValid(entry, TTL.meetings)) return Promise.resolve(entry.data);
    if (mem.meetingsByYearPromises[year]) return mem.meetingsByYearPromises[year];
    mem.meetingsByYearPromises[year] = request(`meetings?year=${year}`)
        .then((meetings) => { saveCache(cacheKey, meetings); return meetings; });
    return mem.meetingsByYearPromises[year];
};

const getSessionsByYear = (year) => {
    const cacheKey = `sessions_${year}`;
    const entry = loadCache(cacheKey);
    if (isCacheValid(entry, TTL.sessions)) return Promise.resolve(entry.data);
    if (mem.sessionsByYearPromises[year]) return mem.sessionsByYearPromises[year];
    mem.sessionsByYearPromises[year] = request(`sessions?year=${year}`)
        .then((sessions) => { saveCache(cacheKey, sessions); return sessions; });
    return mem.sessionsByYearPromises[year];
};

const getDriversBySession = (sessionKey) => {
    if (mem.driversBySession[sessionKey]) return Promise.resolve(mem.driversBySession[sessionKey]);
    const cacheKey = `drivers_${sessionKey}`;
    const entry = loadCache(cacheKey);
    if (isCacheValid(entry, TTL.drivers)) {
        mem.driversBySession[sessionKey] = entry.data;
        return Promise.resolve(entry.data);
    }
    if (mem.driversBySessionPromises[sessionKey]) return mem.driversBySessionPromises[sessionKey];
    mem.driversBySessionPromises[sessionKey] = request(`drivers?session_key=${sessionKey}`)
        .then((drivers) => {
            saveCache(cacheKey, drivers);
            mem.driversBySession[sessionKey] = drivers;
            return drivers;
        });
    return mem.driversBySessionPromises[sessionKey];
};

const getLatestCompletedRaceSession = () => {
    if (mem.latestRaceSession) return Promise.resolve(mem.latestRaceSession);
    if (mem.latestRacePromise) return mem.latestRacePromise;
    const currentYear = new Date().getFullYear();
    mem.latestRacePromise = getSessionsByYear(currentYear)
        .then((sessions) => {
            const latestRace = sessions
                .filter((s) => s.session_type === "Race" && s.date_end && new Date(s.date_end) < new Date())
                .sort((a, b) => new Date(b.date_end) - new Date(a.date_end))[0];
            mem.latestRaceSession = latestRace;
            return latestRace;
        });
    return mem.latestRacePromise;
};

// ─── resultados ───────────────────────────────
const buildResultsForSession = async (raceSession) => {
    const sessionKey = raceSession.session_key;

    const [positions, drivers] = await Promise.all([
        request(`position?session_key=${sessionKey}&position<=20`),
        getDriversBySession(sessionKey),
    ]);

    const latest = {};
    positions.forEach((p) => {
        const prev = latest[p.driver_number];
        if (!prev || new Date(p.date) > new Date(prev.date)) {
            latest[p.driver_number] = p;
        }
    });

    const driversMap = {};
    drivers.forEach((d) => { driversMap[d.driver_number] = d; });

    const results = Object.values(latest)
        .sort((a, b) => a.position - b.position)
        .map((p) => ({
            position:      p.position,
            driver_number: p.driver_number,
            full_name:     driversMap[p.driver_number]?.full_name    ?? `Piloto #${p.driver_number}`,
            team_name:     driversMap[p.driver_number]?.team_name    ?? "—",
            team_colour:   driversMap[p.driver_number]?.team_colour  ?? "FFFFFF",
            headshot_url:  driversMap[p.driver_number]?.headshot_url ?? null,
        }));

    return { session: raceSession, results };
};

// ─── CALENDARIO ──────────────────────────────────────────────────────────────

export const getSchedule = async () => {
    const cacheKey = "schedule";
    const entry = loadCache(cacheKey);
    if (isCacheValid(entry, TTL.schedule)) return entry.data;
    const currentYear = new Date().getFullYear();
    const meetings = await getMeetingsByYear(currentYear);
    const result = [...meetings].sort((a, b) => new Date(a.date_start) - new Date(b.date_start));
    saveCache(cacheKey, result);
    return result;
};

// ─── DRIVER STANDINGS ────────────────────────────────────────────────────────

export const getDriverStandings = async () => {
    const cacheKey = "driverStandings";
    const entry = loadCache(cacheKey);
    if (isCacheValid(entry, TTL.driverStandings)) return entry.data;
    const latestRace = await getLatestCompletedRaceSession();
    if (!latestRace) throw new Error("No completed race session found");
    const sessionKey = latestRace.session_key;
    const [standings, drivers] = await Promise.all([
        request(`championship_drivers?session_key=${sessionKey}`),
        getDriversBySession(sessionKey),
    ]);
    const driversMap = {};
    drivers.forEach((d) => { driversMap[d.driver_number] = d; });
    const result = standings
        .sort((a, b) => a.position_current - b.position_current)
        .map((driver) => ({
            ...driver,
            full_name:    driversMap[driver.driver_number]?.full_name    ?? `Driver #${driver.driver_number}`,
            team_name:    driversMap[driver.driver_number]?.team_name    ?? "Unknown Team",
            team_colour:  driversMap[driver.driver_number]?.team_colour  ?? "FFFFFF",
            headshot_url: driversMap[driver.driver_number]?.headshot_url ?? null,
        }));
    saveCache(cacheKey, result);
    return result;
};

// ─── CONSTRUCTOR STANDINGS ───────────────────────────────────────────────────

export const getTeamStandings = async () => {
    const cacheKey = "teamStandings";
    const entry = loadCache(cacheKey);
    if (isCacheValid(entry, TTL.teamStandings)) return entry.data;
    const latestRace = await getLatestCompletedRaceSession();
    if (!latestRace) throw new Error("No completed race session found");
    const standings = await request(`championship_teams?session_key=${latestRace.session_key}`);
    const result = standings.sort((a, b) => a.position_current - b.position_current);
    saveCache(cacheKey, result);
    return result;
};

// ─── RESULTADOS: última carrera (sin parámetros) ──────────────────────────────

export const getResults = async () => {
    const lastRace = await getLatestCompletedRaceSession();
    return buildResultsForSession(lastRace);
};

// ─── RESULTADOS: por meeting_key (para la página de Results) ─────────────────
// Busca la sesión Race del meeting indicado y devuelve sus posiciones finales.
// Usa caché por meeting_key para no repetir fetches.

export const getResultsByMeeting = async (meetingKey) => {
    const cacheKey = `results_${meetingKey}`;
    const entry = loadCache(cacheKey);
    if (isCacheValid(entry, TTL.results)) return entry.data;

    const currentYear = new Date().getFullYear();
    const sessions    = await getSessionsByYear(currentYear);

    // Busca la sesión de tipo Race de ese meeting
    const raceSession = sessions.find(
        (s) => s.meeting_key === meetingKey && s.session_type === "Race"
    );

    if (!raceSession) throw new Error(`No race session found for meeting ${meetingKey}`);

    const data = await buildResultsForSession(raceSession);
    saveCache(cacheKey, data);
    return data;
};

// ─── PILOTOS ─────────────────────────────────────────────────────────────────

export const getDrivers = async () => {
    const cacheKey = "drivers";
    const entry = loadCache(cacheKey);
    if (isCacheValid(entry, TTL.drivers)) return entry.data;
    const latestRace = await getLatestCompletedRaceSession();
    const drivers = await getDriversBySession(latestRace.session_key);
    const unique = {};
    drivers.forEach((d) => { if (!unique[d.driver_number]) unique[d.driver_number] = d; });
    const result = Object.values(unique).sort((a, b) => a.driver_number - b.driver_number);
    saveCache(cacheKey, result);
    return result;
};

// ─── EQUIPOS ─────────────────────────────────────────────────────────────────

export const getTeams = async () => {
    const cacheKey = "teams";
    const entry = loadCache(cacheKey);
    if (isCacheValid(entry, TTL.teams)) return entry.data;
    const drivers = await getDrivers();
    const teamsMap = {};
    drivers.forEach((d) => {
        const team = d.team_name ?? "Desconocido";
        if (!teamsMap[team]) {
            teamsMap[team] = { team_name: team, team_colour: d.team_colour ?? "FFFFFF", drivers: [] };
        }
        teamsMap[team].drivers.push({
            driver_number: d.driver_number,
            full_name:     d.full_name,
            name_acronym:  d.name_acronym,
            headshot_url:  d.headshot_url ?? null,
            country_code:  d.country_code ?? "—",
        });
    });
    const result = Object.values(teamsMap).sort((a, b) => a.team_name.localeCompare(b.team_name));
    saveCache(cacheKey, result);
    return result;
};

// ─── NOTICIAS ────────────────────────────────────────────────────────────────

export const getNews = async () => {
    const cacheKey = "news";
    const entry = loadCache(cacheKey);
    if (isCacheValid(entry, TTL.news)) return entry.data;
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
    meetings.forEach((m) => { meetingsMap[m.meeting_key] = m; });
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
    const result = { year: currentYear, news };
    saveCache(cacheKey, result);
    return result;
};

// ─── PRÓXIMA CARRERA ─────────────────────────────────────────────────────────

export const getNextRace = async () => {
    const cacheKey = "nextRace";
    const entry = loadCache(cacheKey);
    if (isCacheValid(entry, TTL.nextRace)) return entry.data;
    try {
        const currentYear = new Date().getFullYear();
        const meetings = await getMeetingsByYear(currentYear);
        const now = new Date();
        const nextRace = meetings
            .filter((m) => new Date(m.date_start) > now)
            .sort((a, b) => new Date(a.date_start) - new Date(b.date_start))[0];
        if (!nextRace) throw new Error("No upcoming races found.");
        saveCache(cacheKey, nextRace);
        return nextRace;
    } catch (error) {
        console.error("API Error in getNextRace:", error);
        throw error;
    }
};

// ─── PODIO ÚLTIMA CARRERA ────────────────────────────────────────────────────

export const getLastRacePodium = async () => {
    const cacheKey = "lastRacePodium";
    const entry = loadCache(cacheKey);
    if (isCacheValid(entry, TTL.lastRacePodium)) return entry.data;
    const latestRace = await getLatestCompletedRaceSession();
    if (!latestRace) throw new Error("No completed race session found");
    const sessionKey = latestRace.session_key;
    const [podiumResults, drivers] = await Promise.all([
        request(`session_result?session_key=${sessionKey}&position<=3`),
        getDriversBySession(sessionKey),
    ]);
    const driversMap = {};
    drivers.forEach((d) => { driversMap[d.driver_number] = d; });
    const result = podiumResults
        .sort((a, b) => a.position - b.position)
        .map((r) => ({
            position:      r.position,
            driver_number: r.driver_number,
            full_name:     driversMap[r.driver_number]?.full_name,
            team_name:     driversMap[r.driver_number]?.team_name,
            team_colour:   driversMap[r.driver_number]?.team_colour,
            headshot_url:  driversMap[r.driver_number]?.headshot_url,
        }));
    saveCache(cacheKey, result);
    return result;
};
