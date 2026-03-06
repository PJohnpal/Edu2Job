import { useState } from "react";

export default function JobCard({ job }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  const handleApply = () => {
    setIsApplied(true);
    setTimeout(() => setIsApplied(false), 2000);
  };

  return (
    <div 
      style={{
        ...styles.card,
        ...(isHovered ? styles.cardHovered : {})
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={styles.header}>
        <div style={styles.companyBadge}>
          {job.company?.charAt(0) || "C"}
        </div>
        <div>
          <h3 style={styles.title}>{job.title}</h3>
          <p style={styles.company}>{job.company}</p>
        </div>
      </div>
      
      <div style={styles.tags}>
        <span style={styles.tag}>📍 {job.location}</span>
        <span style={styles.tag}>💼 Full-time</span>
      </div>
      
      <p style={styles.description}>{job.description}</p>
      
      <div style={styles.footer}>
        <div>
          <span style={styles.salaryLabel}>Salary</span>
          <span style={styles.salary}>${job.salary}</span>
        </div>
        <button 
          style={{
            ...styles.applyBtn,
            ...(isApplied ? styles.appliedBtn : {})
          }}
          onClick={handleApply}
          disabled={isApplied}
        >
          {isApplied ? "✓ Applied" : "Apply Now"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: "white",
    border: "1px solid #e5e7eb",
    borderRadius: "1rem",
    padding: "1.75rem",
    marginBottom: "1.25rem",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    transition: "all 0.3s ease",
    cursor: "pointer",
    position: "relative",
    overflow: "hidden"
  },
  cardHovered: {
    transform: "translateY(-4px)",
    boxShadow: "0 12px 24px rgba(102, 126, 234, 0.2)",
    borderColor: "#667eea"
  },
  header: {
    display: "flex",
    alignItems: "flex-start",
    gap: "1rem",
    marginBottom: "1rem"
  },
  companyBadge: {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.25rem",
    fontWeight: "bold",
    flexShrink: 0
  },
  title: {
    fontSize: "1.375rem",
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: "0.25rem",
    lineHeight: "1.3"
  },
  company: {
    fontSize: "1rem",
    color: "#6b7280",
    fontWeight: "500"
  },
  tags: {
    display: "flex",
    gap: "0.75rem",
    marginBottom: "1rem",
    flexWrap: "wrap"
  },
  tag: {
    fontSize: "0.875rem",
    color: "#667eea",
    backgroundColor: "#f0f4ff",
    padding: "0.375rem 0.875rem",
    borderRadius: "50px",
    fontWeight: "500"
  },
  description: {
    fontSize: "0.9375rem",
    color: "#4b5563",
    marginBottom: "1.25rem",
    lineHeight: "1.6"
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "1.25rem",
    paddingTop: "1.25rem",
    borderTop: "1px solid #e5e7eb"
  },
  salaryLabel: {
    display: "block",
    fontSize: "0.75rem",
    color: "#9ca3af",
    fontWeight: "500",
    marginBottom: "0.25rem",
    textTransform: "uppercase",
    letterSpacing: "0.05em"
  },
  salary: {
    display: "block",
    fontSize: "1.25rem",
    fontWeight: "700",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text"
  },
  applyBtn: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    padding: "0.75rem 1.75rem",
    border: "none",
    borderRadius: "50px",
    cursor: "pointer",
    fontSize: "0.9375rem",
    fontWeight: "600",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)"
  },
  appliedBtn: {
    background: "#10b981",
    boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)"
  }
};