/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { config } from "@repo/vite-config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: {}, // needed for the floater for the joyride
  },
})
