import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./fonts.css";
import "./index.css";
import App from "./App.jsx";

if ("serviceWorker" in navigator) {
  if (import.meta.env.PROD) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .catch((err) => console.warn("SW registration failed:", err));
    });
  } else {
    navigator.serviceWorker
      .getRegistrations()
      .then((regs) => regs.forEach((reg) => reg.unregister()));
  }
}

// Every route is prerendered to static HTML at build time (scripts/prerender.js),
// so hydrate instead of mounting: React adopts the existing markup rather than
// discarding it and re-rendering from scratch.
hydrateRoot(
  document.getElementById("root"),
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>
);
