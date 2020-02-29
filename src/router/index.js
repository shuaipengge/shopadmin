import Vue from "vue";
import VueRouter from "vue-router";
import UsersRouter from "./users";
import store from "../store";

const whiteList = ["/login"]; // 不重定向白名单
Vue.use(VueRouter);

const routes = [
  UsersRouter,
  {
    path: "/",
    name: "Layout",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/Layout.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () => import(/* webpackChunkName: "about" */ "@/views/Login.vue")
  },
  {
    path: "*",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/components/Notfind.vue")
  }
];

const router = new VueRouter({
  routes
});

// 路由守卫
router.beforeEach((to, from, next) => {
  if (store.getters.isLogin) {
    if (to.path === "/login") {
      next({ path: "/" });
    } else {
      next();
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next({
        path: "/login", // 去登录
        query: { redirect: to.path } // 登录成功后回调 跳转
      });
    }
  }
});

export default router;
