import { useCallback } from "react";
import { useLocation } from "react-router-dom";

// "Get a Quote" links to /contact. When the visitor is already on that page a
// plain <Link> does nothing visible, so scroll to the form instead.
export default function useQuoteClick() {
  const { pathname } = useLocation();

  return useCallback(
    (event) => {
      if (pathname.replace(/\/$/, "") !== "/contact") return;

      const form = document.getElementById("contact-form");
      if (!form) return;

      event.preventDefault();
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      form.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    },
    [pathname]
  );
}
