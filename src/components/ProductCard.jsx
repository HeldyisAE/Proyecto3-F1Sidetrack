import "../styles/ProductCard.css";

import { TiArrowRightThick } from "react-icons/ti";

function ProductCard({ product }) {

    return (
        <div
            className="product-card"
            style={{
                "--product-color": product.color,
            }}
        >
            <div className="product-image-wrapper">
                <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                />
            </div>

            <div className="product-info">
                <span className="product-team">
                    {product.team}
                </span>

                <h3 className="product-name">
                    {product.name}
                </h3>

                <span className="product-price">
                    ${product.price}
                </span>
            </div>

            <div className="product-overlay">

                <span className="overlay-tag">
                    {product.category}
                </span>

                <span className="overlay-title">
                    {product.name}
                </span>

                <span className="overlay-description">
                    {product.description}
                </span>

                <button className="overlay-button">
                    View Product
                    <div className='arrowIcon'>
                        <TiArrowRightThick />
                    </div>
                </button>

            </div>
        </div>
    );
}

export default ProductCard;