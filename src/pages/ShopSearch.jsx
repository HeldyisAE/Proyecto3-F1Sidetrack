import Header from "../components/Header";
import Footer from "../components/Footer";
import ShopSearchLayout from "../layouts/ShopSearchLayout";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function ShopSearch() {
    
    const navigate = useNavigate();

    return (
        <div className="home">
            <div className="top">
                <Header />
            </div>

            <div className="mid">
                <div className="content-container">
                    <div className="shop-search-content">
                        <button
                            className="shop-search-back-button"
                            onClick={() => navigate("/shop")}
                        >
                            <IoMdArrowRoundBack />
                        </button>

                        <ShopSearchLayout />
                    </div>
                </div>
            </div>

            <div className="bottom">
                <Footer />
            </div>
        </div>
    );
}

export default ShopSearch;
