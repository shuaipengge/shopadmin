export default {
  path: "/",
  redirect: "/home",
  component: () => import("@/views/Layout"),
  children: [
    {
      path: "/home",
      component: () => import("@/views/Home")
    }
  ]
};
