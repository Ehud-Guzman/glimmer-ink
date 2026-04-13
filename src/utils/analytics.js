// src/analytics.js
export const pageview = (url) => {
  if (window.gtag) {
    window.gtag('config', 'G-7F9GC4PTFB', {
      page_path: url,
    });
  }
};
