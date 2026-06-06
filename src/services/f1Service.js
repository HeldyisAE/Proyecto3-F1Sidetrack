const API_URL = "https://api.openf1.org/v1";

// Cache en memoria
const cache = {
    driverStandings: null,
    teamStandings: null,
    nextRace: null,
    drivers: null,
    teams: null,
    schedule: null,
    latestRaceSession: null,
};

const request = async (endpoint) => {
    const response = await fetch(`${API_URL}/${endpoint}`);
    if (!response.ok) throw new Error(`Error al consultar: ${endpoint}`);
    return await response.json();
};

let latestRacePromise = null;

const getLatestCompletedRaceSession = async () => {

    if (cache.latestRaceSession) {
        return cache.latestRaceSession;
    }

    if (latestRacePromise) {
        return latestRacePromise;
    }

    latestRacePromise = (async () => {

        const currentYear =
            new Date().getFullYear();

        const sessions =
            await request(
                `sessions?year=${currentYear}`
            );

        const latestRace = sessions
            .filter(
                session =>
                    session.session_type === "Race" &&
                    session.date_end &&
                    new Date(session.date_end) < new Date()
            )
            .sort(
                (a, b) =>
                    new Date(b.date_end) -
                    new Date(a.date_end)
            )[0];

        cache.latestRaceSession =
            latestRace;

        return latestRace;

    })();

    return latestRacePromise;
};

// ─── CALENDARIO ─────────────────────────────────────────────────────────────
export const getSchedule = async () => {
    const currentYear = new Date().getFullYear();
    const meetings = await request(`meetings?year=${currentYear}`);
    // Ordenar por fecha ascendente
    return meetings.sort((a, b) => new Date(a.date_start) - new Date(b.date_start));
};

// ─── DRIVER STANDINGS ─────────────────────────────────────────────

export const getDriverStandings = async () => {
  if (cache.driverStandings) {
    return cache.driverStandings;
  }

  const latestRace = await getLatestCompletedRaceSession();

  const sessionKey = latestRace.session_key;

  const [standings, drivers] = await Promise.all([
    request(`championship_drivers?session_key=${sessionKey}`),
    request(`drivers?session_key=${sessionKey}`),
  ]);

  const driversMap = {};

  drivers.forEach((driver) => {
    driversMap[driver.driver_number] = driver;
  });

  const result = standings
    .sort((a, b) => a.position_current - b.position_current)
    .map((driver) => ({
      ...driver,

      full_name:
        driversMap[driver.driver_number]?.full_name ??
        `Driver #${driver.driver_number}`,

      team_name: driversMap[driver.driver_number]?.team_name ?? "Unknown Team",

      team_colour: driversMap[driver.driver_number]?.team_colour ?? "FFFFFF",

      headshot_url: driversMap[driver.driver_number]?.headshot_url ?? null,
    }));

  cache.driverStandings = result;

  return result;
};

// ─── CONSTRUCTOR STANDINGS ───────────────────────────────────────

export const getTeamStandings = async () => {
  if (cache.teamStandings) {
    return cache.teamStandings;
  }

  const latestRace = await getLatestCompletedRaceSession();

  const standings = await request(
    `championship_teams?session_key=${latestRace.session_key}`,
  );

  const result = standings.sort(
    (a, b) => a.position_current - b.position_current,
  );

  cache.teamStandings = result;

  return result;
};

// ─── RESULTADOS ──────────────────────────────────────────────────────────────
export const getResults = async () => {
  const lastRace = await getLatestCompletedRaceSession();

  const sessionKey = lastRace.session_key;

  const positions = await request(
    `position?session_key=${sessionKey}&position<=20`,
  );

  const latest = {};

  positions.forEach((p) => {
    const prev = latest[p.driver_number];

    if (!prev || new Date(p.date) > new Date(prev.date)) {
      latest[p.driver_number] = p;
    }
  });

  const drivers = await request(`drivers?session_key=${sessionKey}`);

  const driversMap = {};

  drivers.forEach((driver) => {
    driversMap[driver.driver_number] = driver;
  });

  const results = Object.values(latest)
    .sort((a, b) => a.position - b.position)
    .map((position) => ({
      position: position.position,

      driver_number: position.driver_number,

      full_name:
        driversMap[position.driver_number]?.full_name ??
        `Piloto #${position.driver_number}`,

      team_name: driversMap[position.driver_number]?.team_name ?? "—",

      team_colour: driversMap[position.driver_number]?.team_colour ?? "FFFFFF",

      headshot_url: driversMap[position.driver_number]?.headshot_url ?? null,
    }));

  return {
    session: lastRace,
    results,
  };
};

// ─── PILOTOS ─────────────────────────────────────────────────────────────────
export const getDrivers = async () => {
  const latestRace = await getLatestCompletedRaceSession();

  const drivers = await request(
    `drivers?session_key=${latestRace.session_key}`,
  );

  const unique = {};

  drivers.forEach((driver) => {
    if (!unique[driver.driver_number]) {
      unique[driver.driver_number] = driver;
    }
  });

  return Object.values(unique).sort(
    (a, b) => a.driver_number - b.driver_number,
  );
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

export const getNextRace = async () => {

    if (cache.nextRace) {
        return cache.nextRace;
    }

    try {

        const currentYear = new Date().getFullYear();

        const meetings = await request(
            `meetings?year=${currentYear}`
        );

        const now = new Date();

        const nextRace = meetings
            .filter(
                meeting => new Date(meeting.date_start) > now
            )
            .sort(
                (a, b) =>
                    new Date(a.date_start) -
                    new Date(b.date_start)
            )[0];

        if (!nextRace) {
            throw new Error(
                "No upcoming races found."
            );
        }

        cache.nextRace = nextRace;

        return nextRace;

    } catch (error) {

        console.error(
            "API Error in getNextRace:",
            error
        );

        throw error;
    }
};
