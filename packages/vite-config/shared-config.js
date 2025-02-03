/// <reference types="vitest" />
import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export const config = defineConfig({
  plugins: [react()],
  test:{
    coverage:{
      provider: 'v8'
    }
  }
})
