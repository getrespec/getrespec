import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// In dev, API and module files come from the real server: run `node scripts/serve.mjs` too.
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    emptyOutDir: true, // vite build clears dist/ first
    sourcemap: false,
    // Fixed file names: a rebuild overwrites app.js and app.css instead of adding new hashed files,
    // so dist/ never collects stale builds (also when files are copied in rather than built in place).
    // The server sends these with "no-cache", so browsers still pick up a new build.
    rollupOptions: {
      output: {
        entryFileNames: "assets/app.js",
        chunkFileNames: "assets/[name].js",
        assetFileNames: (info) => (info.names?.some((n) => n.endsWith(".css")) ? "assets/app.css" : "assets/[name][extname]"),
      },
    },
  },
  server: {
    port: 5173,
    proxy: {
      "/api": { target: "http://127.0.0.1:4747", changeOrigin: true },
      "/files": { target: "http://127.0.0.1:4747", changeOrigin: true },
    },
  },
});
