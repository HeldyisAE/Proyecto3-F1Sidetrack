import "../styles/ProductModal.css";
import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { FiPlusCircle } from "react-icons/fi";
import { FaRegCircleCheck } from "react-icons/fa6";

import { addToCart, getCart } from "../services/cartService";

function ProductModal({ product, onClose, onAddToCart }) {
    const [added, setAdded] = useState(false);

    useEffect(() => {

        const cart = getCart();

        const alreadyInCart = cart.some(
            item => item.id === product.id
        );

        setAdded(alreadyInCart);

    }, [product]);

    const handleAddToCart = () => {
        if (added) return;

        addToCart(product);

        onAddToCart?.();

        setAdded(true);
    };

    return (
        <div className="product-modal-overlay">
            <div className="product-modal">
                <button className="modal-close-button" onClick={onClose}>
                    <IoClose />
                </button>

                <div className="modal-image-container">
                    <div className="modal-image">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="modal-product-image"
                        />
                    </div>
                </div>

                <div className="modal-info">
                    <h2 className="modal-name">{product.name}</h2>

                    <div className="modal-metadata">
                        <span className="modal-team">{product.team}</span>

                        <span className="modal-category">
                            {product.category}
                        </span>
                    </div>

                    <p className="modal-description">{product.description}</p>

                    <div className="modal-price">${product.price}</div>

                    <div className="modal-actions">
                        <button
                            className={`add-cart-button ${added ? "added" : ""}`}
                            onClick={handleAddToCart}
                            disabled={added}
                        >
                            {added ? "Added to Cart" : "Add to Cart"}

                            <div className="plus-icon">
                                {added ? (
                                    <FaRegCircleCheck />
                                ) : (
                                    <FiPlusCircle />
                                )}
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductModal;
