import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { login, loginAsDemoUser } from "../services/authService";
import { useState } from "react";
import "../styles/LoginCard.css";

function LoginCard({ onRegisterClick }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = await login(username, password);

        if (!user) {
            setError("Invalid username or password");
            return;
        }

        localStorage.setItem(
            "currentUser",
            JSON.stringify(user)
        );

        navigate("/home", { replace: true });
    };

    const handleGoogleLogin = async () => {
        const user = await loginAsDemoUser();

        localStorage.setItem("currentUser", JSON.stringify(user));

        navigate("/home", { replace: true });
    };

    return (
        <div className="login-card">
            <h1>
                <span className="login-title-f1">F1</span>
                <span className="login-title-colon">:</span>
                <span className="login-title-name">SIDETRACK</span>
            </h1>

            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />

                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <div className="login-buttons">
                    <button type="submit" className="login-btn">
                        Sign In
                    </button>

                    <button
                        type="button"
                        className="google-btn"
                        onClick={handleGoogleLogin}
                    >
                        <FaGoogle />
                    </button>
                </div>
            </form>

            <p>
                Don't have an account?{" "}
                <span
                    className="login-link"
                    onClick={onRegisterClick}
                >
                    Register
                </span>
            </p>

            {
                error && (
                    <p className="login-error">
                        {error}
                    </p>
                )
            }
        </div>
    );
}

export default LoginCard;
