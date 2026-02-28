import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import tona from 'tona-vite'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  plugins: [tona()],
})
