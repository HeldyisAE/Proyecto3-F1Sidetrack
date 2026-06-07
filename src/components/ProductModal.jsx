import "../styles/ProductModal.css";
import { IoClose } from "react-icons/io5";
import { FiPlusCircle } from "react-icons/fi";

function ProductModal({ product, onClose }) {
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

                    <h2 className="modal-name">
                        {product.name}
                    </h2>

                    <div className="modal-metadata">

                        <span className="modal-team">
                            {product.team}
                        </span>

                        <span className="modal-category">
                            {product.category}
                        </span>

                    </div>

                    <p className="modal-description">
                        {product.description}
                    </p>

                    <div className="modal-price">
                        ${product.price}
                    </div>

                    <div className="modal-actions">
                        <button className="add-cart-button">
                            Add to Cart 
                            <div className="plus-icon">
                                <FiPlusCircle />
                            </div>
                        </button>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default ProductModal;