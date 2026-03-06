import { useEffect, useState } from "react";
import API from "../api";
import Navbar from "../components/Navbar";
import JobCard from "../components/JobCard";
import SearchBar from "../components/SearchBar";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: "all",
    sort: "recent"
  });

  useEffect(() => {
    API.get("/jobs")
      .then(res => {
        setJobs(res.data);
        setFilteredJobs(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleSearch = ({ query, location }) => {
    let filtered = [...jobs];
    
    if (query) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(query.toLowerCase()) ||
        job.company.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    if (location) {
      filtered = filtered.filter(job => 
        job.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    
    setFilteredJobs(filtered);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters({ ...filters, [filterType]: value });
    // Apply filters here if needed
  };

  return (
    <div style={styles.page}>
      <Navbar />
      
      {/* Header Section */}
      <div style={styles.header}>
        <div style={styles.container}>
          <h1 style={styles.title}>Discover Your Next Opportunity</h1>
          <p style={styles.subtitle}>
            {filteredJobs.length} jobs available • Updated daily
          </p>
          
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.container}>
        <div style={styles.content}>
          
          {/* Filters Sidebar */}
          <div style={styles.sidebar}>
            <div style={styles.filterCard}>
              <h3 style={styles.filterTitle}>Filters</h3>
              
              <div style={styles.filterGroup}>
                <label style={styles.filterLabel}>Job Type</label>
                <select 
                  style={styles.select}
                  value={filters.type}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                >
                  <option value="all">All Types</option>
                  <option value="fulltime">Full-time</option>
                  <option value="parttime">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="remote">Remote</option>
                </select>
              </div>

              <div style={styles.filterGroup}>
                <label style={styles.filterLabel}>Sort By</label>
                <select 
                  style={styles.select}
                  value={filters.sort}
                  onChange={(e) => handleFilterChange('sort', e.target.value)}
                >
                  <option value="recent">Most Recent</option>
                  <option value="salary-high">Salary: High to Low</option>
                  <option value="salary-low">Salary: Low to High</option>
                  <option value="relevant">Most Relevant</option>
                </select>
              </div>

              <div style={styles.quickFilters}>
                <h4 style={styles.quickTitle}>Quick Filters</h4>
                <button style={styles.quickBtn}>🏠 Remote</button>
                <button style={styles.quickBtn}>⭐ Featured</button>
                <button style={styles.quickBtn}>🆕 New</button>
                <button style={styles.quickBtn}>💰 High Salary</button>
              </div>
            </div>
          </div>

          {/* Jobs List */}
          <div style={styles.jobsSection}>
            {loading ? (
              <div style={styles.loading}>
                <div style={styles.spinner}></div>
                <p>Loading amazing opportunities...</p>
              </div>
            ) : filteredJobs.length === 0 ? (
              <div style={styles.noJobs}>
                <div style={styles.noJobsIcon}>🔍</div>
                <h3>No jobs found</h3>
                <p>Try adjusting your search or filters</p>
              </div>
            ) : (
              <div style={styles.jobList}>
                <div style={styles.resultsHeader}>
                  <span style={styles.resultsCount}>
                    {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'} found
                  </span>
                </div>
                {filteredJobs.map(job => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            )}
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
  header: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "3rem 1.5rem",
    color: "white"
  },
  container: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "0 1.5rem"
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "800",
    marginBottom: "0.5rem",
    textAlign: "center"
  },
  subtitle: {
    fontSize: "1.125rem",
    marginBottom: "2rem",
    opacity: 0.95,
    textAlign: "center"
  },
  content: {
    display: "grid",
    gridTemplateColumns: "300px 1fr",
    gap: "2rem",
    marginTop: "-3rem",
    paddingBottom: "3rem"
  },
  sidebar: {
    position: "sticky",
    top: "100px",
    height: "fit-content"
  },
  filterCard: {
    backgroundColor: "white",
    borderRadius: "1rem",
    padding: "1.5rem",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
  },
  filterTitle: {
    fontSize: "1.25rem",
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: "1.5rem",
    paddingBottom: "1rem",
    borderBottom: "2px solid #f3f4f6"
  },
  filterGroup: {
    marginBottom: "1.5rem"
  },
  filterLabel: {
    display: "block",
    fontSize: "0.875rem",
    fontWeight: "600",
    color: "#4b5563",
    marginBottom: "0.5rem",
    textTransform: "uppercase",
    letterSpacing: "0.05em"
  },
  select: {
    width: "100%",
    padding: "0.75rem",
    border: "1px solid #d1d5db",
    borderRadius: "0.5rem",
    fontSize: "0.9375rem",
    backgroundColor: "white",
    cursor: "pointer",
    transition: "all 0.2s ease"
  },
  quickFilters: {
    marginTop: "2rem",
    paddingTop: "1.5rem",
    borderTop: "1px solid #f3f4f6"
  },
  quickTitle: {
    fontSize: "0.875rem",
    fontWeight: "600",
    color: "#4b5563",
    marginBottom: "0.75rem",
    textTransform: "uppercase",
    letterSpacing: "0.05em"
  },
  quickBtn: {
    display: "block",
    width: "100%",
    padding: "0.625rem 1rem",
    marginBottom: "0.5rem",
    border: "1px solid #e5e7eb",
    borderRadius: "0.5rem",
    backgroundColor: "white",
    fontSize: "0.875rem",
    fontWeight: "500",
    textAlign: "left",
    cursor: "pointer",
    transition: "all 0.2s ease"
  },
  jobsSection: {
    minHeight: "500px"
  },
  resultsHeader: {
    marginBottom: "1.5rem"
  },
  resultsCount: {
    fontSize: "1.125rem",
    fontWeight: "600",
    color: "#1f2937"
  },
  jobList: {
    marginTop: "1rem"
  },
  loading: {
    textAlign: "center",
    padding: "4rem 1rem",
    backgroundColor: "white",
    borderRadius: "1rem",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
  },
  spinner: {
    width: "60px",
    height: "60px",
    margin: "0 auto 1.5rem",
    border: "4px solid #f3f4f6",
    borderTop: "4px solid #667eea",
    borderRadius: "50%",
    animation: "spin 1s linear infinite"
  },
  noJobs: {
    textAlign: "center",
    padding: "4rem 1rem",
    backgroundColor: "white",
    borderRadius: "1rem",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    color: "#6b7280"
  },
  noJobsIcon: {
    fontSize: "4rem",
    marginBottom: "1rem"
  }
};