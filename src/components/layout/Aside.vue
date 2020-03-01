<template>
  <div>
    <!-- 侧边栏折叠 -->
    <div class="toggle-button">
      <div @click="toggleCollapse">
        <i v-show="!isCollapse" class="el-icon-s-fold"></i>
        <i v-show="isCollapse" class="el-icon-s-unfold"></i>
      </div>
    </div>
    <!-- {{$route.path}} -->
    <!-- 侧边栏菜单 -->
    <el-menu
      background-color="#304156"
      text-color="#fff"
      active-text-color="#409bff"
      unique-opened
      :collapse="isCollapse"
      :collapse-transition="false"
      :default-active="$route.path"
      router
    >
      <!-- 需要判断一级菜单下是否有二级菜单 -->
      <template v-for="item in menulist">
        <template v-if="item.children[0]">
          <el-submenu :index="'/' + item.path" :key="item.id">
            <template slot="title">
              <i :class="iconsObj[item.id]"></i>
              <span slot="title">{{ item.authName }}</span>
            </template>
            <template v-for="subItem in item.children">
              <!-- 有三级导航就渲染 -->
              <el-submenu
                v-if="subItem.children[0]"
                :index="'/' + subItem.path"
                :key="subItem.id"
              >
                <!-- 包含三级的二级导航 -->
                <template slot="title">
                  <i :class="iconsObj[item.id]"></i>
                  <span slot="title">{{ subItem.authName }}</span>
                </template>
                <!-- 三级菜单渲染 -->
                <el-menu-item
                  v-for="childrenItem in subItem.children"
                  :key="childrenItem.id"
                  :index="'/' + childrenItem.path"
                >
                  <i class="el-icon-menu"></i>
                  <span slot="title">{{ subItem.authName }}</span>
                </el-menu-item>
              </el-submenu>
              <!-- 二级导航 -->
              <el-menu-item
                v-else
                :index="'/' + subItem.path"
                :key="subItem.id"
              >
                <i class="el-icon-menu"></i>
                <span slot="title">{{ subItem.authName }}</span>
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <!-- 一级导航 -->
        <template v-else>
          <el-menu-item :index="'/' + item.path" :key="item.id">
            <i :class="iconsObj[item.id]"></i>
            <span slot="title">{{ item.authName }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
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
        "999": "el-icon-s-home",
        "998": "el-icon-question",
        "997": "el-icon-question",
        "125": "el-icon-user-solid",
        "103": "el-icon-s-grid",
        "101": "el-icon-s-goods",
        "102": "el-icon-s-claim",
        "145": "el-icon-s-marketing"
      },
      // 是否折叠菜单
      isCollapse: false
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
          this.menulist.unshift({
            authName: "后台首页",
            id: "999",
            path: "home",
            children: []
          });
          this.menulist.push({
            authName: "三级菜单",
            id: "998",
            path: "/1",
            children: [
              {
                authName: "三级里二级",
                id: "997",
                path: "/2",
                children: [
                  {
                    authName: "三级里三级",
                    id: "996",
                    path: "/3",
                    children: []
                  }
                ]
              },
              {
                authName: "后台首页",
                id: "995",
                path: "/4",
                children: []
              }
            ]
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 切换菜单展开与折叠
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
      // 向父组件传值 改变侧边栏宽度
      this.$emit("child-isCollapse", this.isCollapse);
    }
  }
};
</script>

<style lang="less" scoped>
@import "~@/styles/aside.less";
</style>
