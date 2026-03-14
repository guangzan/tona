import { defineConfig } from 'vite-plus'

export default defineConfig({
  pack: {
    platform: 'node',
    entry: ['src/index.ts'],
    target: 'node20',
    minify: true,
    fixedExtension: false,
    deps: {
      onlyBundle: ['picocolors', 'sisteransi', '@clack/core', '@clack/prompts'],
    },
  },
})
