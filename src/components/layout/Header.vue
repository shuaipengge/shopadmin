<template>
  <!-- 头部布局 -->
  <div class="header">
    <div class="h-logo">
      <img src="~@/assets/logo.png" alt="logo" />
      <span>Shop电商后台管理系统</span>
    </div>
    <div class="lgoin">
      <a @click="fullscreen">
        <i class="el-icon-rank"></i>
      </a>
      <el-badge :value="3" class="item">
        <i class="el-icon-message-solid"></i>
      </el-badge>
      <div>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <el-avatar
              :size="45"
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            ></el-avatar>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="home">首页</el-dropdown-item>
            <el-dropdown-item command="me">个人中心</el-dropdown-item>
            <el-dropdown-item divided command="out">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import screenfull from "screenfull";

export default {
  name: "Header",
  methods: {
    fullscreen() {
      // 全屏切换
      screenfull.toggle();
    },
    handleCommand(command) {
      console.log(command);
      switch (command) {
        case "home":
          this.$router.push("/home");
          break;
        case "me":
          this.$msg.message("个人中心", "中心", 1500, true);
          break;
        case "out":
          this.$store.dispatch("logout");
          this.$router.push("/login");
          break;
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "~@/styles/header.less";
</style>
