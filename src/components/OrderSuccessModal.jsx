import { FaCheckCircle } from "react-icons/fa";

import "../styles/OrderSuccessModal.css";

function OrderSuccessModal({ onClose }) {

    return (
        <div
            className="order-overlay"
            onClick={onClose}
        >

            <div
                className="order-modal"
                onClick={(e) =>
                    e.stopPropagation()
                }
            >

                <FaCheckCircle
                    className="success-icon"
                />

                <h2>Order Placed Successfully</h2>

                <p>
                    Thank you for shopping with
                    F1 Sidetrack.
                </p>

                <button
                    onClick={onClose}
                >
                    Continue
                </button>

            </div>

        </div>
    );
}

export default OrderSuccessModal;