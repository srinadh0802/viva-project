import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();

    const userEmail = email.toLowerCase().trim();

    if (userEmail === "admin@viva.com") {
      navigate("/admin/dashboard");
    } else if (userEmail === "student@viva.com") {
      navigate("/student/dashboard");
    } else if (
      userEmail === "staff@viva.com" ||
      userEmail === "supervisor@viva.com" ||
      userEmail === "marker@viva.com"
    ) {
      navigate("/staff/dashboard");
    } else {
      alert(
        "Use one of these demo emails: admin@viva.com, student@viva.com, staff@viva.com"
      );
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
            <input type="password" placeholder="Enter any password for demo" />
          </div>

          <div className="demo-users">
            <p>Demo users:</p>
            <span>admin@viva.com</span>
            <span>student@viva.com</span>
            <span>staff@viva.com</span>
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