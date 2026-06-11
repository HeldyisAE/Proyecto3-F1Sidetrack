import { MdEngineering } from "react-icons/md";
import "../styles/ComingSoonModal.css";

function ComingSoonModal({ onClose }) {
    return (
        <div
            className="comingsoon-overlay"
            onClick={onClose}
        >
            <div
                className="comingsoon-modal"
                onClick={(e) => e.stopPropagation()}
            >
                <MdEngineering className="comingsoon-icon" />

                <h2>Feature In Development</h2>

                <p>
                    This functionality has not been implemented yet.
                    We're actively working on it and it will be available
                    in a future update.
                </p>

                <button
                    className="comingsoon-button"
                    onClick={onClose}
                >
                    Got it
                </button>
            </div>
        </div>
    );
}

export default ComingSoonModal;