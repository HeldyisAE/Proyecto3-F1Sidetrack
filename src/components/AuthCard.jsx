import { useState } from "react";

import LoginCard from "./LoginCard";
import RegisterCard from "./RegisterCard";
import DriverSelectionCard from "./DriverSelectionCard";

function AuthCard() {

    const [mode, setMode] = useState("login");

    const [pendingUser, setPendingUser] = useState(null);

    return (
        <div className="auth-card-container">
            {mode === "login" && (
                <LoginCard
                    onRegisterClick={() => setMode("register")}
                />
            )}

            {mode === "register" && (
                <RegisterCard
                    onBackToLogin={() => setMode("login")}
                    setPendingUser={setPendingUser}
                    goToDriverSelection={() =>
                        setMode("driverSelection")
                    }
                />
            )}

            {mode === "driverSelection" && (
                <DriverSelectionCard
                    pendingUser={pendingUser}
                    onBack={() => setMode("register")}
                />
            )}
        </div>
    );
}

export default AuthCard;