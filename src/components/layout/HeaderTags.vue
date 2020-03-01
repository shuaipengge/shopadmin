<template>
  <div class="tags">
    <div class="tags-view">
      <el-tag v-for="tag in tags" :key="tag.name" :effect="tag.action" closable>
        {{ tag.name }}
      </el-tag>
    </div>
    <div class="tag-button" v-show="tags[0]">
      <el-dropdown size="mini" split-button type="primary">
        标签选项
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>关闭其他</el-dropdown-item>
          <el-dropdown-item>关闭所有</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import store from "@/store";

export default {
  name: "HeaderTags",
  data() {
    return {
      tags: []
    };
  },
  mounted() {
    this.tags = store.getters.tagsViews;
  }
};
</script>

<style lang="less" scoped>
@import "~@/styles/headerTags.less";
</style>
