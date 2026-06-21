import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config";

function AdminUsersPage() {
  // This state stores all users loaded from the Flask backend
  const [users, setUsers] = useState([]);

  // This state stores the form input values before creating a user
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    role: "student",
  });

  // This state is used to show success or error messages on the page
  const [message, setMessage] = useState("");

  // This function loads all users from the backend API
  const loadUsers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users`);
      const data = await response.json();

      setUsers(data);
    } catch (error) {
      setMessage("Unable to load users from backend.");
    }
  };

  // useEffect runs automatically when this page first opens
  useEffect(() => {
    loadUsers();
  }, []);

  // This function updates formData whenever the admin types in the form
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // This function sends the new user details to Flask backend
  const handleCreateUser = async (event) => {
    event.preventDefault();
    setMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || "Unable to create user.");
        return;
      }

      setMessage("User created successfully.");

      // Clear the form after successful user creation
      setFormData({
        full_name: "",
        email: "",
        password: "",
        role: "student",
      });

      // Reload users so the new user appears in the table
      loadUsers();
    } catch (error) {
      setMessage("Unable to connect to backend server.");
    }
  };

  return (
    <main className="dashboard-page">
      <aside className="dashboard-sidebar">
        <div className="sidebar-logo">
          <span>VCS</span>
          <p>Viva Coordination</p>
        </div>

        <nav className="sidebar-nav">
          <Link to="/admin/dashboard">Dashboard</Link>
          <Link to="/admin/users" className="active">
            Users
          </Link>
          <a>Rooms</a>
          <a>Assignments</a>
          <a>Viva Period</a>
          <a>Generate Timetable</a>
          <a>Final Schedule</a>
          <Link to="/login">Logout</Link>
        </nav>
      </aside>

      <section className="dashboard-content">
        <div className="dashboard-header">
          <div>
            <p className="eyebrow">Admin Management</p>
            <h1>Manage Users</h1>
            <p>
              Create and view Admin, Student, and Staff accounts for the viva
              coordination system.
            </p>
          </div>
        </div>

        <div className="dashboard-grid two-column-grid">
          <section className="dashboard-card">
            <h3>Create New User</h3>

            <form className="admin-form" onSubmit={handleCreateUser}>
              <div className="form-group">
                <label>Full name</label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                />
              </div>

              <div className="form-group">
                <label>Email address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create password"
                />
              </div>

              <div className="form-group">
                <label>Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="admin">Admin</option>
                  <option value="student">Student</option>
                  <option value="staff">Staff</option>
                </select>
              </div>

              {message && <p className="error-message">{message}</p>}

              <button type="submit" className="primary-button full-width">
                Create User
              </button>
            </form>
          </section>

          <section className="dashboard-card">
            <h3>Existing Users</h3>

            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.full_name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>{user.is_active ? "Active" : "Inactive"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

export default AdminUsersPage;