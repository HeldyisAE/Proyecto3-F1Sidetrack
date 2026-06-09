import { useState } from "react";

import { FaGooglePay } from "react-icons/fa";
import { FaApplePay } from "react-icons/fa";

import OrderSuccessModal from "./OrderSuccessModal";
import { clearCart } from "../services/cartService";

import "../styles/PaymentDetails.css";

function PaymentDetails({ onOrderSuccess }) {
    const [paymentMethod, setPaymentMethod] = useState(null);

    const [showSuccess, setShowSuccess] = useState(false);

    const handleOrder = () => {
        clearCart();
        onOrderSuccess?.();
        setShowSuccess(true);
    };

    const togglePaymentMethod = (method) => {
        if (paymentMethod === method) {
            setPaymentMethod(null);
            return;
        }

        setPaymentMethod(method);
    };

    return (
        <>
            <div className="payment-details">
                <h2>Payment Details</h2>

                <div className="quick-payments">
                    <button
                        className={`quick-payment ${paymentMethod === "google" ? "selected" : ""}`} onClick={() => togglePaymentMethod("google")}>
                            <FaGooglePay />
                    </button>

                    <button
                        className={`quick-payment ${paymentMethod === "apple" ? "selected" : ""}`} onClick={() => togglePaymentMethod("apple")}>
                        <FaApplePay />
                    </button>
                </div>

                <div className="payment-divider">or pay with card</div>

                <form className="payment-form">
                    <input type="text" placeholder="Cardholder Name" />

                    <input type="text" placeholder="Card Number" />

                    <div className="payment-row">
                        <input type="text" placeholder="MM/YY" />

                        <input type="text" placeholder="CVV" />
                    </div>
                </form>

                <button className="order-button" onClick={handleOrder}>
                    Order Now
                </button>
            </div>

            {showSuccess && (
                <OrderSuccessModal onClose={() => setShowSuccess(false)} />
            )}
        </>
    );
}

export default PaymentDetails;
