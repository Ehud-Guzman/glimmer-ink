import { StrictMode, startTransition } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./fonts.css";
import "./index.css";
import "./season.css";
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

const app = (
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>
);

const container = document.getElementById("root");

// Every route is prerendered to static HTML at build time (scripts/prerender.js),
// so hydrate instead of mounting: React adopts the existing markup rather than
// discarding it and re-rendering from scratch. Starting the hydration inside a
// transition lets React split the work into short slices, so the page stays
// responsive to taps and scrolling while it wakes up.
//
// The dev server does not prerender: its root is just a placeholder comment.
// Hydrating that logs a (harmless) "Hydration failed" error on every load, so
// when there is no server markup to adopt, mount normally instead.
if (container.children.length > 0) {
  startTransition(() => {
    hydrateRoot(container, app);
  });
} else {
  createRoot(container).render(app);
}
