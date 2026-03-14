import { defineConfig } from 'vite-plus'

export default defineConfig({
  pack: {
    platform: 'browser',
    entry: ['./src/index.ts'],
    format: ['iife'],
    minify: true,
  },
})
