import { useNavigate } from "react-router-dom";
import "../styles/LoginCard.css";

function LoginCard() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/home");
  };

  return (
    <div className="login-card">
      <h1>
        <span className="login-title-f1">F1</span>
        <span className="login-title-colon">:</span>
        <span className="login-title-name">SIDETRACK</span>
      </h1>

      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Username" />

        <input type="password" placeholder="Password" />

        <button type="submit">Sign In</button>
      </form>

      <p>
        Don't have an account?{" "}
        <span className="login-link" onClick={() => navigate("/register")}>
          Register
        </span>
      </p>
    </div>
  );
}

export default LoginCard;