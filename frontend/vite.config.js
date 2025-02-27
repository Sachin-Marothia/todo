import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [preact()],
  server: {
    host: true, // This makes the server accessible externally
    port: 5173, // Optional, set the port explicitly
  },
})
