import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="badge">Secure Access</div>

        <h1>Welcome Back</h1>

        <p className="auth-subtitle">
          Sign in to access your viva scheduling dashboard.
        </p>

        <form className="auth-form">
          <div className="form-group">
            <label>Email address</label>
            <input type="email" placeholder="student@university.ac.uk" />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" />
          </div>

          <div className="form-row">
            <label className="checkbox-label">
              <input type="checkbox" />
              Remember me
            </label>

            <a href="#" className="small-link">
              Forgot password?
            </a>
          </div>

          <Link to="/roles" className="primary-button full-width">
            Login
          </Link>
        </form>
      </section>
    </main>
  );
}

export default LoginPage;