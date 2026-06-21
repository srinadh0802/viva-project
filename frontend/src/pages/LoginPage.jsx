import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error || "Login failed");
        return;
      }

      localStorage.setItem("viva_user", JSON.stringify(data.user));

      if (data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (data.user.role === "student") {
        navigate("/student/dashboard");
      } else if (data.user.role === "staff") {
        navigate("/staff/dashboard");
      } else {
        setErrorMessage("Unknown user role");
      }
    } catch (error) {
      setErrorMessage("Unable to connect to backend server");
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="badge">Secure Access</div>

        <h1>Welcome Back</h1>

        <p className="auth-subtitle">
          Sign in to access your viva scheduling dashboard.
        </p>

        <form className="auth-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              placeholder="admin@viva.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <div className="demo-users">
            <p>Demo users:</p>
            <span>admin@viva.com / admin123</span>
            <span>student@viva.com / student123</span>
            <span>staff@viva.com / staff123</span>
          </div>

          <button type="submit" className="primary-button full-width">
            Login
          </button>
        </form>
      </section>
    </main>
  );
}

export default LoginPage;