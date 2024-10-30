import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitest/config'
import cleanup from 'rollup-plugin-cleanup'

const __dirname = (path: string) => fileURLToPath(new URL(path, import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    cleanup({
      extensions: ['js', 'ts'],
    }),
  ],
  resolve: {
    alias: {
      '@': __dirname('./src'),
    },
  },
  test: {
    dir: __dirname('./test'),
    typecheck: {
      enabled: true,
    },
  },
  build: {
    lib: {
      entry: {
        'index': __dirname('./src/index.ts'),
      },
      name: 'RewlKit',
    },
    outDir: 'lib',
    sourcemap: true,
    minify: false,
  },
})
