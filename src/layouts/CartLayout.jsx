import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import PaymentDetails from "../components/PaymentDetails";

import "../styles/CartLayout.css";

function CartLayout() {

    const navigate = useNavigate();

    return (
        <div className="cart-layout">

            <header className="cart-header">

                <button
                    className="cart-back-button"
                    onClick={() => navigate("/shop")}
                >
                    <IoMdArrowRoundBack />
                </button>

                <div className="cart-header-info">

                    <h1>Shopping Cart</h1>

                    <span>
                        Review your products and complete your purchase
                    </span>

                </div>

            </header>

            <main className="cart-main">

                <section className="cart-products-section">

                    <div className="cart-section-header">
                        <h2>Selected Products</h2>
                    </div>

                    <div className="cart-products-container">

                        {/* CartItem / ProductCard variant="cart" */}

                    </div>

                </section>

                <aside className="cart-payment-section">

                    <div className="payment-card">

                        <PaymentDetails />

                        <div className="payment-form-container">

                            {/* Payment Form */}

                        </div>

                    </div>

                </aside>

            </main>

            <section className="cart-recommendations-section">

                <div className="recommendations-header">

                    <h2>You May Also Like</h2>

                    <span>
                        Complete your collection with these items
                    </span>

                </div>

                <div className="recommendations-container">

                    {/* ProductCard recommendations */}

                </div>

            </section>

        </div>
    );
}

export default CartLayout;