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
    }
  ]
};
