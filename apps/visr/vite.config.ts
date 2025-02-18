/// <reference types="vitest" />
import { config } from "@repo/vite-config";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";

const baseUrlCopy = "http://127.0.0.1:8000";

export default defineConfig({
  ...config,
  // NOTE - here you can override the shared config
  plugins: [react()],
  base: process.env.VITE_BASE_URL || "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@utils": path.resolve(__dirname, "./src/utils"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./setupTests.ts"],
  },
  server: {
    proxy: {
      "/api": {
        target: baseUrlCopy,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/ws": {
        target: "ws://localhost:8000/ws",
        changeOrigin: true,
        rewriteWsOrigin: true,
        ws: true, // Enable WebSocket proxying
        rewrite: (path) => path.replace(/^\/ws/, ""),
      },
    },
  },
});
