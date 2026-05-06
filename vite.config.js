import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import openSourceHandler from './api/open-source.js'
import portfolioMetaHandler from './api/portfolio-meta.js'

const apiRoutes = {
  '/api/open-source': openSourceHandler,
  '/api/portfolio-meta': portfolioMetaHandler,
}

const createDevRequest = (request) => {
  const url = new URL(request.url || '/', 'http://localhost')

  return {
    method: request.method,
    headers: request.headers,
    query: Object.fromEntries(url.searchParams.entries()),
  }
}

const createDevResponse = (response) => ({
  setHeader: response.setHeader.bind(response),
  status(statusCode) {
    response.statusCode = statusCode
    return this
  },
  send(body) {
    response.end(body)
  },
})

const localApiPlugin = () => ({
  name: 'local-api-functions',
  configureServer(server) {
    Object.entries(apiRoutes).forEach(([route, handler]) => {
      server.middlewares.use(route, async (request, response) => {
        try {
          await handler(createDevRequest(request), createDevResponse(response))
        } catch (error) {
          response.statusCode = 500
          response.setHeader('Content-Type', 'application/json')
          response.end(JSON.stringify({
            error: 'Local API handler failed',
            details: error instanceof Error ? error.message : 'Unknown error',
          }))
        }
      })
    })
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), localApiPlugin()],
  assetsInclude: ['**/*.glb'],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
  },
})
