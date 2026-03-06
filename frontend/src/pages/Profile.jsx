import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import Navbar from "../components/Navbar";

export default function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    phone: "",
    education: "",
    experience: "",
    skills: "",
    resume_url: "",
    certifications: "",
    linkedin: "",
    github: ""
  });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Set auth header
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    // Fetch user data and profile
    Promise.all([
      API.get("/user/me"),
      API.get("/profile")
    ])
      .then(([userRes, profileRes]) => {
        setUser(userRes.data);
        if (profileRes.data) {
          setProfile(profileRes.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
        setLoading(false);
      });
  }, [navigate]);

  const handleSubmit = async () => {
    setSaving(true);
    setMessage("");
    
    try {
      await API.post("/profile", profile);
      setMessage("Profile updated successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div style={styles.loading}>Loading...</div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <Navbar />
      
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>My Profile</h1>
          <p style={styles.subtitle}>
            {user?.name} • {user?.email}
          </p>
        </div>

        {message && (
          <div style={message.includes("success") ? styles.success : styles.error}>
            {message}
          </div>
        )}

        <div style={styles.grid}>
          {/* Personal Information */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>📞 Contact Information</h2>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Phone Number</label>
              <input
                style={styles.input}
                placeholder="+1 (555) 123-4567"
                value={profile.phone}
                onChange={e => setProfile({...profile, phone: e.target.value})}
              />
            </div>
            
            <div style={styles.inputGroup}>
              <label style={styles.label}>LinkedIn Profile</label>
              <input
                style={styles.input}
                placeholder="https://linkedin.com/in/yourprofile"
                value={profile.linkedin}
                onChange={e => setProfile({...profile, linkedin: e.target.value})}
              />
            </div>
            
            <div style={styles.inputGroup}>
              <label style={styles.label}>GitHub Profile</label>
              <input
                style={styles.input}
                placeholder="https://github.com/yourusername"
                value={profile.github}
                onChange={e => setProfile({...profile, github: e.target.value})}
              />
            </div>
          </div>

          {/* Education */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>🎓 Education</h2>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Education Details</label>
              <textarea
                style={styles.textarea}
                placeholder="e.g., Bachelor of Science in Computer Science, XYZ University, 2020"
                rows="4"
                value={profile.education}
                onChange={e => setProfile({...profile, education: e.target.value})}
              />
            </div>
          </div>

          {/* Experience */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>💼 Work Experience</h2>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Professional Experience</label>
              <textarea
                style={styles.textarea}
                placeholder="e.g., Software Engineer at ABC Corp (2020-2023)&#10;- Developed web applications&#10;- Led team of 5 developers"
                rows="6"
                value={profile.experience}
                onChange={e => setProfile({...profile, experience: e.target.value})}
              />
            </div>
          </div>

          {/* Skills */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>⚡ Skills</h2>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Technical & Soft Skills</label>
              <textarea
                style={styles.textarea}
                placeholder="e.g., JavaScript, Python, React, Leadership, Communication"
                rows="4"
                value={profile.skills}
                onChange={e => setProfile({...profile, skills: e.target.value})}
              />
            </div>
          </div>

          {/* Certifications */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>🏆 Certifications</h2>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Professional Certifications</label>
              <textarea
                style={styles.textarea}
                placeholder="e.g., AWS Certified Solutions Architect&#10;Google Cloud Professional"
                rows="4"
                value={profile.certifications}
                onChange={e => setProfile({...profile, certifications: e.target.value})}
              />
            </div>
          </div>

          {/* Resume */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>📄 Resume</h2>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Resume URL (Google Drive, Dropbox, etc.)</label>
              <input
                style={styles.input}
                placeholder="https://drive.google.com/file/d/YOUR_FILE_ID"
                value={profile.resume_url}
                onChange={e => setProfile({...profile, resume_url: e.target.value})}
              />
              {profile.resume_url && (
                <a 
                  href={profile.resume_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={styles.link}
                >
                  📎 View Resume
                </a>
              )}
            </div>
          </div>
        </div>

        <div style={styles.actions}>
          <button 
            style={{
              ...styles.saveButton,
              ...(saving ? styles.buttonDisabled : {})
            }}
            onClick={handleSubmit}
            disabled={saving}
          >
            {saving ? "Saving..." : "💾 Save Profile"}
          </button>
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
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "2rem 1.5rem"
  },
  header: {
    textAlign: "center",
    marginBottom: "3rem"
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "800",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    marginBottom: "0.5rem"
  },
  subtitle: {
    fontSize: "1.125rem",
    color: "#6b7280"
  },
  loading: {
    textAlign: "center",
    padding: "4rem",
    fontSize: "1.25rem",
    color: "#6b7280"
  },
  success: {
    backgroundColor: "#d1fae5",
    color: "#065f46",
    padding: "1rem",
    borderRadius: "0.75rem",
    marginBottom: "2rem",
    textAlign: "center",
    fontWeight: "600"
  },
  error: {
    backgroundColor: "#fee2e2",
    color: "#991b1b",
    padding: "1rem",
    borderRadius: "0.75rem",
    marginBottom: "2rem",
    textAlign: "center",
    fontWeight: "600"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
    gap: "2rem",
    marginBottom: "2rem"
  },
  card: {
    backgroundColor: "white",
    borderRadius: "1rem",
    padding: "2rem",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
  },
  cardTitle: {
    fontSize: "1.25rem",
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: "1.5rem"
  },
  inputGroup: {
    marginBottom: "1.5rem"
  },
  label: {
    display: "block",
    fontSize: "0.875rem",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "0.5rem"
  },
  input: {
    width: "100%",
    padding: "0.875rem 1rem",
    border: "2px solid #e5e7eb",
    borderRadius: "0.75rem",
    fontSize: "1rem",
    transition: "all 0.3s ease"
  },
  textarea: {
    width: "100%",
    padding: "0.875rem 1rem",
    border: "2px solid #e5e7eb",
    borderRadius: "0.75rem",
    fontSize: "1rem",
    fontFamily: "inherit",
    transition: "all 0.3s ease",
    resize: "vertical"
  },
  link: {
    display: "inline-block",
    marginTop: "0.5rem",
    color: "#667eea",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "0.875rem"
  },
  actions: {
    display: "flex",
    justifyContent: "center",
    marginTop: "2rem"
  },
  saveButton: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    padding: "1rem 3rem",
    border: "none",
    borderRadius: "50px",
    fontSize: "1.125rem",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)"
  },
  buttonDisabled: {
    opacity: 0.6,
    cursor: "not-allowed"
  }
};
