import { useSearchParams } from "react-router-dom";
import { useMemo, useState } from "react";

import { products } from "../data/products";

import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";

import "../styles/ShopSearchLayout.css";

function ShopSearchLayout() {

    const [selectedProduct, setSelectedProduct] = useState(null);

    const [searchParams] = useSearchParams();

    const query = searchParams.get("q") || "";

    const results = useMemo(() => {

        const searchTerm = query.toLowerCase();

        return products.filter(
            (product) =>
                product.name.toLowerCase().includes(searchTerm) ||
                product.team.toLowerCase().includes(searchTerm)
        );

    }, [query]);

    return (
        <section className="shop-search-layout">

            <div className="shop-search-header">

                <span className="section-label">
                    Search Results
                </span>

                <h1 className="shop-search-title">
                    Results for "{query}"
                </h1>

                <p className="shop-search-count">
                    {results.length} products found
                </p>

            </div>

            <div className="all-products">

                {results.map((product) => (

                    <ProductCard
                        key={product.id}
                        product={product}
                        variant="grid"
                        onClick={() =>
                            setSelectedProduct(product)
                        }
                    />

                ))}

            </div>

            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    onClose={() =>
                        setSelectedProduct(null)
                    }
                />
            )}

        </section>
    );
}

export default ShopSearchLayout;