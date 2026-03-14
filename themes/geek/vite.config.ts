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
    copyPublicDir: false,
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
      fileName: () => 'geek.js',
    },
  },
})
