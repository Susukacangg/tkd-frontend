import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: {
      key: './tkd-fe-privateKey.key',
      cert: './tkd-fe.crt',
    }
  },
  plugins: [react()],
})
