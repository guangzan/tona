import { defineConfig } from 'vite-plus'

export default defineConfig({
  pack: {
    platform: 'browser',
    entry: ['./src/index.ts'],
    format: ['esm'],
    dts: true,
    clean: true,
  },
})
