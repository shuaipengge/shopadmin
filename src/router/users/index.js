export default {
  path: "/",
  redirect: "/home",
  component: () => import("@/views/Layout"),
  children: [
    {
      path: "/home",
      component: () => import("@/views/Home")
    },
    {
      path: "/users",
      component: () => import("@/views/user/Users")
    },
    {
      path: "/rights",
      component: () => import("@/views/power/Rights")
    },
    {
      path: "/roles",
      component: () => import("@/views/power/Roles")
    },
    {
      path: "/categories",
      component: () => import("@/views/goods/Cate")
    },
    {
      path: "/params",
      component: () => import("@/views/goods/Params")
    },
    {
      path: "/goods",
      component: () => import("@/views/goods/List")
    },
    {
      path: "/goods_add",
      component: () => import("@/views/goods/Add")
    },
    {
      path: "/orders",
      component: () => import("@/views/order/Orders")
    },
    {
      path: "/reports",
      component: () => import("@/views/report/Report")
    }
  ]
};
