import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom", "react-router-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
          "vendor-motion": ["framer-motion"],
          "vendor-icons": ["react-icons"],
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
});
