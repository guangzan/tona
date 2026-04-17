import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import preact from '@preact/preset-vite'
import tailwindcss from '@tailwindcss/vite'
import tona from 'tona-vite'
import { defineConfig } from 'vite-plus'
import { analyzer } from 'vite-bundle-analyzer'
import svgr from 'vite-plugin-svgr'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
    dedupe: ['preact', 'preact/hooks', 'preact/compat'],
  },
  plugins: [
    tona({
      themeName: 'shadcn',
    }),
    preact(),
    tailwindcss(),
    svgr(),
    analyzer({
      enabled: false,
    }),
  ],
})
