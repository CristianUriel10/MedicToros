import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { uploadApiPlugin } from './server/vite-upload-api-plugin.js'

export default defineConfig({
  plugins: [react(), tailwindcss(), uploadApiPlugin()],
})
