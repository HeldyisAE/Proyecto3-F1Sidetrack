import { useState } from "react";
import "../styles/AllProducts.css";
import ProductCard from "./ProductCard";
import { useMemo } from "react";

function AllProducts({ products, onProductSelect }) {

    const [activeCategory, setActiveCategory] = useState("all");

    const categories = [
        { id: "all", label: "All" },
        { id: "Accessories", label: "Accessories" },
        { id: "Collectibles", label: "Collectibles" },
        { id: "Apparel", label: "Apparel" },
        { id: "Art", label: "Art" }
    ];

    const filteredProducts = products.filter(product =>
        activeCategory === "all" ||
        product.category === activeCategory
    );

    const orderedProducts = useMemo(() => {
        const first = [];
        const second = [];
        filteredProducts.forEach((product, index) => {
            if (index % 2 === 0) {
                first.push(product);
            } else {
                second.push(product);
            }
        });
        return [
            ...first,
            ...second.reverse()
        ];
    }, [filteredProducts]);

    return (
        <section className="allproducts-section">

            <div className="allproducts-header">

                <span className="section-label">
                    Full Collection
                </span>

                <h2 className="allproducts-title">
                    Browse All Products
                </h2>

                <div className="category-filters">
                    {categories.map(category => (
                        <button
                            key={category.id}
                            className={`filter-chip ${
                                activeCategory === category.id
                                    ? "active"
                                    : ""
                            }`}
                            onClick={() => setActiveCategory(category.id)}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="all-products">

                {orderedProducts.map(product => (
                    <ProductCard
                        variant="grid"
                        key={product.id}
                        product={product}
                        onClick={() => onProductSelect(product)}
                    />
                ))}

            </div>

        </section>
    );
}

export default AllProducts;