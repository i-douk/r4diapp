import { fileURLToPath, URL } from 'node:url'
import VueRouter from 'unplugin-vue-router/vite'
import autoprefixer from 'autoprefixer'
import tailwind from 'tailwindcss'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  plugins: [
    VueRouter(),
    vue(
      {
        template: {
          compilerOptions: {
            isCustomElement : element => element.startsWith('iconify-icon')
          }
        }
      }
    ),
  ],
  server :{
     proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
     }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
