import '../styles/ShopLayout.css'

import TeamFilterBar from '../components/TeamFilterBar';
import FeaturedMerchBanner from '../components/FeaturedMerchBanner';

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
                <h1>Month trend</h1>
            </div>
            <div className='grid-products'>
                <h1>Grid</h1>
            </div>
        </div>
    )
}

export default ShopLayout;