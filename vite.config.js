import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import { SEASONS, resolveSeason } from "./src/data/seasons.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Every page is prerendered, so the festive theme cannot be decided at build
// time. This inlines a tiny script into index.html that checks the visitor's
// date before first paint and sets data-season-* attributes on <html>; the CSS
// in src/season.css and the components in src/components/Season key off them.
// The date logic is the real resolveSeason() from src/data/seasons.js, so the
// page and the React side can never disagree.
const seasonBoot = () => {
  const script = `(function () {
      try {
        var d = document.documentElement;
        var read = function (store, key) { try { return window[store].getItem(key); } catch (e) { return null; } };
        var q = new URLSearchParams(location.search);
        var asked = q.get("season");
        if (asked) {
          try { sessionStorage.setItem("season-preview", asked + (q.get("phase") ? ":" + q.get("phase") : "")); } catch (e) {}
        }
        var season = (${resolveSeason.toString()})(${JSON.stringify(SEASONS)}, new Date(), read("sessionStorage", "season-preview"));
        if (!season) return;
        d.setAttribute("data-season-name", season.name);
        d.setAttribute("data-season-phase", season.phase);
        d.setAttribute("data-season-year", String(season.year));
        if (read("localStorage", "season-off") !== "1") d.setAttribute("data-season", season.name);
        if (read("localStorage", "season-bar") === season.key) d.setAttribute("data-season-bar", "closed");
        if (read("localStorage", "season-snow") === "off") d.setAttribute("data-season-snow", "off");
      } catch (e) {}
    })();`;

  return {
    name: "season-boot",
    transformIndexHtml: (html) => html.replace("/*__SEASON_BOOT__*/", () => script),
  };
};

// The page is fully prerendered, so the JavaScript only adds interactivity. Marking
// the entry script and its preload as low priority lets the browser spend a slow
// connection on the stylesheet, fonts and hero images first, while the script still
// starts downloading straight away. (Loading it *later* was measured too and made the
// page interactive about 0.7 s slower, so it is deliberately not done.)
const lowPriorityEntry = () => ({
  name: "low-priority-entry",
  apply: "build",
  transformIndexHtml: {
    order: "post",
    handler: (html) =>
      html
        .replace(/<script type="module" crossorigin src=/g, '<script type="module" crossorigin fetchpriority="low" src=')
        .replace(/<link rel="modulepreload" crossorigin href=/g, '<link rel="modulepreload" crossorigin fetchpriority="low" href='),
  },
});

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), seasonBoot(), lowPriorityEntry()],
  define: {
    // The year the static HTML was built in. The footer renders this on the
    // server and during hydration, then switches to the visitor's real year, so
    // the copyright line can never cause a hydration mismatch after New Year.
    "import.meta.env.VITE_BUILD_YEAR": JSON.stringify(String(new Date().getFullYear())),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    // The client build copies public/ into dist/. The SSR build must not, or
    // dist-ssr ends up with a second pointless copy of every image and font.
    copyPublicDir: !isSsrBuild,
    rollupOptions: {
      output: {
        manualChunks: isSsrBuild
          ? undefined
          : {
              "vendor-react": ["react", "react-dom", "react-router-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
              "vendor-email": ["@emailjs/browser"],
            },
      },
    },
  },
  server: {
    host: "localhost", // ensures WS connects to localhost
    port: 5173,        // same as default, but explicit
    strictPort: true,  // fail if port is taken
    open: true,        // opens browser automatically
    hmr: {
      protocol: "ws",  // force WebSocket
      host: "localhost",
      port: 5173,
    },
  },
}));
