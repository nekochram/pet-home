import { createApp } from "vue";
import 'lib-flexible/flexible'; // 移动端适配
import "@/assets/icons/iconfont.css";
import "@/assets/style/reset.css";
import "@/assets/style/custom.less";
import 'vant/es/toast/style';
import 'vant/es/dialog/style';
import 'vant/es/notify/style';
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Toast } from 'vant';

createApp(App).use(router).use(store).use(Toast).mount("#app");
