import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `
          @import "@/assets/styles/mixin.less";
        `
      }
    }
  },
  server: {
    host: '0.0.0.0',
    proxy: {
      '/mcp': {
        target: 'https://openapi.vmall.com',
        changeOrigin: true
      },
      '/cmscdn': {
        target: 'https://res.vmallres.com',
        changeOrigin: true
      },
      '/uomcdn': {
        target: 'https://res6.vmallres.com/pimages',
        changeOrigin: true
      }
    }
  },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
