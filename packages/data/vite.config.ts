import { defineConfig } from 'vite-plus'

export default defineConfig({
  pack: {
    platform: 'node',
    entry: ['./src/index.ts'],
    format: ['esm'],
    clean: true,
  },
})
