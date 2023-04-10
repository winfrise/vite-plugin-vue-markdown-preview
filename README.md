# Vite Plugin Vue Markdown Preview

该插件依赖于 ```vite-plugin-vue-markdown```、  ```highlight.js```,请先安装```vite-plugin-vue-markdown```插件

```
npm i vite-plugin-vue-markdown -D
```


vite.config.js 配置

```JS
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Markdown from 'vite-plugin-vue-markdown'
import MarkdownPreview from './vite-plugin/index'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Markdown(),
    MarkdownPreview(),
    vue({
      include: [/\.vue$ /, /\.md$/]
    })
  ]
})
```