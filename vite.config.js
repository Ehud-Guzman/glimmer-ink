import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
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
              "vendor-motion": ["framer-motion"],
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
