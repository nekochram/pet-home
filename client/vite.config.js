import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "@vant/auto-import-resolver";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        avascriptEnabled: true,
        additionalData:  `@import "${resolve(__dirname, 'src/assets/style/custom.less')}";`
      },
    },
  },
  // 配置根路径
  resolve: {
    // ↓路径别名，主要是这部分
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://192.168.4.33:4000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/socket.io": {
        target: "ws://192.168.4.33:3030",
        ws: true,
      },
    },
  },
});
