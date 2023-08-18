import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/v1/cryptocurrency/listings/latest': {
        target: 'https://pro-api.coinmarketcap.com',
        changeOrigin: true
      },
      '/v2/cryptocurrency/info': {
        target: 'https://pro-api.coinmarketcap.com',
        changeOrigin: true
      }
    }
  }
})
