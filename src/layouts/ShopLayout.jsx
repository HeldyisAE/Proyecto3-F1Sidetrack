import '../styles/ShopLayout.css'
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

import TeamFilterBar from '../components/TeamFilterBar';
import FeaturedMerchBanner from '../components/FeaturedMerchBanner';
import MonthTrendSection from '../components/MonthTrendSection';
import AllProducts from '../components/AllProducts';
import ProductModal from '../components/ProductModal';
import { products } from "../data/products";

function ShopLayout() {

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

    const [selectedProduct, setSelectedProduct] = useState(null);

    return (
        <div className='shoplayout'>
            <div className='featured-section'>
                <FeaturedMerchBanner />
            </div>
            <div className='teams-products-select'>
                <TeamFilterBar />
            </div>
            <div className='month-trend'>
                <MonthTrendSection products={products} onProductSelect={setSelectedProduct}/>
            </div>
            <div className='grid-products'>
                <AllProducts products={products} onProductSelect={setSelectedProduct} />
            </div>

            {
                selectedProduct && (
                    <ProductModal
                        product={selectedProduct}
                        onClose={() => {
                            setSelectedProduct(null);
                            navigate("/shop", { replace: true });
                        }}
                    />
                )
            }

        </div>
    )
}

export default ShopLayout;