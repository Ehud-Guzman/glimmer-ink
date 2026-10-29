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

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), seasonBoot()],
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
