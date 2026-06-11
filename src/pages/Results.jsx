// src/pages/Results.jsx
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../context/ThemeContext";
import { getTeamColor } from "../utils/colorUtils";
import { getSchedule, getResults } from "../services/f1Service";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Home.css";
import "../styles/Results.css";

const MEDALS = ["🥇", "🥈", "🥉"];

function Results() {
    const { t }     = useTranslation();
    const { theme } = useThemeContext();

    const [races, setRaces]                 = useState([]);
    const [selected, setSelected]           = useState(null);
    const [detail, setDetail]               = useState(null);
    const [loadingList, setLoadingList]     = useState(true);
    const [loadingDetail, setLoadingDetail] = useState(false);
    const [error, setError]                 = useState(null);

    useEffect(() => {
        getSchedule()
            .then((meetings) => {
                const now  = new Date();
                const past = meetings
                    .filter((m) => new Date(m.date_end) < now)
                    .reverse();
                setRaces(past);
                if (past.length > 0) loadDetail(past[0].meeting_key);
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoadingList(false));
    }, []);

    const loadDetail = (meetingKey) => {
        if (selected === meetingKey) return;
        setSelected(meetingKey);
        setDetail(null);
        setLoadingDetail(true);

        getResults()
            .then(setDetail)
            .catch((err) => setError(err.message))
            .finally(() => setLoadingDetail(false));
    };

    return (
        <div className="home">
            <div className="top">
                <Header />
            </div>
            <div className="mid">
                <div className="content-container">

                    {/* Título */}
                    <div className="schedule-page-header">
                        <h1 className="schedule-page-title">
                            {t("navigation.results")} {new Date().getFullYear()}
                        </h1>
                        <p className="schedule-page-subtitle">
                            {races.length} {t("schedule.finished").toLowerCase()}
                        </p>
                    </div>

                    {loadingList && (
                        <div className="schedule-state">
                            <div className="schedule-spinner" />
                            <p>{t("standings.loading")}</p>
                        </div>
                    )}

                    {error && (
                        <div className="schedule-state schedule-state--error">
                            <span>⚠</span><p>{error}</p>
                        </div>
                    )}

                    {!loadingList && !error && (
                        <div className="schedule-layout">

                            {/* ── Lista de carreras ── */}
                            <div className="schedule-list">
                                {races.map((race, idx) => {
                                    const isSelected = race.meeting_key === selected;
                                    const flagUrl    = race.country_code
                                        ? `https://flagcdn.com/w40/${race.country_code.toLowerCase()}.png`
                                        : null;

                                    return (
                                        <button
                                            key={race.meeting_key}
                                            className={`schedule-item schedule-item--past ${isSelected ? "schedule-item--selected" : ""}`}
                                            onClick={() => loadDetail(race.meeting_key)}
                                        >
                                            <span className="schedule-item-round">R{races.length - idx}</span>

                                            {flagUrl && (
                                                <img
                                                    src={flagUrl}
                                                    alt={race.country_name}
                                                    className="schedule-item-flag"
                                                    onError={(e) => { e.target.style.display = "none"; }}
                                                />
                                            )}

                                            <div className="schedule-item-info">
                                                <span className="schedule-item-name">{race.meeting_name}</span>
                                                <span className="schedule-item-circuit">
                                                    {new Date(race.date_end).toLocaleDateString("en-US", {
                                                        month: "short", day: "numeric",
                                                    })}
                                                </span>
                                            </div>

                                            <span className="schedule-item-done">›</span>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* ── Detalle ── */}
                            <div className="schedule-detail">
                                {loadingDetail ? (
                                    <div className="schedule-state">
                                        <div className="schedule-spinner" />
                                        <p>{t("standings.loading")}</p>
                                    </div>
                                ) : detail ? (
                                    <RaceResultDetail detail={detail} theme={theme} t={t} />
                                ) : (
                                    <div className="schedule-detail-empty">
                                        <p>{t("navigation.results")}</p>
                                    </div>
                                )}
                            </div>

                        </div>
                    )}
                </div>
            </div>
            <div className="bottom">
                <Footer />
            </div>
        </div>
    );
}

function RaceResultDetail({ detail, theme, t }) {
    const { session, results } = detail;

    const raceDate = new Date(session.date_end).toLocaleDateString("en-US", {
        weekday: "long", year: "numeric", month: "long", day: "numeric",
    });

    const podium  = results.slice(0, 3);
    const restPos = results.slice(3);

    return (
        <div className="race-result-detail">

            {/* Header */}
            <div className="rrd-header">
                <div className="rrd-header-left">
                    <h2 className="rrd-title">{session.meeting_name ?? t("lastRace.title")}</h2>
                    <p className="rrd-meta">{session.session_name} · {raceDate}</p>
                </div>
                <span className="rrd-badge">
                    {t("lastRace.round")} {session.meeting_round_number ?? "—"} / 24
                </span>
            </div>

            {/* Podio */}
            <div className="rrd-podium">
                {podium.map((r) => (
                    <div
                        key={r.driver_number}
                        className={`rrd-podium-card rrd-podium-card--p${r.position}`}
                        style={{ "--team-color": getTeamColor(theme, r.team_colour) }}
                    >
                        <span className="rrd-podium-medal">{MEDALS[r.position - 1]}</span>
                        {r.headshot_url && (
                            <img
                                src={r.headshot_url}
                                alt={r.full_name}
                                className="rrd-podium-avatar"
                                onError={(e) => { e.target.style.display = "none"; }}
                            />
                        )}
                        <span className="rrd-podium-name">{r.full_name}</span>
                        <span className="rrd-podium-team">{r.team_name}</span>
                    </div>
                ))}
            </div>

            {/* Tabla P4 en adelante */}
            <div className="rrd-table-wrapper">
                <table className="rrd-table">
                    <thead>
                        <tr>
                            <th className="rrd-th rrd-th--pos">POS</th>
                            <th className="rrd-th rrd-th--driver">{t("standings.drivers").toUpperCase()}</th>
                            <th className="rrd-th rrd-th--team">{t("standings.constructors").toUpperCase()}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {restPos.map((r) => (
                            <tr key={r.driver_number} className="rrd-row">
                                <td className="rrd-td rrd-td--pos">
                                    <span className="rrd-pos">{r.position}</span>
                                </td>
                                <td className="rrd-td rrd-td--driver">
                                    <div className="rrd-driver-info">
                                        {r.headshot_url && (
                                            <img
                                                src={r.headshot_url}
                                                alt={r.full_name}
                                                className="rrd-headshot"
                                                onError={(e) => { e.target.style.display = "none"; }}
                                            />
                                        )}
                                        <div>
                                            <p className="rrd-driver-name">{r.full_name}</p>
                                            <p className="rrd-driver-num">#{r.driver_number}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="rrd-td rrd-td--team">
                                    <span
                                        className="rrd-team-dot"
                                        style={{ background: getTeamColor(theme, r.team_colour) }}
                                    />
                                    {r.team_name}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Results;
