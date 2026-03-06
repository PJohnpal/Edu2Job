import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    onSearch({ query, location });
  };

  return (
    <div style={styles.container}>
      <div style={styles.searchBox}>
        <div style={styles.inputGroup}>
          <span style={styles.icon}>🔍</span>
          <input
            style={styles.input}
            placeholder="Job title, keywords, or company"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        
        <div style={styles.divider}></div>
        
        <div style={styles.inputGroup}>
          <span style={styles.icon}>📍</span>
          <input
            style={styles.input}
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        
        <button style={styles.button} onClick={handleSearch}>
          Search Jobs
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    maxWidth: "900px",
    margin: "0 auto"
  },
  searchBox: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: "50px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
    padding: "0.5rem",
    gap: "0.5rem",
    flexWrap: "wrap"
  },
  inputGroup: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    flex: "1",
    minWidth: "200px",
    padding: "0 1rem"
  },
  icon: {
    fontSize: "1.25rem"
  },
  input: {
    border: "none",
    outline: "none",
    fontSize: "1rem",
    flex: "1",
    padding: "0.75rem 0",
    minWidth: "150px"
  },
  divider: {
    width: "1px",
    height: "30px",
    backgroundColor: "#e5e7eb"
  },
  button: {
    backgroundColor: "#667eea",
    color: "white",
    border: "none",
    borderRadius: "50px",
    padding: "0.875rem 2rem",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    whiteSpace: "nowrap"
  }
};
