import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Global styles
const globalStyles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  button:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-2px);
  }
  
  button:active:not(:disabled) {
    transform: translateY(0);
  }
  
  a:hover {
    opacity: 0.85;
  }
  
  input:focus, select:focus {
    outline: none;
    border-color: #667eea !important;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes slideIn {
    from {
      transform: translateX(-100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  /* Responsive media queries */
  @media (max-width: 1024px) {
    .formWrapper {
      grid-template-columns: 1fr !important;
    }
    
    .sidePanel {
      display: none !important;
    }
    
    .content {
      grid-template-columns: 1fr !important;
    }
    
    .sidebar {
      position: relative !important;
      top: 0 !important;
    }
  }
  
  @media (max-width: 768px) {
    h1 {
      font-size: 2rem !important;
    }
    
    h2 {
      font-size: 1.5rem !important;
    }
    
    .searchBox {
      flex-direction: column !important;
    }
    
    .divider {
      display: none !important;
    }
  }
  
  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 10px;
  }
  
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  
  ::-webkit-scrollbar-thumb {
    background: #667eea;
    border-radius: 5px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: #764ba2;
  }
`;

const styleElement = document.createElement('style');
styleElement.textContent = globalStyles;
document.head.appendChild(styleElement);

ReactDOM.createRoot(document.getElementById("root")).render(
  <App />
);