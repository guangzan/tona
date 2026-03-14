import tona from 'tona-vite'
import { defineConfig } from 'vite-plus'

export default defineConfig({
  plugins: [tona()],
  css: {
    preprocessorOptions: {
      scss: {
        charset: false,
      },
    },
  },
  server: {
    open: true,
    port: 8080,
  },
  build: {
    minify: 'terser',
    cssCodeSplit: true,
    emptyOutDir: true,
    terserOptions: {
      format: {
        comments: false,
      },
    },
    lib: {
      formats: ['iife'],
      entry: './src/main.js',
      name: 'theme',
      fileName: () => 'reacg.js',
    },
  },
})
