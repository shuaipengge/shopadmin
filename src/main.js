import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 导入 API请求接口
import api from "./api";
// 导入 消息提示
import message from "./utils/Prompt";
// 导入ElementUI
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

// 绑定至原型
Vue.prototype.$api = api;
Vue.prototype.$msg = message;

Vue.config.productionTip = false;

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
