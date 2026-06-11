import { useState } from "react";
import { GiFullMotorcycleHelmet } from "react-icons/gi";

import UserProfileModal from "./UserProfileModal";

import "../styles/UserButton.css";

function UserButton() {

    const [showProfile, setShowProfile] = useState(false);

    const user = JSON.parse(
        localStorage.getItem("currentUser")
    );

    return (
        <>
            <div className="userbutton-container">

                <button
                    className="user-button"
                    onClick={() => setShowProfile(true)}
                >
                    <GiFullMotorcycleHelmet
                        className="userbutton-icon"
                    />
                </button>

                {user && (
                    <span className="user-name">
                        {user.username}
                    </span>
                )}

            </div>

            {showProfile && (
                <UserProfileModal
                    user={user}
                    onClose={() => setShowProfile(false)}
                />
            )}
        </>
    );
}

export default UserButton;