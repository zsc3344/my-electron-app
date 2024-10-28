import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 8888,
    cors: true, // 允许跨域
    hmr: true, // 开启热更新
  },
  base:'./',
  plugins: [vue()],
})
