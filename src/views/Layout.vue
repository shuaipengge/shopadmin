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
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import HeaderTags from "@/components/layout/HeaderTags";
import Aside from "@/components/layout/Aside";
import Header from "@/components/layout/Header";

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
@import "~@/styles/layout.less";
</style>
