export default function Logo({ size = "medium", showText = true, variant = "gradient" }) {
  const sizes = {
    small: { icon: 24, text: "1rem" },
    medium: { icon: 32, text: "1.5rem" },
    large: { icon: 48, text: "2rem" }
  };
  
  const currentSize = sizes[size];
  
  // Text styles based on variant
  const textStyles = {
    gradient: {
      fontSize: currentSize.text,
      fontWeight: "800",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      letterSpacing: "-0.02em"
    },
    white: {
      fontSize: currentSize.text,
      fontWeight: "800",
      color: "white",
      letterSpacing: "-0.02em",
      textShadow: "0 2px 10px rgba(0,0,0,0.2)"
    }
  };
  
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
      <svg 
        width={currentSize.icon} 
        height={currentSize.icon} 
        viewBox="0 0 40 40" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Briefcase icon */}
        <rect x="6" y="14" width="28" height="20" rx="3" fill="#60A5FA" stroke="white" strokeWidth="2"/>
        <path d="M14 14V10C14 8.89543 14.8954 8 16 8H24C25.1046 8 26 8.89543 26 10V14" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <rect x="6" y="20" width="28" height="4" fill="white" opacity="0.3"/>
        <circle cx="20" cy="22" r="2" fill="white"/>
        
        {/* Accent elements */}
        <circle cx="35" cy="8" r="3" fill="#F59E0B" opacity="0.8"/>
        <circle cx="5" cy="32" r="2" fill="#10B981" opacity="0.8"/>
      </svg>
      
      {showText && (
        <span style={textStyles[variant]}>
          JobHub
        </span>
      )}
    </div>
  );
}
