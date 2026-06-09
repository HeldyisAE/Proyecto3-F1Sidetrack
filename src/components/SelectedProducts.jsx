import "../styles/SelectedProducts.css";
import { IoIosTrash } from "react-icons/io";

function SelectedProducts({ cart, onRemove }) {
    if (!cart.length) {
        return <div className="empty-cart">No products selected</div>;
    }

    return (
        <div className="selected-products">
            {cart.map((item) => (
                <div key={item.id} className="selected-product-card">
                    <img src={item.image} alt={item.name} />

                    <div className="selected-product-info">
                        <h4>{item.name}</h4>

                        <span>Qty: {item.quantity}</span>

                        <span>${item.price}</span>
                    </div>

                    <button className="selected-product-remove" onClick={() => onRemove(item.id)}>
                        <IoIosTrash /> 
                    </button>
                </div>
            ))}
        </div>
    );
}

export default SelectedProducts;
