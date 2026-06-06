import { useState } from "react";
import "../styles/AllProducts.css";
import ProductCard from "./ProductCard";

function AllProducts({ products }) {

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

    const shuffledProducts = [...filteredProducts].sort(
        () => Math.random() - 0.5
    );

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

                {shuffledProducts.map(product => (
                    <ProductCard
                        variant="grid"
                        key={product.id}
                        product={product}
                    />
                ))}

            </div>

        </section>
    );
}

export default AllProducts;