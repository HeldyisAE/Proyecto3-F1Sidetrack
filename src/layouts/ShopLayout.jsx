import '../styles/ShopLayout.css'

import TeamFilterBar from '../components/TeamFilterBar';
import FeaturedMerchBanner from '../components/FeaturedMerchBanner';
import MonthTrendSection from '../components/MonthTrendSection';
import { products } from "../data/products";

function ShopLayout() {
    return (
        <div className='shoplayout'>
            <div className='teams-products-select'>
                <TeamFilterBar />
            </div>
            <div className='featured-section'>
                <FeaturedMerchBanner />
            </div>
            <div className='month-trend'>
                <MonthTrendSection products={products}/>
            </div>
            <div className='grid-products'>
                <h1>Grid</h1>
            </div>
        </div>
    )
}

export default ShopLayout;