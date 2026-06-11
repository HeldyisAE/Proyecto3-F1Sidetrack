import { useState } from "react";

import { FaGooglePay } from "react-icons/fa";
import { FaApplePay } from "react-icons/fa";

import OrderSuccessModal from "./OrderSuccessModal";
import { clearCart } from "../services/cartService";

import "../styles/PaymentDetails.css";

function PaymentDetails({ onOrderSuccess, isCartEmpty }) {
    const [cardholder, setCardholder] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");
    const [error, setError] = useState("");

    const [paymentMethod, setPaymentMethod] = useState(null);

    const [showSuccess, setShowSuccess] = useState(false);

    const togglePaymentMethod = (method) => {

        setError("");

        if (paymentMethod === method) {
            setPaymentMethod(null);
            return;
        }

        setPaymentMethod(method);
    };

    const handleOrder = () => {
        if (paymentMethod) {
            clearCart();
            onOrderSuccess?.();
            setShowSuccess(true);
            return;
        }

        const cleanCardNumber = cardNumber.replace(/\s/g, "");

        if (cardholder.trim().length < 3) {
            setError("Invalid cardholder name");
            return;
        }

        if (!/^\d{16}$/.test(cleanCardNumber)) {
            setError("Card number must contain 16 digits");
            return;
        }

        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
            setError("Expiration date must be MM/YY");
            return;
        }

        if (!/^\d{3,4}$/.test(cvv)) {
            setError("CVV must contain 3 or 4 digits");
            return;
        }

        setError("");

        clearCart();
        onOrderSuccess?.();
        setShowSuccess(true);
    };

    return (
        <>
            <div className="payment-details">
                <h2>Payment Details</h2>

                <div className="quick-payments">
                    <button
                        className={`quick-payment ${paymentMethod === "google" ? "selected" : ""}`}
                        onClick={() => togglePaymentMethod("google")}
                    >
                        <FaGooglePay />
                    </button>

                    <button
                        className={`quick-payment ${paymentMethod === "apple" ? "selected" : ""}`}
                        onClick={() => togglePaymentMethod("apple")}
                    >
                        <FaApplePay />
                    </button>
                </div>

                <div className="payment-divider">or pay with card</div>

                <form className={`payment-form ${paymentMethod ? "disabled" : ""}`}>
                    <input
                        type="text"
                        placeholder="Cardholder Name"
                        value={cardholder}
                        onChange={(e) => setCardholder(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Card Number"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                    />

                    <div className="payment-row">
                        <input
                            type="text"
                            placeholder="MM/YY"
                            value={expiry}
                            onChange={(e) => setExpiry(e.target.value)}
                        />

                        <input
                            type="text"
                            placeholder="CVV"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                        />
                    </div>
                </form>

                {error && <p className="payment-error">{error}</p>}

                <button
                    className="order-button"
                    onClick={handleOrder}
                    disabled={isCartEmpty}
                >
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
