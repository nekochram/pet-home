import { createApp } from "vue";
import 'lib-flexible/flexible'; // 移动端适配
import "@/assets/icons/iconfont.css";
import "@/assets/style/reset.css";
import "@/assets/style/custom.less";
import App from "./App.vue";
import router from "./router";
import store from "./store";

createApp(App).use(router).use(store).mount("#app");
