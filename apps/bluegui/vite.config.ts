/// <reference types="vitest" />
import { config } from "@repo/vite-config";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  ...config,
  // NOTE - here you can override the shared config
  plugins: [react()],
  define: {
    global: {}, // needed for the floater for the joyride
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      // "@mui": path.resolve(__dirname, "node_modules/@mui"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://i22-blueapi.diamond.ac.uk",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
