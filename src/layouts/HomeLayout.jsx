import "../styles/HomeLayout.css";

import { useF1Data } from "../hooks/useF1Data";

import SectionNews from "../components/SectionNews";
import StandingSection from "../components/StandingSection";
import NextRaceSection from "../components/NextRaceSection";
import LastRaceResults from "../components/LastRaceResults";
import FavoriteDriverSection from "../components/FavoriteDriverSection";
import TrendDriversSection from "../components/TrendDriversSection";
import ShopSpotLightSection from "../components/ShopSpotlightSection";

function HomeLayout() {

  const {
    driverStandings,
    teamStandings,
    nextRace
  } = useF1Data();

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
        <LastRaceResults standings={driverStandings} />
      </div>

      <div className="drivers-section">

        <div className="drivers-card">
          <FavoriteDriverSection
            standings={driverStandings}
          />
        </div>

        <div className="drivers-card">
          <TrendDriversSection
            standings={driverStandings}
          />
        </div>

      </div>

      <div className="shop-spotlight-section">
        <ShopSpotLightSection />
      </div>

    </div>
  );
}

export default HomeLayout;