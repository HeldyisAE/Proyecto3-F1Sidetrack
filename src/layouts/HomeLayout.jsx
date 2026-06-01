import "../styles/HomeLayout.css";
import { useEffect, useState } from "react";
import { getDriverStandings, getTeamStandings } from "../services/f1Service";
import SectionNews from "../components/SectionNews";
import StandingSection from "../components/StandingSection";
import NextRaceSection from "../components/NextRaceSection";
import LastRaceResults from "../components/LastRaceResults";
import FavoriteDriverSection from "../components/FavoriteDriverSection";
import TrendDriversSection from "../components/TrendDriversSection";

function HomeLayout() {
  const [driverStandings, setDriverStandings] = useState([]);
  const [teamStandings, setTeamStandings] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [drivers, teams] = await Promise.all([
          getDriverStandings(),
          getTeamStandings(),
        ]);

        setDriverStandings(drivers);
        setTeamStandings(teams);
      } catch (error) {
        console.error(error);
      }
    };

    loadData();
  }, []);

  return (
    <div className="homelayout">
      <div className="home-hero">
        <div className="hero-card">
          <SectionNews />
        </div>
        <div className="hero-card">
          <StandingSection standings={driverStandings} teamStandings={teamStandings}/>
        </div>
      </div>
      <div className="nextrace-section">
        <NextRaceSection />
      </div>
      <div className="results-section">
        <LastRaceResults />
      </div>
      <div className="drivers-section">
        <div className="drivers-card">
          <FavoriteDriverSection standings={driverStandings}/>
        </div>

        <div className="drivers-card">
          <TrendDriversSection standings={driverStandings}/>
        </div>
      </div>
      <div className="shop-spotlight-section">
        <p>shop spotlight</p>
      </div>
    </div>
  );
}

export default HomeLayout;
