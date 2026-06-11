import Header from "../components/Header";
import Footer from "../components/Footer";
import ShopSearchLayout from "../layouts/ShopSearchLayout";

function ShopSearch() {
    return (
        <div className="home">
            <div className="top">
                <Header />
            </div>

            <div className="mid">
                <div className="content-container">
                    <ShopSearchLayout />
                </div>
            </div>

            <div className="bottom">
                <Footer />
            </div>
        </div>
    );
}

export default ShopSearch;