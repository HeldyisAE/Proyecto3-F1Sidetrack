import '../styles/FeaturedMerchBanner.css'
import { TiArrowRightThick } from "react-icons/ti";

function FeaturedMerchBanner() {
    return (
        <button className="featuredmerchbanner">
            <img
                src="https://f1store.formula1.com/content/ws/all/43e1b9ea-59b8-435b-bb60-878321284ebe__1600X900.png"
                alt="Riviera Racing Heritage Collection"
                className="featuredmerchbanner-image"
            />

            <div className="featuredmerchbanner-overlay" />

            <div className="featuredmerchbanner-content">
                <span className="featuredmerchbanner-tag">
                    Featured Collection Incoming
                </span>

                <h2>Riviera Racing Heritage</h2>

                <p>
                    A timeless motorsport-inspired collection celebrating
                    racing culture on the French Riviera.
                </p>
                <div className="featuredmerchbanner-cta">
                    Comming soon...
                </div>
            </div>
        </button>
    );
}

export default FeaturedMerchBanner;

