import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom"; 
import "./index.css";
import App from "./App.jsx";
if ('serviceWorker' in navigator) {
  if (import.meta.env.PROD) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .catch((err) => console.warn('SW registration failed:', err));
    });
  } else {
    navigator.serviceWorker.getRegistrations().then(regs =>
      regs.forEach(reg => reg.unregister())
    );
  }
}


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router> {/* wrap your app in Router */}
      <App />
    </Router>
  </StrictMode>
);
