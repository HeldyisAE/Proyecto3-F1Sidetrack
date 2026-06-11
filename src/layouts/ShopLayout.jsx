import '../styles/ShopLayout.css'
import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import TeamFilterBar from '../components/TeamFilterBar';
import FeaturedMerchBanner from '../components/FeaturedMerchBanner';
import MonthTrendSection from '../components/MonthTrendSection';
import AllProducts from '../components/AllProducts';
import ProductModal from '../components/ProductModal';
import { products } from "../data/products";

function ShopLayout() {

    const navigate = useNavigate();
    const productsRef = useRef(null);

    const [selectedTeam, setSelectedTeam] = useState("all");
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [searchParams] = useSearchParams();
    const productId = searchParams.get("product");

    const initialProduct = products.find(
        p => p.id === Number(productId)
    );

    useEffect(() => {
        if (initialProduct) {
            setSelectedProduct(initialProduct);
        }
    }, [initialProduct]);

    useEffect(() => {
        if (selectedTeam !== "all" && productsRef.current) {
            productsRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    }, [selectedTeam]);

    const resetFilters = () => {
        setSelectedTeam("all");
    };

    return (
        <div className='shoplayout'>

            <div className="shop-header">
                <span className="shop-label">Paddock Store</span>
                <h1 className="shop-title">F1: SIDETRACK FAN SHOP</h1>
                <p className="shop-subtitle">
                    Explore helmets, apparel, collectibles and exclusive team gear from the Formula 1 paddock.
                </p>
            </div>

            <div className='featured-section'>
                <FeaturedMerchBanner />
            </div>

            <div className='teams-products-select'>
                <TeamFilterBar
                    onSelectTeam={setSelectedTeam}
                    selectedTeam={selectedTeam}
                />
            </div>

            <div className='month-trend'>
                <MonthTrendSection
                    products={products}
                    onProductSelect={setSelectedProduct}
                />
            </div>

            <div ref={productsRef} className='grid-products'>
                <AllProducts
                    products={products}
                    onProductSelect={setSelectedProduct}
                    selectedTeam={selectedTeam}
                    onResetTeam={resetFilters}
                />
            </div>

            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    onClose={() => {
                        setSelectedProduct(null);
                        navigate("/shop", { replace: true });
                    }}
                />
            )}

        </div>
    )
}

export default ShopLayout;