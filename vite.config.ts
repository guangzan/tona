import { defineConfig } from 'vite-plus'

export default defineConfig({
  test: {
    environment: 'happy-dom',
  },
  fmt: {
    singleQuote: true,
    semi: false,
    tabWidth: 2,
    printWidth: 80,
    trailingComma: 'all',
    arrowParens: 'always',
    bracketSpacing: true,
  },
  lint: {
    rules: {
      'no-explicit-any': 'off',
      'no-non-null-assertion': 'off',
      'no-static-element-interactions': 'off',
      'use-key-with-click-events': 'off',
      'no-svg-without-title': 'off',
      'no-banned-types': 'off',
    },
  },
})
