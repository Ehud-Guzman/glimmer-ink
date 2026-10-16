// The one place that decides what a page's canonical URL looks like.
//
// Every route is prerendered to <route>/index.html, and Netlify answers the
// bare form (/about) with a 301 to the trailing-slash form (/about/). A
// canonical, sitemap entry or schema URL that points at the redirecting form
// makes Google request it, get redirected away from the URL the page says is
// canonical, and refuse to index it ("Page with redirect" in Search Console).
// So every page URL we publish uses the trailing-slash form, which serves 200.
// Pure data only - imported by Node (prerender) as well as the browser.
export const SITE_URL = "https://glimmerink.co.ke";

export const pageUrl = (path = "/") => {
  const clean = String(path).split(/[?#]/)[0].replace(/\/+$/, "");
  return clean === "" ? `${SITE_URL}/` : `${SITE_URL}${clean.startsWith("/") ? clean : `/${clean}`}/`;
};
