import { defineConfig } from 'vite-plus'

export default defineConfig({
  pack: {
    platform: 'browser',
    entry: ['./src/index.tsx'],
    format: ['esm'],
    dts: true,
    clean: true,
    deps: {
      neverBundle: ['preact'],
    },
  },
})
