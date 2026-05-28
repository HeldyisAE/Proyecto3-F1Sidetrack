const API_URL = "https://api.openf1.org/v1";

const request = async (endpoint) => {
    const response = await fetch(`${API_URL}/${endpoint}`);
    if (!response.ok) throw new Error(`Error al consultar: ${endpoint}`);
    return await response.json();
};

// ─── CALENDARIO ─────────────────────────────────────────────────────────────
export const getSchedule = async () => {
    const currentYear = new Date().getFullYear();
    const meetings = await request(`meetings?year=${currentYear}`);
    // Ordenar por fecha ascendente
    return meetings.sort((a, b) => new Date(a.date_start) - new Date(b.date_start));
};

// ─── RESULTADOS ──────────────────────────────────────────────────────────────
export const getResults = async () => {
    const currentYear = new Date().getFullYear();
    const sessions = await request(`sessions?year=${currentYear}&session_type=Race`);

    if (!sessions || sessions.length === 0) throw new Error("No hay resultados disponibles.");

    const lastRace = sessions
        .filter(s => s.date_end && new Date(s.date_end) < new Date())
        .sort((a, b) => new Date(b.date_end) - new Date(a.date_end))[0];

    if (!lastRace) throw new Error("No hay carreras finalizadas esta temporada.");

    const sessionKey = lastRace.session_key;

    // Trae posiciones finales de la sesion 
    const positions = await request(`position?session_key=${sessionKey}&position<=20`);

    // Snapshot de posición más reciente por piloto
    const latest = {};
    positions.forEach(p => {
        const prev = latest[p.driver_number];
        if (!prev || new Date(p.date) > new Date(prev.date)) {
            latest[p.driver_number] = p;
        }
    });

    // Trae info de pilotos
    const drivers = await request(`drivers?session_key=${sessionKey}`);
    const driversMap = {};
    drivers.forEach(d => { driversMap[d.driver_number] = d; });

    const results = Object.values(latest)
        .sort((a, b) => a.position - b.position)
        .map(p => ({
            position: p.position,
            driver_number: p.driver_number,
            full_name: driversMap[p.driver_number]?.full_name ?? `Piloto #${p.driver_number}`,
            team_name: driversMap[p.driver_number]?.team_name ?? "—",
            team_colour: driversMap[p.driver_number]?.team_colour ?? "FFFFFF",
            headshot_url: driversMap[p.driver_number]?.headshot_url ?? null,
        }));

    return { session: lastRace, results };
};

// ─── PILOTOS ─────────────────────────────────────────────────────────────────
export const getDrivers = async () => {
    const currentYear = new Date().getFullYear();
    const sessions = await request(`sessions?year=${currentYear}`);

    if (!sessions || sessions.length === 0) throw new Error("No hay sesiones disponibles.");

    // Sesión más reciente
    const latestSession = sessions
        .sort((a, b) => new Date(b.date_start) - new Date(a.date_start))[0];

    const drivers = await request(`drivers?session_key=${latestSession.session_key}`);

    // Elimina duplicados por número de piloto
    const unique = {};
    drivers.forEach(d => {
        if (!unique[d.driver_number]) unique[d.driver_number] = d;
    });

    return Object.values(unique).sort((a, b) => a.driver_number - b.driver_number);
};

// ─── EQUIPOS ─────────────────────────────────────────────────────────────────
export const getTeams = async () => {
    const drivers = await getDrivers();

    const teamsMap = {};
    drivers.forEach(d => {
        const team = d.team_name ?? "Desconocido";
        if (!teamsMap[team]) {
            teamsMap[team] = {
                team_name: team,
                team_colour: d.team_colour ?? "FFFFFF",
                drivers: [],
            };
        }
        teamsMap[team].drivers.push({
            driver_number: d.driver_number,
            full_name: d.full_name,
            name_acronym: d.name_acronym,
            headshot_url: d.headshot_url ?? null,
            country_code: d.country_code ?? "—",
        });
    });

    return Object.values(teamsMap).sort((a, b) => a.team_name.localeCompare(b.team_name));
};

// ─── NOTICIAS ────────────────────────────────────────────────────────────────
export const getNews = async () => {
    const currentYear = new Date().getFullYear();
    const [meetings, sessions] = await Promise.all([
        request(`meetings?year=${currentYear}`),
        request(`sessions?year=${currentYear}`),
    ]);

    // Ordena sesiones por fecha descendente conlas importantes
    const recentSessions = sessions
        .filter(s => s.date_end && new Date(s.date_end) < new Date())
        .sort((a, b) => new Date(b.date_end) - new Date(a.date_end))
        .slice(0, 10);

    // Para cada sesión reciente, construir una "noticia"
    const meetingsMap = {};
    meetings.forEach(m => { meetingsMap[m.meeting_key] = m; });

    const news = recentSessions.map(s => {
        const meeting = meetingsMap[s.meeting_key] ?? {};
        const date = new Date(s.date_end).toLocaleDateString("es-CR", {
            day: "2-digit", month: "long", year: "numeric",
        });
        return {
            id: s.session_key,
            title: `${meeting.meeting_name ?? "Gran Premio"} — ${s.session_name}`,
            subtitle: `${meeting.circuit_short_name ?? ""} · ${meeting.country_name ?? ""}`,
            date,
            circuit: meeting.circuit_short_name ?? "—",
            country: meeting.country_name ?? "—",
            flag_url: meeting.country_code
                ? `https://flagcdn.com/w40/${meeting.country_code.toLowerCase()}.png`
                : null,
            session_type: s.session_type,
            meeting_key: s.meeting_key,
        };
    });

    return { year: currentYear, news };
};