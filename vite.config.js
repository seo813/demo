import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from 'path'


export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
      symbolId: "icon-[dir]-[name]",
    }),
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  server: {
    // hmr: true,
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // 更新日期：2022年06月09日
          // 下面这三行css代码打包的配置可以随你移除或者保留~移除后会自动生成一个css，和下面的示例图会有区别。
          if (id.includes("assets/styles/main.css")) {
            return "tailwindcss";
          }
          if (id.includes("element-plus/theme-chalk/")) {
            // 当然也可以优化下这个判断，不过目前这样写足矣了。
            return "element-plus";
          }
        },
      },
    },
  },
});


// const { defineConfig } = require("@vue/cli-service");



// module.exports = defineConfig({
//   transpileDependencies: true,
//   devServer: {
//     proxy: {
//       "/api": {
//         target: "http://localhost:8080",
//         changeOrigin: true,
//       },
//     },
//   },

// });