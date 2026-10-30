// Price formatting: 20000 -> "20,000", "KES 20,000".
//
// Deliberately not Number#toLocaleString. The first locale-aware call makes the
// browser load its internationalisation data, which cost about 150 ms of main
// thread time on a mid-range phone profile, and blogPosts.js (imported by the
// footer) did it at load time on every page. It also formatted using each
// visitor's own locale, which could differ from the prerendered HTML.
//
// Prices here are whole numbers, so grouping the digits by hand gives the same
// result as toLocaleString("en-US"). This file must stay free of imports and
// path aliases: scripts/prerender.js loads the data files that use it in Node.
export const formatNumber = (value) => {
  const [whole, fraction] = String(Math.abs(value)).split(".");
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `${value < 0 ? "-" : ""}${grouped}${fraction ? `.${fraction}` : ""}`;
};

export const kes = (amount) => `KES ${formatNumber(amount)}`;
