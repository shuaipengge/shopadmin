<template>
  <div class="tags">
    <div class="tags-view">
      <el-tag
        v-for="tag in tags"
        :key="tag.id"
        :effect="$route.path == tag.path ? 'dark' : 'plain'"
        closable
        @close="handleClose(tag.id)"
      >
        <router-link tag="span" :to="tag.path">{{ tag.name }} </router-link>
      </el-tag>
    </div>
    <div class="tag-button" v-show="tags[0]">
      <!-- {{ $store.getters.tagsViews }} -->
      <el-dropdown
        size="mini"
        split-button
        type="primary"
        @command="handleCommand"
      >
        标签选项
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="closeOther">关闭其他</el-dropdown-item>
          <el-dropdown-item command="closeAll">关闭所有</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderTags",
  computed: {
    tags() {
      return this.$store.getters.tagsViews;
    }
  },
  methods: {
    handleCommand(command) {
      switch (command) {
        case "closeOther":
          // 清除所有未选中 tags
          this.$store.dispatch("OtherTag", this.$route.path);
          break;
        case "closeAll":
          // 清除所有 tags
          this.$store.dispatch("CleatTag");
          break;
      }
    },
    handleClose(id) {
      this.$store.dispatch("DelTag", id);
    }
  }
};
</script>

<style lang="less" scoped>
@import "~@/styles/headerTags.less";
</style>
