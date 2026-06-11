import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../context/ThemeContext";
import { getSchedule } from "../services/f1Service";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Home.css";
import "../styles/Schedule.css";

function Schedule() {
    const { t }     = useTranslation();
    const { theme } = useThemeContext();

    const [meetings, setMeetings] = useState([]);
    const [loading, setLoading]   = useState(true);
    const [error, setError]       = useState(null);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        getSchedule()
            .then((data) => {
                setMeetings(data);
                const now  = new Date();
                const next = data.find((m) => new Date(m.date_end) >= now);
                if (next) setSelected(next.meeting_key);
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    const getRaceStatus = (meeting) => {
        const start = new Date(meeting.date_start);
        const end   = new Date(meeting.date_end);
        const now   = new Date();
        if (end < now)                  return "past";
        if (start <= now && end >= now) return "live";
        return "upcoming";
    };

    const selectedData = meetings.find((m) => m.meeting_key === selected);

    return (
        <div className="home">
            <div className="top">
                <Header />
            </div>
            <div className="mid">
                <div className="content-container">

                    {/* Título de sección */}
                    <div className="schedule-page-header">
                        <h1 className="schedule-page-title">
                            {t("navigation.schedule")} {new Date().getFullYear()}
                        </h1>
                        <p className="schedule-page-subtitle">
                            {meetings.filter(m => getRaceStatus(m) === "past").length} / {meetings.length} {t("schedule.finished").toLowerCase()}
                        </p>
                    </div>

                    {loading && (
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

                    {!loading && !error && (
                        <div className="schedule-layout">

                            {/* ── Lista ── */}
                            <div className="schedule-list">
                                {meetings.map((meeting, idx) => {
                                    const status     = getRaceStatus(meeting);
                                    const isSelected = meeting.meeting_key === selected;
                                    const flagUrl    = meeting.country_code
                                        ? `https://flagcdn.com/w40/${meeting.country_code.toLowerCase()}.png`
                                        : null;

                                    return (
                                        <button
                                            key={meeting.meeting_key}
                                            className={`schedule-item schedule-item--${status} ${isSelected ? "schedule-item--selected" : ""}`}
                                            onClick={() => setSelected(meeting.meeting_key)}
                                        >
                                            <span className="schedule-item-round">R{idx + 1}</span>

                                            {flagUrl && (
                                                <img
                                                    src={flagUrl}
                                                    alt={meeting.country_name}
                                                    className="schedule-item-flag"
                                                    onError={(e) => { e.target.style.display = "none"; }}
                                                />
                                            )}

                                            <div className="schedule-item-info">
                                                <span className="schedule-item-name">{meeting.meeting_name}</span>
                                                <span className="schedule-item-circuit">{meeting.circuit_short_name}</span>
                                            </div>

                                            <div className="schedule-item-right">
                                                <span className="schedule-item-date">
                                                    {new Date(meeting.date_start).toLocaleDateString("en-US", {
                                                        month: "short", day: "numeric",
                                                    })}
                                                </span>
                                                {status === "live" && <span className="schedule-item-live">LIVE</span>}
                                                {status === "past" && <span className="schedule-item-done">✓</span>}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* ── Detalle ── */}
                            <div className="schedule-detail">
                                {selectedData
                                    ? <RaceDetail meeting={selectedData} status={getRaceStatus(selectedData)} t={t} />
                                    : <div className="schedule-detail-empty"><p>{t("schedule.upcoming")}</p></div>
                                }
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

function RaceDetail({ meeting, status, t }) {
    const flagUrl = meeting.country_code
        ? `https://flagcdn.com/w160/${meeting.country_code.toLowerCase()}.png`
        : null;

    const startDate = new Date(meeting.date_start);
    const endDate   = new Date(meeting.date_end);

    const formattedDate = `${startDate.toLocaleDateString("en-US", {
        weekday: "short", month: "long", day: "numeric",
    })} — ${endDate.toLocaleDateString("en-US", {
        weekday: "short", month: "long", day: "numeric",
    })}`;

    return (
        <div className={`race-detail race-detail--${status}`}>
            <div
                className="race-detail-banner"
                style={flagUrl ? { "--flag-url": `url(${flagUrl})` } : {}}
            >
                <div className="race-detail-banner-overlay" />
                <div className="race-detail-banner-content">
                    {flagUrl && (
                        <img
                            src={flagUrl}
                            alt={meeting.country_name}
                            className="race-detail-flag"
                            onError={(e) => { e.target.style.display = "none"; }}
                        />
                    )}
                    <div>
                        <p className="race-detail-country">{meeting.country_name}</p>
                        <h2 className="race-detail-name">{meeting.meeting_name}</h2>
                    </div>
                    {status === "live"     && <span className="race-detail-live-badge">🔴 LIVE</span>}
                    {status === "past"     && <span className="race-detail-status-badge race-detail-status-badge--past">{t("schedule.finished")}</span>}
                    {status === "upcoming" && <span className="race-detail-status-badge race-detail-status-badge--upcoming">{t("schedule.upcoming")}</span>}
                </div>
            </div>

            <div className="race-detail-grid">
                <div className="race-detail-item">
                    <span className="race-detail-label">{t("nextRace.circuit")}</span>
                    <span className="race-detail-value">{meeting.circuit_short_name}</span>
                </div>
                <div className="race-detail-item">
                    <span className="race-detail-label">{t("nextRace.location")}</span>
                    <span className="race-detail-value">{meeting.location}</span>
                </div>
                <div className="race-detail-item">
                    <span className="race-detail-label">{t("nextRace.country")}</span>
                    <span className="race-detail-value">{meeting.country_name}</span>
                </div>
                <div className="race-detail-item">
                    <span className="race-detail-label">{t("nextRace.date")}</span>
                    <span className="race-detail-value">{formattedDate}</span>
                </div>
            </div>
        </div>
    );
}

export default Schedule;
