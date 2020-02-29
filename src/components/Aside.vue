<template>
  <!-- 侧边栏菜单 -->
  <el-menu
    background-color="#304156"
    text-color="#fff"
    active-text-color="#1f2f3d"
  >
    <!-- 一级菜单 -->
    <el-submenu index="1">
      <!-- 一级菜单的模板区域 -->
      <template slot="title">
        <!-- 图标 -->
        <i class="el-icon-location"></i>
        <!-- 文本 -->
        <span>导航一</span>
      </template>

      <!-- 二级菜单 -->
      <el-menu-item index="1-4-1">
        <!-- 二级菜单的模板区域 -->
        <template slot="title">
          <!-- 图标 -->
          <i class="el-icon-location"></i>
          <!-- 文本 -->
          <span>导航一</span>
        </template>
      </el-menu-item>

      <!-- <el-submenu index="1-4">
        <template slot="title">选项4</template>
        <el-menu-item index="1-4-1">选项1</el-menu-item>
      </el-submenu>-->
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "Aside",
  created() {
    this.getMenuList();
  },
  methods: {
    getMenuList() {
      this.$api.System.getMenuList()
        .then(result => {
          const { data: res } = result;
          console.log(res);
          if (res.meta.status !== 200) {
            return this.$msg.error("菜单获取失败", "", 1500);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
