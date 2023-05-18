import { defineConfig } from 'vite'
const path = require('path')
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import viteCompression from 'vite-plugin-compression'
// import importToCDN, { autoComplete } from 'vite-plugin-cdn-import'
import externalGlobals from "rollup-plugin-external-globals";
import analyze from 'rollup-plugin-analyzer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz'
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),

    // importToCDN({
    //   modules: [{
    //     name: 'echarts',
    //     var: 'echarts',
    //     path: `dist/echarts.min.js`
    //   },
    //   autoComplete('vue'),
    //   autoComplete('axios'),
    //   autoComplete('xlsx')
    //   ],
    // }),
  ],
  resolve: {
    alias: {
      '@': path.resolve('./src')
    }
  },
  build: {
    rollupOptions: {
      external: ["axios", "echarts", "xlsx"],
      plugins: [
        analyze({ summaryOnly: true }),
        externalGlobals({
          axios: "axios",
          echarts: "echarts",
          xlsx: "XLSX",
        })
      ],
    }
  }
  // rollupInputOptions: {
  //   external: ['vue']
  // }
})
