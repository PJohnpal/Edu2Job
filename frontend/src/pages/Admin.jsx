import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import Navbar from "../components/Navbar";

export default function Admin() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ total_users: 0, total_jobs: 0, total_applications: 0 });
  const [applications, setApplications] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("stats");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    Promise.all([
      API.get("/admin/stats"),
      API.get("/admin/applications"),
      API.get("/admin/users")
    ])
      .then(([statsRes, appsRes, usersRes]) => {
        setStats(statsRes.data);
        setApplications(appsRes.data);
        setUsers(usersRes.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        if (err.response?.status === 403) {
          alert("Access denied. Admin only.");
          navigate("/");
        } else if (err.response?.status === 401) {
          navigate("/login");
        }
        setLoading(false);
      });
  }, [navigate]);

  if (loading) {
    return (
      <div>
        <Navbar />
        <div style={styles.loading}>Loading admin dashboard...</div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <Navbar />
      
      <div style={styles.container}>
        <h1 style={styles.title}>🛡️ Admin Dashboard</h1>
        
        {/* Tabs */}
        <div style={styles.tabs}>
          <button
            style={{
              ...styles.tab,
              ...(activeTab === "stats" ? styles.activeTab : {})
            }}
            onClick={() => setActiveTab("stats")}
          >
            📊 Statistics
          </button>
          <button
            style={{
              ...styles.tab,
              ...(activeTab === "applications" ? styles.activeTab : {})
            }}
            onClick={() => setActiveTab("applications")}
          >
            📝 Applications ({applications.length})
          </button>
          <button
            style={{
              ...styles.tab,
              ...(activeTab === "users" ? styles.activeTab : {})
            }}
            onClick={() => setActiveTab("users")}
          >
            👥 Users ({users.length})
          </button>
        </div>

        {/* Statistics Tab */}
        {activeTab === "stats" && (
          <div style={styles.content}>
            <div style={styles.statsGrid}>
              <div style={styles.statCard}>
                <div style={styles.statIcon}>👥</div>
                <div style={styles.statNumber}>{stats.total_users}</div>
                <div style={styles.statLabel}>Total Users</div>
              </div>
              
              <div style={styles.statCard}>
                <div style={styles.statIcon}>💼</div>
                <div style={styles.statNumber}>{stats.total_jobs}</div>
                <div style={styles.statLabel}>Active Jobs</div>
              </div>
              
              <div style={styles.statCard}>
                <div style={styles.statIcon}>📄</div>
                <div style={styles.statNumber}>{stats.total_applications}</div>
                <div style={styles.statLabel}>Applications</div>
              </div>
            </div>
          </div>
        )}

        {/* Applications Tab */}
        {activeTab === "applications" && (
          <div style={styles.content}>
            <h2 style={styles.sectionTitle}>All Applications</h2>
            {applications.length === 0 ? (
              <p style={styles.empty}>No applications yet</p>
            ) : (
              <div style={styles.table}>
                {applications.map(app => (
                  <div key={app.id} style={styles.row}>
                    <div style={styles.cell}>
                      <div style={styles.cellTitle}>{app.applicant.name}</div>
                      <div style={styles.cellSubtitle}>{app.applicant.email}</div>
                    </div>
                    <div style={styles.cell}>
                      <div style={styles.cellTitle}>{app.job.title}</div>
                      <div style={styles.cellSubtitle}>{app.job.company}</div>
                    </div>
                    <div style={styles.cell}>
                      <span style={styles.badge}>{app.status}</span>
                    </div>
                    <div style={styles.cell}>
                      <div style={styles.cellSubtitle}>{app.applied_at}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <div style={styles.content}>
            <h2 style={styles.sectionTitle}>Registered Users</h2>
            {users.length === 0 ? (
              <p style={styles.empty}>No users yet</p>
            ) : (
              <div style={styles.table}>
                {users.map(user => (
                  <div key={user.id} style={styles.row}>
                    <div style={styles.cell}>
                      <div style={styles.cellTitle}>{user.name}</div>
                      <div style={styles.cellSubtitle}>{user.email}</div>
                    </div>
                    <div style={styles.cell}>
                      <span style={{
                        ...styles.badge,
                        ...(user.role === "admin" ? styles.adminBadge : {})
                      }}>
                        {user.role}
                      </span>
                    </div>
                    <div style={styles.cell}>
                      <div style={styles.cellSubtitle}>Joined: {user.created_at}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f9fafb"
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "2rem 1.5rem"
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "800",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    marginBottom: "2rem",
    textAlign: "center"
  },
  loading: {
    textAlign: "center",
    padding: "4rem",
    fontSize: "1.25rem",
    color: "#6b7280"
  },
  tabs: {
    display: "flex",
    gap: "1rem",
    marginBottom: "2rem",
    borderBottom: "2px solid #e5e7eb",
    flexWrap: "wrap"
  },
  tab: {
    padding: "1rem 1.5rem",
    border: "none",
    background: "transparent",
    fontSize: "1rem",
    fontWeight: "600",
    color: "#6b7280",
    cursor: "pointer",
    borderBottom: "3px solid transparent",
    transition: "all 0.3s ease"
  },
  activeTab: {
    color: "#667eea",
    borderBottomColor: "#667eea"
  },
  content: {
    marginTop: "2rem"
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "2rem"
  },
  statCard: {
    backgroundColor: "white",
    borderRadius: "1rem",
    padding: "2rem",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    transition: "transform 0.3s ease"
  },
  statIcon: {
    fontSize: "3rem",
    marginBottom: "1rem"
  },
  statNumber: {
    fontSize: "3rem",
    fontWeight: "800",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    marginBottom: "0.5rem"
  },
  statLabel: {
    fontSize: "1rem",
    color: "#6b7280",
    fontWeight: "600"
  },
  sectionTitle: {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: "1.5rem"
  },
  table: {
    backgroundColor: "white",
    borderRadius: "1rem",
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
  },
  row: {
    display: "grid",
    gridTemplateColumns: "2fr 2fr 1fr 1fr",
    gap: "1rem",
    padding: "1.5rem",
    borderBottom: "1px solid #f3f4f6",
    alignItems: "center"
  },
  cell: {
    display: "flex",
    flexDirection: "column"
  },
  cellTitle: {
    fontSize: "1rem",
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: "0.25rem"
  },
  cellSubtitle: {
    fontSize: "0.875rem",
    color: "#6b7280"
  },
  badge: {
    display: "inline-block",
    padding: "0.375rem 0.875rem",
    backgroundColor: "#f0f4ff",
    color: "#667eea",
    borderRadius: "50px",
    fontSize: "0.875rem",
    fontWeight: "600"
  },
  adminBadge: {
    backgroundColor: "#fef3c7",
    color: "#d97706"
  },
  empty: {
    textAlign: "center",
    color: "#6b7280",
    padding: "3rem",
    backgroundColor: "white",
    borderRadius: "1rem"
  }
};
