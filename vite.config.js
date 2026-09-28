import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves this project from https://<user>.github.io/paradise-nursery/,
  // so all built asset URLs must be prefixed with the repo name.
  base: process.env.VITE_BASE_PATH ?? '/paradise-nursery/',
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
  },
})
