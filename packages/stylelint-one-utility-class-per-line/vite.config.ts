import { defineConfig } from 'vite-plus'

export default defineConfig({
  pack: {
    platform: 'node',
    entry: ['./src/index.mjs'],
    format: ['esm'],
    dts: true,
    clean: true,
  },
})
