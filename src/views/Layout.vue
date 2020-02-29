<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header height="70px">
      <Header />
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <Aside />
      </el-aside>
      <!-- 右边主体内容 -->
      <el-main>
        <Main />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Main from "@/views/Home";
import Aside from "@/components/Aside";
import Header from "@/components/Header";

export default {
  name: "Layout",
  components: {
    Header,
    Aside,
    Main
  }
};
</script>

<style lang="less" scoped>
@import "../styles/layout.less";
</style>
