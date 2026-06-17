function AdminDashboard() {
  return (
    <main className="dashboard-page">
      <aside className="dashboard-sidebar">
        <div className="sidebar-logo">
          <span>VCS</span>
          <p>Viva Coordination</p>
        </div>

        <nav className="sidebar-nav">
          <a className="active">Dashboard</a>
          <a>Users</a>
          <a>Rooms</a>
          <a>Assignments</a>
          <a>Viva Period</a>
          <a>Generate Timetable</a>
          <a>Final Schedule</a>
        </nav>
      </aside>

      <section className="dashboard-content">
        <header className="dashboard-header">
          <div>
            <p className="eyebrow">Admin Workspace</p>
            <h1>Admin Dashboard</h1>
            <span>Manage users, rooms, assignments and final viva timetable.</span>
          </div>

          <button className="primary-button">Generate Timetable</button>
        </header>

        <section className="stats-grid">
          <article className="stat-card">
            <p>Total Students</p>
            <h2>0</h2>
            <span>Students awaiting viva scheduling</span>
          </article>

          <article className="stat-card">
            <p>Staff Members</p>
            <h2>0</h2>
            <span>Supervisors and second markers</span>
          </article>

          <article className="stat-card">
            <p>Rooms</p>
            <h2>0</h2>
            <span>Available viva rooms</span>
          </article>

          <article className="stat-card">
            <p>Conflicts</p>
            <h2>0</h2>
            <span>Scheduling conflicts detected</span>
          </article>
        </section>

        <section className="dashboard-panel">
          <div>
            <h2>Next Admin Tasks</h2>
            <p>Start by creating users, rooms, viva period and student-staff assignments.</p>
          </div>

          <div className="task-list">
            <div className="task-item">Create student and staff accounts</div>
            <div className="task-item">Add viva rooms and building locations</div>
            <div className="task-item">Assign each student to supervisor and second marker</div>
            <div className="task-item">Generate and review timetable suggestions</div>
          </div>
        </section>
      </section>
    </main>
  );
}

export default AdminDashboard;