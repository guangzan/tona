import { defineConfig } from 'vite-plus'

export default defineConfig({
  pack: {
    entry: ['src/index.ts'],
    dts: true,
    format: ['esm'],
    clean: true,
    target: 'es2020',
    shims: true,
    deps: {
      neverBundle: ['jquery'],
    },
  },
})
