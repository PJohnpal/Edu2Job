import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import { useState, useEffect } from "react";

export default function Navbar() {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    setUserRole(role);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    window.location.href = "/";
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <Link to="/" style={styles.logoLink}>
          <Logo size="medium" showText={true} variant="white" />
        </Link>
        
        <div style={styles.links}>
          <Link 
            to="/" 
            style={{
              ...styles.link,
              ...(isActive("/") ? styles.activeLink : {})
            }}
          >
            Home
          </Link>
          <Link 
            to="/jobs" 
            style={{
              ...styles.link,
              ...(isActive("/jobs") ? styles.activeLink : {})
            }}
          >
            Jobs
          </Link>
          
          {!token ? (
            <>
              <Link to="/login" style={styles.link}>Login</Link>
              <Link to="/register" style={styles.linkButton}>Get Started</Link>
            </>
          ) : (
            <>
              <Link 
                to="/profile" 
                style={{
                  ...styles.link,
                  ...(isActive("/profile") ? styles.activeLink : {})
                }}
              >
                Profile
              </Link>
              {userRole === "admin" && (
                <Link 
                  to="/admin" 
                  style={{
                    ...styles.link,
                    ...(isActive("/admin") ? styles.activeLink : {})
                  }}
                >
                  Admin
                </Link>
              )}
              <button onClick={logout} style={styles.logoutBtn}>
                👤 Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "1rem 0",
    boxShadow: "0 4px 20px rgba(102, 126, 234, 0.3)",
    backdropFilter: "blur(10px)",
    position: "sticky",
    top: 0,
    zIndex: 1000
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 1.5rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  logoLink: {
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    transition: "transform 0.3s ease"
  },
  links: {
    display: "flex",
    gap: "2rem",
    alignItems: "center",
    flexWrap: "wrap"
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "1rem",
    fontWeight: "500",
    transition: "all 0.3s ease",
    position: "relative",
    paddingBottom: "0.25rem"
  },
  activeLink: {
    fontWeight: "700",
    borderBottom: "2px solid white"
  },
  linkButton: {
    background: "white",
    color: "#667eea",
    padding: "0.625rem 1.75rem",
    borderRadius: "50px",
    textDecoration: "none",
    fontSize: "1rem",
    fontWeight: "600",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(255,255,255,0.2)"
  },
  logoutBtn: {
    background: "white",
    color: "#667eea",
    padding: "0.625rem 1.75rem",
    border: "none",
    borderRadius: "50px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "600",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(255,255,255,0.2)"
  }
};