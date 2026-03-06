import { Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";

export default function Home() {
  const [stats] = useState({
    jobs: "10,000+",
    companies: "500+",
    candidates: "50,000+"
  });

  const handleSearch = ({ query, location }) => {
    // Redirect to jobs page with search params
    window.location.href = `/jobs?q=${query}&loc=${location}`;
  };

  return (
    <div style={styles.page}>
      <Navbar />
      
      {/* Hero Section */}
      <div style={styles.hero}>
        <div style={styles.heroBackground}></div>
        <div style={styles.container}>
          <div style={styles.heroContent}>
            <div style={styles.badge}>
              🎉 #1 Job Portal in 2026
            </div>
            <h1 style={styles.title}>
              Find Your <span style={styles.gradient}>Dream Job</span><br/>
              That You Deserve
            </h1>
            <p style={styles.subtitle}>
              Discover thousands of opportunities from top companies worldwide.
              Your perfect career match is just a click away.
            </p>
            
            <SearchBar onSearch={handleSearch} />
            
            <div style={styles.stats}>
              <div style={styles.stat}>
                <div style={styles.statNumber}>{stats.jobs}</div>
                <div style={styles.statLabel}>Active Jobs</div>
              </div>
              <div style={styles.stat}>
                <div style={styles.statNumber}>{stats.companies}</div>
                <div style={styles.statLabel}>Companies</div>
              </div>
              <div style={styles.stat}>
                <div style={styles.statNumber}>{stats.candidates}</div>
                <div style={styles.statLabel}>Happy Candidates</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div style={styles.features}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Why Choose JobHub?</h2>
            <p style={styles.sectionSubtitle}>
              We provide the best platform to connect talented individuals with amazing opportunities
            </p>
          </div>
          
          <div style={styles.featureGrid}>
            <div style={styles.feature}>
              <div style={styles.featureIcon}>💼</div>
              <h3 style={styles.featureTitle}>Top Companies</h3>
              <p style={styles.featureText}>
                Access exclusive job listings from Fortune 500 companies and innovative startups
              </p>
            </div>
            
            <div style={styles.feature}>
              <div style={styles.featureIcon}>⚡</div>
              <h3 style={styles.featureTitle}>Quick Apply</h3>
              <p style={styles.featureText}>
                Apply to multiple jobs with one click. Save time with our streamlined application process
              </p>
            </div>
            
            <div style={styles.feature}>
              <div style={styles.featureIcon}>🎯</div>
              <h3 style={styles.featureTitle}>Perfect Match</h3>
              <p style={styles.featureText}>
                Our AI-powered algorithm matches you with jobs that fit your skills and aspirations
              </p>
            </div>
            
            <div style={styles.feature}>
              <div style={styles.featureIcon}>📊</div>
              <h3 style={styles.featureTitle}>Career Growth</h3>
              <p style={styles.featureText}>
                Track your applications and get insights to improve your job search strategy
              </p>
            </div>
            
            <div style={styles.feature}>
              <div style={styles.featureIcon}>🔔</div>
              <h3 style={styles.featureTitle}>Job Alerts</h3>
              <p style={styles.featureText}>
                Get notified instantly when new jobs matching your preferences are posted
              </p>
            </div>
            
            <div style={styles.feature}>
              <div style={styles.featureIcon}>🔒</div>
              <h3 style={styles.featureTitle}>Secure & Private</h3>
              <p style={styles.featureText}>
                Your data is protected with industry-standard security measures and encryption
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div style={styles.cta}>
        <div style={styles.container}>
          <div style={styles.ctaCard}>
            <h2 style={styles.ctaTitle}>Ready to Start Your Journey?</h2>
            <p style={styles.ctaText}>
              Join thousands of professionals who found their dream jobs through JobHub
            </p>
            <div style={styles.ctaButtons}>
              <Link to="/register" style={styles.ctaPrimary}>
                Create Free Account
              </Link>
              <Link to="/jobs" style={styles.ctaSecondary}>
                Browse Jobs →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.container}>
          <p>© 2026 JobHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f9fafb"
  },
  hero: {
    position: "relative",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "5rem 1.5rem 6rem",
    overflow: "hidden"
  },
  heroBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.1,
    backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
    backgroundSize: "40px 40px"
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 1.5rem",
    position: "relative",
    zIndex: 1
  },
  heroContent: {
    textAlign: "center",
    color: "white"
  },
  badge: {
    display: "inline-block",
    backgroundColor: "rgba(255,255,255,0.2)",
    backdropFilter: "blur(10px)",
    color: "white",
    padding: "0.5rem 1.25rem",
    borderRadius: "50px",
    fontSize: "0.875rem",
    fontWeight: "600",
    marginBottom: "1.5rem",
    border: "1px solid rgba(255,255,255,0.3)"
  },
  title: {
    fontSize: "3.5rem",
    fontWeight: "800",
    lineHeight: "1.2",
    marginBottom: "1.5rem",
    textShadow: "0 2px 20px rgba(0,0,0,0.1)"
  },
  gradient: {
    background: "linear-gradient(to right, #fbbf24, #f59e0b)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text"
  },
  subtitle: {
    fontSize: "1.25rem",
    marginBottom: "3rem",
    opacity: 0.95,
    maxWidth: "700px",
    margin: "0 auto 3rem",
    lineHeight: "1.6"
  },
  stats: {
    display: "flex",
    justifyContent: "center",
    gap: "3rem",
    marginTop: "3rem",
    flexWrap: "wrap"
  },
  stat: {
    textAlign: "center"
  },
  statNumber: {
    fontSize: "2.5rem",
    fontWeight: "800",
    marginBottom: "0.25rem"
  },
  statLabel: {
    fontSize: "0.9375rem",
    opacity: 0.9
  },
  features: {
    padding: "5rem 1.5rem",
    backgroundColor: "white"
  },
  sectionHeader: {
    textAlign: "center",
    marginBottom: "3.5rem"
  },
  sectionTitle: {
    fontSize: "2.5rem",
    fontWeight: "800",
    color: "#1f2937",
    marginBottom: "1rem"
  },
  sectionSubtitle: {
    fontSize: "1.125rem",
    color: "#6b7280",
    maxWidth: "600px",
    margin: "0 auto"
  },
  featureGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "2rem"
  },
  feature: {
    padding: "2rem",
    borderRadius: "1rem",
    transition: "all 0.3s ease",
    cursor: "pointer",
    border: "1px solid #e5e7eb"
  },
  featureIcon: {
    fontSize: "3rem",
    marginBottom: "1.25rem"
  },
  featureTitle: {
    fontSize: "1.25rem",
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: "0.75rem"
  },
  featureText: {
    fontSize: "0.9375rem",
    color: "#6b7280",
    lineHeight: "1.6"
  },
  cta: {
    padding: "5rem 1.5rem",
    backgroundColor: "#f9fafb"
  },
  ctaCard: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    borderRadius: "2rem",
    padding: "4rem 2rem",
    textAlign: "center",
    color: "white"
  },
  ctaTitle: {
    fontSize: "2.5rem",
    fontWeight: "800",
    marginBottom: "1rem"
  },
  ctaText: {
    fontSize: "1.125rem",
    marginBottom: "2.5rem",
    opacity: 0.95
  },
  ctaButtons: {
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  ctaPrimary: {
    backgroundColor: "white",
    color: "#667eea",
    padding: "1rem 2.5rem",
    borderRadius: "50px",
    textDecoration: "none",
    fontSize: "1.125rem",
    fontWeight: "700",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 20px rgba(255,255,255,0.3)"
  },
  ctaSecondary: {
    backgroundColor: "transparent",
    color: "white",
    border: "2px solid white",
    padding: "1rem 2.5rem",
    borderRadius: "50px",
    textDecoration: "none",
    fontSize: "1.125rem",
    fontWeight: "700",
    transition: "all 0.3s ease"
  },
  footer: {
    backgroundColor: "#1f2937",
    color: "white",
    padding: "2rem 1.5rem",
    textAlign: "center"
  }
};