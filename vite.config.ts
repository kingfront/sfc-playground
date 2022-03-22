import fs from 'fs'
import path from 'path'
import { defineConfig, Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue(), copyVuePlugin()],
  optimizeDeps: {
    exclude: ['@vue/repl'],
  },
})

function copyVuePlugin(): Plugin {
  return {
    name: 'copy-vue',
    generateBundle() {
      const filePath = path.resolve(__dirname, '../vue/dist/vue.runtime.esm-browser.js')
      if (!fs.existsSync(filePath)) {
        throw new Error(`vue.runtime.esm-browser.js not built. ` + `Run "nr build vue -f esm-browser" first.`)
      }
      this.emitFile({
        type: 'asset',
        fileName: 'vue.runtime.esm-browser.js',
        source: fs.readFileSync(filePath, 'utf-8'),
      })
    },
  }
}
