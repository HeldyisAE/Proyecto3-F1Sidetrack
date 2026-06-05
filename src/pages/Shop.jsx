import '../styles/Home.css'

import Header from '../components/Header';
import Footer from '../components/Footer';
import ShopLayout from '../layouts/ShopLayout';

function Shop() {

    return (
        <div className="shop">
            <div className="top">
                <Header />
            </div>
            <div className="mid">
                <div className='catalog-container'>
                    <ShopLayout />
                </div>
            </div>
            <div className="bottom">
                <Footer />
            </div>
        </div>
    )
};

export default Shop;