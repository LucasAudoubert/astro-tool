import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  root: "./", // Force la racine au répertoire courant
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    fs: {
      strict: true,
      allow: ["."], // Autorise uniquement le dossier actuel
    },
    // Proxy /api/* to the Node proxy server (port 5174)
    proxy: {
      "/api": {
        target: "http://localhost:5174",
        changeOrigin: true,
      },
    },
  },
  build: {
    // Make sure no secret ever leaks to the client bundle.
    // Anything in .env that isn't VITE_* is excluded by Vite already.
    sourcemap: false,
  },
});