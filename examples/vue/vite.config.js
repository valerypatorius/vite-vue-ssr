const { defineConfig } = require('vite')
const viteSSR = require('vite-vue3-ssr/plugin')
const vue = require('@vitejs/plugin-vue')
const api = require('../node-server/api')

module.exports = defineConfig({
  server: {
    fs: {
      // The API logic is in outside of the project
      strict: false,
    },
  },
  ssr: { format: 'cjs' },
  plugins: [
    viteSSR(),
    vue(),
    {
      // Mock API during development
      configureServer({ middlewares }) {
        api.forEach(({ route, handler }) => middlewares.use(route, handler))
      },
    },
  ],
})
