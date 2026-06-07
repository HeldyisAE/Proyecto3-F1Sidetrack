import "../styles/CartButton.css"
import { GiF1Car } from "react-icons/gi";


function CartButton() {
    return(
        <div className="CartButton-container">
            <button className="Cart-button" >
                <GiF1Car className="Cart-icon" />
                <span className="CartButton-label">Cart</span>
            </button>
        </div>
    )
}

export default CartButton;