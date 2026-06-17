function StaffDashboard() {
  return (
    <main className="dashboard-page">
      <aside className="dashboard-sidebar">
        <div className="sidebar-logo">
          <span>VCS</span>
          <p>Staff Portal</p>
        </div>

        <nav className="sidebar-nav">
          <a className="active">Dashboard</a>
          <a>My Availability</a>
          <a>Supervisor Duties</a>
          <a>Second Marker Duties</a>
          <a>My Timetable</a>
        </nav>
      </aside>

      <section className="dashboard-content">
        <header className="dashboard-header">
          <div>
            <p className="eyebrow">Staff Workspace</p>
            <h1>Staff Dashboard</h1>
            <span>
              Manage your availability, supervised students and second marker duties.
            </span>
          </div>

          <button className="primary-button">Update Availability</button>
        </header>

        <section className="stats-grid">
          <article className="stat-card">
            <p>Supervised Students</p>
            <h2>0</h2>
            <span>Students where you are supervisor</span>
          </article>

          <article className="stat-card">
            <p>Second Marker Duties</p>
            <h2>0</h2>
            <span>Vivas where you act as second marker</span>
          </article>

          <article className="stat-card">
            <p>Scheduled Vivas</p>
            <h2>0</h2>
            <span>Confirmed viva sessions</span>
          </article>

          <article className="stat-card">
            <p>Availability</p>
            <h2>Pending</h2>
            <span>Submit your available and unavailable times</span>
          </article>
        </section>

        <section className="dashboard-panel">
          <div>
            <h2>Staff Role Rule</h2>
            <p>
              A staff member can supervise some students and also act as second
              marker for other students. The scheduler must prevent clashes
              across both duties.
            </p>
          </div>

          <div className="task-list">
            <div className="task-item">Submit staff availability</div>
            <div className="task-item">Review supervised student vivas</div>
            <div className="task-item">Review second marker duties</div>
            <div className="task-item">Check final timetable after approval</div>
          </div>
        </section>
      </section>
    </main>
  );
}

export default StaffDashboard;