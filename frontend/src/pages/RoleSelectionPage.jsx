function RoleSelectionPage() {
  const roles = [
    {
      title: "Admin",
      tag: "Coordinator",
      description: "Manage users, rooms, assignments and final timetable.",
    },
    {
      title: "Student",
      tag: "Viva Candidate",
      description: "Submit availability and view confirmed viva details.",
    },
    {
      title: "Supervisor",
      tag: "Academic Staff",
      description: "Manage availability and review supervised student vivas.",
    },
    {
      title: "Second Marker",
      tag: "Examiner",
      description: "View marking duties and scheduled viva sessions.",
    },
  ];

  return (
    <main className="role-page">
      <section className="role-header">
        <div className="badge">Choose Your Role</div>
        <h1>Role Selection</h1>
        <p>Select your role to continue to the correct dashboard.</p>
      </section>

      <section className="role-grid">
        {roles.map((role) => (
          <article className="role-card" key={role.title}>
            <span className="role-tag">{role.tag}</span>
            <h2>{role.title}</h2>
            <p>{role.description}</p>
            <button className="secondary-button">Continue</button>
          </article>
        ))}
      </section>
    </main>
  );
}

export default RoleSelectionPage;