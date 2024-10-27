import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitest/config'

const __dirname = (path: string) => fileURLToPath(new URL(path, import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': __dirname('./src'),
    },
  },
  test: {
    dir: __dirname('./test'),
    typecheck: {
      enabled: true
    }
  },
  build: {
    lib: {
      entry: {
        'index': __dirname('./src/index.ts')
      },
      name: 'RewlKit',
    },
    outDir: 'lib',
    minify: false,
  },
})
