<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header height="70px">
      <Header />
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <Aside @child-isCollapse="parentEvent" />
      </el-aside>
      <!-- 右边主体内容 -->
      <el-main>
        <!-- Tags -->
        <HeaderTags />
        <!-- Main -->
        <Main />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Main from "@/views/Home";
import HeaderTags from "@/components/HeaderTags";
import Aside from "@/components/Aside";
import Header from "@/components/Header";

export default {
  name: "Layout",
  data() {
    return {
      isCollapse: false
    };
  },
  components: {
    Header,
    Aside,
    Main,
    HeaderTags
  },
  methods: {
    parentEvent(data) {
      // 接收子组件的值 设置侧边栏宽度
      this.isCollapse = data;
    }
  }
};
</script>

<style lang="less" scoped>
@import "../styles/layout.less";
</style>
