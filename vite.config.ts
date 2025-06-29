import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./src', import.meta.url)),
    }
  },
  
  build: {
    outDir: 'svelte-dist', // 自定义输出目录
    assetsDir: 'assets',   // 静态资源存放目录
    emptyOutDir: true,     // 构建前清空输出目录
    
    // 资源处理配置
    assetsInlineLimit: 4096, // 4KB以下的资源内联为base64
    cssCodeSplit: true,     // 启用CSS代码分割
    cssTarget: 'chrome80',  // 针对现代浏览器优化
    
    // 源代码映射配置
    sourcemap: process.env.NODE_ENV !== 'production', // 生产环境关闭sourcemap
    minify: 'terser',       // 使用terser进行压缩
    
    // Terser 压缩选项
    terserOptions: {
      compress: {
        drop_console: false,  // 移除所有console.log
        drop_debugger: true, // 移除debugger
        pure_funcs: ['console.info', 'console.debug'] // 移除特定console方法
      },
      format: {
        comments: false // 移除所有注释
      }
    },
    
    // Rollup 配置
    rollupOptions: {
      output: {
        // 代码分割配置
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // 将node_modules中的依赖分块
            return id.toString().split('node_modules/')[1].split('/')[0];
          }
        },
        // 文件命名规则
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    },
    
    // 构建报告
    reportCompressedSize: true, // 显示gzip压缩后的大小
    chunkSizeWarningLimit: 1000 // 块大小警告阈值(KB)
  },
  
  server: {
    host: '0.0.0.0',  // 允许局域网访问
    port: 5173,        // 开发服务器端口
    open: true,        // 自动打开浏览器（可选）
    cors: true,        // 默认启用 CORS（可选）
    
    proxy: {
      '/svelte-api/api': {
        target: 'https://api.xulai.fun',
        changeOrigin: true,    // 修改请求头中的 Origin
        secure: false,         // 如果目标服务器使用 HTTPS 但证书不受信任，需要设置为 false
        ws: false,              // 代理 WebSockets
        rewrite: (path) => path.replace(/^\/svelte-api\/api/, ''),
        
        // 可选：添加请求头
        headers: {
          // 'X-Forwarded-For': 'xxx' // 可以添加自定义请求头
        }
      },
    }
  },
  
  // 预览服务器配置
  preview: {
    port: 4173,
    open: true,
    cors: true,
    headers: {
      'Cache-Control': 'public, max-age=600'
    }
  }
})
