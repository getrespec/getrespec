import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// In dev, API and module files come from the real server: run `node scripts/serve.mjs` too.
export default defineConfig({
  plugins: [react()],
  build: { outDir: "dist", emptyOutDir: true, sourcemap: false },
  server: {
    port: 5173,
    proxy: {
      "/api": { target: "http://127.0.0.1:4747", changeOrigin: true },
      "/files": { target: "http://127.0.0.1:4747", changeOrigin: true },
    },
  },
});
