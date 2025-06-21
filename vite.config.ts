import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import apiMiddleware from './src/server/api.mjs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // Add our API middleware to the dev server
    {
      name: 'api-middleware',
      configureServer(server) {
        server.middlewares.use(apiMiddleware);
      },
    }
  ],
})