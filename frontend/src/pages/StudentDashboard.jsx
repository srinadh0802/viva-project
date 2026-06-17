function StudentDashboard() {
  return (
    <main className="dashboard-page">
      <aside className="dashboard-sidebar">
        <div className="sidebar-logo">
          <span>VCS</span>
          <p>Student Portal</p>
        </div>

        <nav className="sidebar-nav">
          <a className="active">Dashboard</a>
          <a>My Availability</a>
          <a>My Viva Details</a>
          <a>Room Location</a>
          <a>Preparation</a>
        </nav>
      </aside>

      <section className="dashboard-content">
        <header className="dashboard-header">
          <div>
            <p className="eyebrow">Student Workspace</p>
            <h1>Student Dashboard</h1>
            <span>Submit your availability and view your confirmed viva details.</span>
          </div>

          <button className="primary-button">Submit Availability</button>
        </header>

        <section className="stats-grid">
          <article className="stat-card">
            <p>Availability</p>
            <h2>Pending</h2>
            <span>Submit your preferred and unavailable times</span>
          </article>

          <article className="stat-card">
            <p>Viva Status</p>
            <h2>Not Scheduled</h2>
            <span>Your viva slot is not confirmed yet</span>
          </article>

          <article className="stat-card">
            <p>Supervisor</p>
            <h2>--</h2>
            <span>Will be shown after assignment</span>
          </article>

          <article className="stat-card">
            <p>Second Marker</p>
            <h2>--</h2>
            <span>Will be shown after assignment</span>
          </article>
        </section>

        <section className="dashboard-panel">
          <div>
            <h2>Student Guidance</h2>
            <p>
              Once your viva is scheduled, you will see the date, time, room,
              building location, supervisor and second marker details here.
            </p>
          </div>

          <div className="info-box">
            Your main task is to submit accurate availability so the system can
            generate a conflict-free viva slot.
          </div>
        </section>
      </section>
    </main>
  );
}

export default StudentDashboard;