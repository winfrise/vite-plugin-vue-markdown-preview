import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Markdown from 'vite-plugin-vue-markdown'
import MarkdownPreview from './src/index'
import path from 'path'

export default defineConfig({
  plugins: [
    Markdown(),
    MarkdownPreview(),
    vue({
      include: [/\.vue$/, /\.md$/]
    })
  ],
  resolve: {
    // 设置文件快捷路径
    alias: {
      'vite-plugin-vue-markdown-preview': path.join(__dirname, './src')
    }
  },
})
