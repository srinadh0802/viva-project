import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function HomePage() {
  const [backendStatus, setBackendStatus] = useState("Checking backend...");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/health")
      .then((response) => response.json())
      .then((data) => {
        setBackendStatus(data.message);
      })
      .catch(() => {
        setBackendStatus("Backend is not connected");
      });
  }, []);

  return (
    <main className="landing-page">
      <section className="landing-card">
        <div className="badge">MSc Individual Project</div>

        <h1>Viva Coordination System</h1>

        <p>
          A full-stack web application for coordinating MSc viva scheduling,
          availability, room allocation and conflict-free timetable generation.
        </p>

        <div className="status-box">
          <span className="status-label">Backend Status</span>
          <span className="status-value">{backendStatus}</span>
        </div>

        <Link to="/login" className="primary-button">
          Continue to Login
        </Link>
      </section>
    </main>
  );
}

export default HomePage;