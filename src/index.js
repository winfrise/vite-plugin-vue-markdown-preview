import fs from 'fs'
import path from 'path'
import { genComponentName } from './utils'
export function MarkdownPreview() {
  return {
    name: 'VitePluginVueMarkdownPreview',
    async transform(code, id) {
      if (id.endsWith('.md')) {
        const componentId = path.basename(id, '.md')
        //  在template中 把字符串替换为预览组件
        const componentList = []
        code = code.replace(/:::demo\s+([^:]+)\s+:::/g, (str, p1) => {
          // 生成大驼峰组件名
          const componentName = genComponentName(p1)
          const componentRelativePath = './' + p1 + '.vue'

          // 保存组件信息
          componentList.push({
            name: componentName,
            path: componentRelativePath
          })

          // 读取Demo组件的代码
          const demoAbsolutePath = path.resolve(path.dirname(id), componentRelativePath)
          const sourceCode = encodeURIComponent(fs.readFileSync(demoAbsolutePath, 'utf8'))

          return `
          <CodePreview code="${sourceCode}">
            <${componentName}></${componentName}>
          </CodePreview>`
        })

        // 在script中，引入预览组件 和 替换的组件
        const importDemoComponentStr = componentList.map(item => {
          return `import ${item.name} from '${item.path}'`
        }).join('\n')


        code = code.replace('<script setup>', `
          <script setup>
          import CodePreview from 'vite-plugin-vue-markdown-preview/components/CodePreview.vue'
          ${importDemoComponentStr}
        `)

        return {
          code: code,
          map: null
        }
      }
    },

  }
}
export default MarkdownPreview