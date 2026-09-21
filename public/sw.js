// GlimmerInk Creations service worker.
// The cache version below is stamped with the build hash by scripts/prerender.js,
// so a deploy can never leave returning visitors pinned to a stale cache.
const CACHE_VERSION = "__BUILD_VERSION__";
const CACHE_NAME = "glimmerink-cache-" + CACHE_VERSION;

const PRECACHE_URLS = [
  "/",
  "/index.html",
  "/favicon.svg",
  "/favicon_io/android-chrome-192x192.png",
  "/favicon_io/android-chrome-512x512.png",
  "/images/Glimmer-OG.jpg",
  "/manifest.webmanifest",
];

// Network first: navigations plus crawl/entry files that must never go stale.
const NETWORK_FIRST = [
  /\/$/,
  /\.html$/,
  /\/sitemap\.xml$/,
  /\/robots\.txt$/,
  /\/manifest\.webmanifest$/,
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .catch(() => undefined)
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
      )
      .then(() => self.clients.claim())
  );
});

const isHttp = (url) => url.protocol === "http:" || url.protocol === "https:";
const isSameOrigin = (url) => url.origin === self.location.origin;
const isAnalytics = (url) =>
  url.hostname.includes("google-analytics.com") ||
  url.hostname.includes("googletagmanager.com");
const isNetworkFirst = (url) => NETWORK_FIRST.some((pattern) => pattern.test(url.pathname));

const putSafely = (request, response) => {
  if (!response || !response.ok || response.type === "opaque") return;
  const clone = response.clone();
  caches
    .open(CACHE_NAME)
    .then((cache) => cache.put(request, clone))
    .catch(() => undefined);
};

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") return;

  const url = new URL(request.url);

  if (!isHttp(url) || !isSameOrigin(url) || isAnalytics(url)) return;

  // Navigations and crawl files: network first, cache only as an offline fallback.
  if (request.mode === "navigate" || isNetworkFirst(url)) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          putSafely(request, response);
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          if (cached) return cached;
          return (await caches.match("/index.html")) || Response.error();
        })
    );
    return;
  }

  // Assets: serve the cached copy instantly, refresh it in the background.
  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request)
        .then((response) => {
          putSafely(request, response);
          return response;
        })
        .catch(() => cached);

      return cached || network;
    })
  );
});
