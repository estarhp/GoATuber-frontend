import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'
export default defineConfig({
  plugins: [react(),UnoCSS(),],
  resolve: {
    alias: {
      '@': '/src' // 将 '@' 设置为指向 'src' 目录的别名
    }
  }
})
