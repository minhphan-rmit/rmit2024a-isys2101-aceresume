import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({

  plugins: [react()],
  server: {
    port: 8081 // Specify your desired port here
  },
  preview: {
    port: 8081 // Specify your desired port here
  }
})
