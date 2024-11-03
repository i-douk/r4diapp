import { fileURLToPath, URL } from 'node:url'
import VueRouter from 'unplugin-vue-router/vite'
import autoprefixer from 'autoprefixer'
import tailwind from 'tailwindcss'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import Components from 'unplugin-vue-components/vite'

// https://vite.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  plugins: [
    Components({ 
      dts: true,
    }),
    AutoImport({ 
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      dirs: ['src/stores'],
      dts: true,
      viteOptimizeDeps: true,
      imports: [ 'vue', VueRouterAutoImports,
        {
          'pinia':['defineStore','storeToRefs' , 'acceptHMRUpdate']
        }
      ]

    }),
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
