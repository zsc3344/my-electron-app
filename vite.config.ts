import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import electron from "vite-plugin-electron"
import electronRenderer from "vite-plugin-electron-renderer"
import polyfillExports from "vite-plugin-electron-renderer" 

function resolve(dir: string) {
  return path.join(__dirname, dir)
}

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 8888,
    cors: true, // 允许跨域
    hmr: true, // 开启热更新
  },
  base:'./',
  plugins: [
    vue(),
    electron([{
      entry: "main.js", // 主进程文件
    },
    {
      entry: 'preload.js'
    }
  ]),
    electronRenderer(),
    polyfillExports()
  ],
  resolve:{
    alias:{
      '@': resolve('src'),
      '@components':'/src/components/',
      '@assets':'/src/assets/',
    }
  }
})
