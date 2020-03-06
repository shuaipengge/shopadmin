module.exports = {
  chainWebpack: config => {
    // 发布模式
    config.when(process.env.NODE_ENV === "production", config => {
      config
        .entry("app")
        .clear()
        .add("./src/main-prod.js");

      // 发布模式 打包时忽略下面的插件
      config.set("externals", {
        vue: "Vue",
        "vue-router": "VueRouter",
        axios: "axios",
        lodash: "_",
        echarts: "echarts",
        nprogress: "NProgress",
        "vue-quill-editor": "VueQuillEditor"
      });

      // 新增一个参数标记发布模式
      config.plugin("html").tap(args => {
        args[0].isProd = true;
        return args;
      });
    });

    // 开发模式
    config.when(process.env.NODE_ENV === "development", config => {
      config
        .entry("app")
        .clear()
        .add("./src/main-dev.js");

      // 新增一个参数标记开发模式
      config.plugin("html").tap(args => {
        args[0].isProd = false;
        return args;
      });
    });
  }
};
