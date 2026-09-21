// src/utils/analytics.js
// GA4 route tracking.
// The inline gtag("config") in index.html sets send_page_view: false, so the
// page_view hits come from here only - one per route, with no duplicate hit on
// first load. This module is also imported by the prerender/SSR entry, so it
// must stay free of browser access at import time.
const getGtag = () =>
  typeof window !== "undefined" && typeof window.gtag === "function"
    ? window.gtag
    : null;

export const pageview = (url) => {
  const gtag = getGtag();
  if (!gtag) return;

  const payload = { page_path: url };

  if (typeof window !== "undefined" && window.location) {
    payload.page_location = window.location.origin + url;
  }

  if (typeof document !== "undefined") {
    payload.page_title = document.title;
  }

  gtag("event", "page_view", payload);
};

export const trackEvent = (name, params = {}) => {
  const gtag = getGtag();
  if (!gtag) return;
  gtag("event", name, params);
};
