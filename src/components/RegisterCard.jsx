import "../styles/RegisterCard.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useState } from "react";

function RegisterCard({ onBackToLogin, setPendingUser, goToDriverSelection }) {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            !username ||
            !email ||
            !password ||
            !confirmPassword
        ) {
            alert("Complete all fields");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        setPendingUser({
            username,
            email,
            password,
        });

        goToDriverSelection();
    };

    return (
        <div className="register-card">
            <h1>
                <span className="login-title-f1">F1</span>
                <span className="login-title-colon">:</span>
                <span className="login-title-name">SIDETRACK</span>
            </h1>
            <p className="register-subtitle">
                Create your account to start your F1 journey
            </p>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />

                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>

                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>

                <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                <div className="register-buttons">
                    <button
                        type="button"
                        className="back-button"
                        onClick={onBackToLogin}
                    >
                        <IoMdArrowRoundBack />
                    </button>

                    <button type="submit" className="register-button">
                        Create Account
                    </button>
                </div>
            </form>
        </div>
    );
}

export default RegisterCard;
