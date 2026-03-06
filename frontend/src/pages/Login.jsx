import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";
import Navbar from "../components/Navbar";
import Logo from "../components/Logo";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!form.email || !form.password) {
      setError("Please fill in all fields");
      return;
    }
    
    try {
      setError("");
      setLoading(true);
      const res = await API.post("/login", form);
      localStorage.setItem("token", res.data.token);
      if (res.data.user && res.data.user.role) {
        localStorage.setItem("userRole", res.data.user.role);
      }
      navigate("/jobs");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      login();
    }
  };

  return (
    <div style={styles.page}>
      <Navbar />
      
      <div style={styles.container}>
        <div style={styles.formWrapper}>
          <div style={styles.card}>
            <div style={styles.logoSection}>
              <Logo size="large" showText={true} />
            </div>
            
            <h2 style={styles.title}>Welcome Back!</h2>
            <p style={styles.subtitle}>Login to access your account</p>
            
            {error && (
              <div style={styles.error}>
                <span style={styles.errorIcon}>⚠️</span>
                {error}
              </div>
            )}
            
            <div style={styles.form}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Email Address</label>
                <input
                  style={styles.input}
                  placeholder="you@example.com"
                  type="email"
                  value={form.email}
                  onChange={e => setForm({...form, email: e.target.value})}
                  onKeyPress={handleKeyPress}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Password</label>
                <input
                  style={styles.input}
                  type="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={e => setForm({...form, password: e.target.value})}
                  onKeyPress={handleKeyPress}
                />
              </div>

              <button 
                style={{
                  ...styles.button,
                  ...(loading ? styles.buttonDisabled : {})
                }} 
                onClick={login}
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
              
              <p style={styles.footer}>
                Don't have an account? {" "}
                <Link to="/register" style={styles.link}>Create one now</Link>
              </p>
            </div>
          </div>
          
          <div style={styles.sidePanel}>
            <div style={styles.sidePanelContent}>
              <h3 style={styles.sidePanelTitle}>Join thousands of job seekers</h3>
              <ul style={styles.benefitsList}>
                <li style={styles.benefit}>✨ Access to exclusive jobs</li>
                <li style={styles.benefit}>📬 Personalized job alerts</li>
                <li style={styles.benefit}>🎯 One-click applications</li>
                <li style={styles.benefit}>📊 Track your applications</li>
              </ul>
            </div>
          </div>
        </div>
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
    minHeight: "calc(100vh - 80px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem 1.5rem"
  },
  formWrapper: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    maxWidth: "1000px",
    width: "100%",
    backgroundColor: "white",
    borderRadius: "1.5rem",
    boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
    overflow: "hidden"
  },
  card: {
    padding: "3rem 2.5rem"
  },
  logoSection: {
    marginBottom: "2rem",
    display: "flex",
    justifyContent: "center"
  },
  title: {
    fontSize: "2rem",
    fontWeight: "800",
    color: "#1f2937",
    marginBottom: "0.5rem",
    textAlign: "center"
  },
  subtitle: {
    fontSize: "1rem",
    color: "#6b7280",
    marginBottom: "2rem",
    textAlign: "center"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem"
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem"
  },
  label: {
    fontSize: "0.875rem",
    fontWeight: "600",
    color: "#374151"
  },
  input: {
    padding: "0.875rem 1rem",
    border: "2px solid #e5e7eb",
    borderRadius: "0.75rem",
    fontSize: "1rem",
    transition: "all 0.3s ease",
    outline: "none"
  },
  button: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    padding: "1rem",
    border: "none",
    borderRadius: "0.75rem",
    fontSize: "1rem",
    fontWeight: "700",
    cursor: "pointer",
    marginTop: "0.5rem",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)"
  },
  buttonDisabled: {
    opacity: 0.6,
    cursor: "not-allowed"
  },
  footer: {
    textAlign: "center",
    color: "#6b7280",
    fontSize: "0.9375rem",
    marginTop: "0.5rem"
  },
  link: {
    color: "#667eea",
    textDecoration: "none",
    fontWeight: "600"
  },
  error: {
    backgroundColor: "#fee2e2",
    color: "#991b1b",
    padding: "1rem",
    borderRadius: "0.75rem",
    marginBottom: "1rem",
    fontSize: "0.875rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem"
  },
  errorIcon: {
    fontSize: "1.125rem"
  },
  sidePanel: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "3rem 2.5rem",
    display: "flex",
    alignItems: "center",
    color: "white"
  },
  sidePanelContent: {
    width: "100%"
  },
  sidePanelTitle: {
    fontSize: "1.75rem",
    fontWeight: "800",
    marginBottom: "2rem",
    lineHeight: "1.3"
  },
  benefitsList: {
    listStyle: "none",
    padding: 0,
    margin: 0
  },
  benefit: {
    fontSize: "1.125rem",
    marginBottom: "1.25rem",
    opacity: 0.95,
    display: "flex",
    alignItems: "center"
  }
};