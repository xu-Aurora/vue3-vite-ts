import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import { resolve } from 'path'

// https://cn.vitejs.dev/guide/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      // 可以自定义文件生成的位置，默认是根目录下，使用ts的建议放src目录下
      dts: 'src/auto-imports.d.ts',
      // 使用vue、vue-router、vueuse时可以不用import引入api,直接使用即可
      imports: ['vue', 'vue-router', '@vueuse/core']
    })
  ],
  base: './', // 配置打包路径
  resolve: {
    // https://juejin.cn/post/7054317318343491615#heading-15
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    alias: {
      '@': resolve(__dirname, 'src') // 设置 `@` 指向 `src` 目录
    }
  },
  // 将全局样式文件全局注入到项目中
  css: {
    preprocessorOptions: {
      less: {
        additionalData: '@import "@/assets/css/main.less";'
      }
    }
  },
  
  build:{
    brotliSize: false,    // 启用/禁用 brotli 压缩大小报告
    chunkSizeWarningLimit: 2000,  // 消除打包大小超过500kb警告
    terserOptions: {    // 生产环境去除 console debugger
      compress: {
        drop_console: true,
        pure_funcs: ['console.log', 'console.info'],
        drop_debugger: true,
      }
    },
    assetsDir: 'static/assets',   // 指定生成静态资源的存放路径
    rollupOptions: {    // 静态资源打包到dist下的不同目录
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
      },
    }
  },
  server: {
    host: true, // host设置为true才可以使用network的形式，以ip访问项目
    port: 4000, // 设置服务启动端口号
    open: true, // 设置服务启动时是否自动打开浏览器
    cors: true, // 允许跨域

    // 设置代理
    proxy: {
      '/api': {
        target: '',
        changeOrigin: true,   // 允许跨域
        secure: false
      }
    }
  }
})
