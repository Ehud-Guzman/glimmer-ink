import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { pageview } from "../analytics"; // your analytics helper

export default function usePageTracking() {
  const location = useLocation(); // React Router hook

  useEffect(() => {
    // Call your GA4 pageview function on every route change
    pageview(location.pathname);
  }, [location]);
}
