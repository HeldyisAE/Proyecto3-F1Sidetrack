import "../styles/HomeLayout.css";
import { useEffect, useState } from "react";
import {
  getDriverStandings,
  getTeamStandings,
  getNextRace,
  getLastRacePodium
} from "../services/f1Service";
import SectionNews from "../components/SectionNews";
import StandingSection from "../components/StandingSection";
import NextRaceSection from "../components/NextRaceSection";
import LastRaceResults from "../components/LastRaceResults";
import FavoriteDriverSection from "../components/FavoriteDriverSection";
import TrendDriversSection from "../components/TrendDriversSection";
import ShopSpotLightSection from "../components/ShopSpotlightSection";

function HomeLayout() {
  const [driverStandings, setDriverStandings] = useState([]);
  const [teamStandings, setTeamStandings] = useState([]);
  const [nextRace, setNextRace] = useState(null);
  const [lastRacePodium, setLastRacePodium] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [drivers, teams, race] = await Promise.all([
          getDriverStandings(),
          getTeamStandings(),
          getNextRace(),

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

  return (
    <div className="homelayout">
      <div className="home-hero">
        <div className="hero-card">
          <SectionNews />
        </div>
        <div className="hero-card">
          <StandingSection
            standings={driverStandings}
            teamStandings={teamStandings}
          />
        </div>
      </div>
      <div className="nextrace-section">
        <NextRaceSection race={nextRace} />
      </div>
      <div className="results-section">
        <LastRaceResults standings={driverStandings}/>
      </div>
      <div className="drivers-section">
        <div className="drivers-card">
          <FavoriteDriverSection standings={driverStandings} />
        </div>

        <div className="drivers-card">
          <TrendDriversSection standings={driverStandings} />
        </div>
      </div>
      <div className="shop-spotlight-section">
        <ShopSpotLightSection />
      </div>
    </div>
  );
}

export default HomeLayout;
