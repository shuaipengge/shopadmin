import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 导入 API请求接口
import api from "./api";
// 导入 消息提示
import message from "./utils/Prompt";
// 导入ElementUI fix CND导入
// import ElementUI from "element-ui";
// import "element-ui/lib/theme-chalk/index.css";
// 初始化css
import "./assets/css/initialize.css";
// 导入树形表格
import TreeTable from "vue-table-with-tree-grid";

// 导入富文本编辑器
// import VueQuillEditor from "vue-quill-editor";
// 导入富文本样式

// 绑定至原型
Vue.prototype.$api = api;
Vue.prototype.$msg = message;

Vue.config.productionTip = false;

Vue.component("tree-table", TreeTable);

// Vue.use(ElementUI);
// // 注册富文本
// Vue.use(VueQuillEditor);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
