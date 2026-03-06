import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";
import Navbar from "../components/Navbar";
import Logo from "../components/Logo";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!form.name || !form.email || !form.password) {
      setError("Please fill in all fields");
      return;
    }
    
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    
    try {
      setError("");
      setLoading(true);
      await API.post("/register", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      submit();
    }
  };

  return (
    <div style={styles.page}>
      <Navbar />
      
      <div style={styles.container}>
        <div style={styles.formWrapper}>
          <div style={styles.sidePanel}>
            <div style={styles.sidePanelContent}>
              <h3 style={styles.sidePanelTitle}>Start your career journey today</h3>
              <ul style={styles.benefitsList}>
                <li style={styles.benefit}>🚀 Free account forever</li>
                <li style={styles.benefit}>💼 Browse thousands of jobs</li>
                <li style={styles.benefit}>⚡ Quick application process</li>
                <li style={styles.benefit}>🔔 Get instant job alerts</li>
                <li style={styles.benefit}>📊 Track your progress</li>
              </ul>
            </div>
          </div>
          
          <div style={styles.card}>
            <div style={styles.logoSection}>
              <Logo size="large" showText={true} />
            </div>
            
            <h2 style={styles.title}>Create Your Account</h2>
            <p style={styles.subtitle}>Join thousands of job seekers</p>
            
            {error && (
              <div style={styles.error}>
                <span style={styles.errorIcon}>⚠️</span>
                {error}
              </div>
            )}
            
            <div style={styles.form}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Full Name</label>
                <input
                  style={styles.input}
                  placeholder="John Doe"
                  value={form.name}
                  onChange={e => setForm({...form, name: e.target.value})}
                  onKeyPress={handleKeyPress}
                />
              </div>

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
                  placeholder="Minimum 6 characters"
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
                onClick={submit}
                disabled={loading}
              >
                {loading ? "Creating account..." : "Create Account"}
              </button>
              
              <p style={styles.footer}>
                Already have an account? {" "}
                <Link to="/login" style={styles.link}>Sign in</Link>
              </p>
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