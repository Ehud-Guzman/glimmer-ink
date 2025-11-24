import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { pageview } from "@/analytics";

const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    pageview(location.pathname + location.search);
  }, [location]);

  return null;
};

export default AnalyticsTracker;
