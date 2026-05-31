import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig(() => {
  const nestjsTarget = process.env.VITE_NESTJS_TARGET || 'http://localhost:3000'
  const springbootTarget = process.env.VITE_SPRINGBOOT_TARGET || 'http://localhost:8080'

  return {
    plugins: [vue(), AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: ['vue', 'pinia']
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    })],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      host: '0.0.0.0',
      port: 5174,
      proxy: {
        '/api': {
          target: nestjsTarget,
          changeOrigin: true,
          rewrite: (path) => path.replace('/api', '')
        },
        '/img': {
          target: springbootTarget,
          changeOrigin: true
        }
      }
    }
  }
})
