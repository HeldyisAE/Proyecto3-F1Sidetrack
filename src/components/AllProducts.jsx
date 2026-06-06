import "../styles/AllProducts.css";
import ProductCard from "./ProductCard";

function AllProducts({ products }) {

    const shuffledProducts = [...products].sort(
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