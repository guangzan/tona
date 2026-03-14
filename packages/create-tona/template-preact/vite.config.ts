import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import preact from '@preact/preset-vite'
import tailwindcss from '@tailwindcss/vite'
import tona from 'tona-vite'
import { defineConfig } from 'vite-plus'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig(({ mode }) => ({
  define: {
    'process.env.NODE_ENV': JSON.stringify(
      mode === 'production' ? 'production' : 'development',
    ),
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
    dedupe: ['preact', 'preact/hooks', 'preact/compat'],
  },
  plugins: [preact(), tona(), tailwindcss()],
  server: {
    open: true,
    port: 8081,
  },
  build: {
    copyPublicDir: false,
    cssCodeSplit: false,
    emptyOutDir: true,
    lib: {
      formats: ['iife'],
      entry: resolve(__dirname, 'src/main.ts'),
      name: 'theme',
      fileName: () => 'theme.js',
    },
    outDir: './dist',
    rollupOptions: {
      output: {
        assetFileNames: 'theme.[ext]',
      },
    },
  },
}))
