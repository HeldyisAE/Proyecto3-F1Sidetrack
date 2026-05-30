import '../styles/HomeLayout.css'

import SectionNews from '../components/SectionNews';
import StandingSection from '../components/StandingSection';

function HomeLayout() {
    return (
        <div className="homelayout">
            <div className="home-hero">
                <div className="hero-card">
                    <SectionNews />
                </div>
                <div className="hero-card">
                    <StandingSection />
                </div>
            </div>
            <div className="nextrace-section">
                <p>Next race</p>
            </div>
            <div className="results-section">
                <p>Last results</p>
            </div>
            <div className="drivers-section">
                <div className="drivers-card">
                    <p>Favorite drivers</p>
                </div>

                <div className="drivers-card">
                    <p>Trending competitors</p>
                </div>
            </div>
            <div className="shop-spotlight-section">
                <p>shop spotlight</p>
            </div>
        </div>
    )
};

export default HomeLayout;