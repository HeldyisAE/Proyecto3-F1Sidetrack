import "../styles/UserProfileModal.css";
import { useNavigate } from "react-router-dom";
import { MdSupportAgent } from "react-icons/md";
import { FaCommentDots } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

function UserProfileModal({ user, onClose }) {

    const navigate = useNavigate();

    if (!user) return null;

    const handleLogout = () => {

        localStorage.removeItem("currentUser");

        navigate("/", {
            replace: true
        });
    };

    return (
        <div
            className="profile-overlay"
            onClick={onClose}
        >
            

            <div
                className="profile-modal"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="profile-close-icon"
                    onClick={onClose}
                >
                    <IoClose />
                </button>

                <h2>User Profile</h2>

                <div className="profile-info">

                    <div className="profile-row">
                        <span className="profile-label">
                            Username
                        </span>

                        <span className="profile-value">
                            {user.username}
                        </span>
                    </div>

                    <div className="profile-row">
                        <span className="profile-label">
                            Email
                        </span>

                        <span className="profile-value">
                            {user.mail || user.email}
                        </span>
                    </div>

                </div>

                <div className="profile-actions">

                    <button className="profile-option">
                        <MdSupportAgent />
                        <span>Support</span>
                    </button>

                    <button className="profile-option">
                        <FaCommentDots />
                        <span>Feedback</span>
                    </button>

                    <button className="profile-option">
                        <IoSettingsSharp />
                        <span>Settings</span>
                    </button>

                </div>

                <button
                    className="logout-button"
                    onClick={handleLogout}
                >
                    Sign Out
                </button>

            </div>

        </div>
    );
}

export default UserProfileModal;