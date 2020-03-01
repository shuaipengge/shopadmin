<template>
  <!-- 侧边栏菜单 -->
  <el-menu
    background-color="#304156"
    text-color="#fff"
    active-text-color="#409bff"
  >
    <!-- 一级菜单 -->
    <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id">
      <!-- 一级菜单的模板区域 -->
      <template slot="title">
        <!-- 图标 -->
        <i :class="iconsObj[item.id]"></i>
        <!-- 文本 -->
        <span>{{ item.authName }}</span>
      </template>

      <!-- 二级菜单 -->
      <el-menu-item
        :index="subItem.id + ''"
        v-for="subItem in item.children"
        :key="subItem.id"
      >
        <!-- 二级菜单的模板区域 -->
        <template slot="title">
          <!-- 图标 -->
          <i class="el-icon-menu"></i>
          <!-- 文本 -->
          <span>{{ subItem.authName }}</span>
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
  data() {
    return {
      // 菜单数据
      menulist: [],
      // 菜单图标
      iconsObj: {
        "125": "el-icon-user-solid",
        "103": "el-icon-s-grid",
        "101": "el-icon-s-goods",
        "102": "el-icon-s-claim",
        "145": "el-icon-s-marketing"
      }
    };
  },
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
          this.menulist = res.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="less" scoped>
@import "../styles/aside.less";
</style>
