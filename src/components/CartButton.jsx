import "../styles/CartButton.css";
import { GiF1Car } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

function CartButton() {
    const navigate = useNavigate();

    return (
        <div className="CartButton-container">
            <button className="Cart-button" onClick={() => navigate("/cart")}>
                <GiF1Car className="Cart-icon" />

                <span className="CartButton-label">Cart</span>
            </button>
        </div>
    );
}

export default CartButton;
