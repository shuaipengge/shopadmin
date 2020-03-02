export default {
  state: {
    // Tags标签页
    tagsViews: []
  },
  // getters 只会依赖 state 中的成员去更新
  getters: {
    tagsViews: state => state.tagsViews
  },
  mutations: {
    // 添加tag
    pushTagsViews(state, b) {
      const i = state.tagsViews.findIndex(x => x.id === b.id);
      // 根据索引 判断元素是否已经存在
      if (i == -1) {
        // TODO 判断是否超过10个 如果超过去掉第一个后再加入
        state.tagsViews.push(b);
      }
    },
    // 删除tag
    delTagsViews(state, b) {
      const i = state.tagsViews.findIndex(x => x.id === b);
      // 根据索引 删除对应的元素
      if (i !== -1) {
        state.tagsViews.splice(i, 1);
      }
    },
    // 清除其他tag
    otherTagsViews(state, b) {
      state.tagsViews = state.tagsViews.filter(x => x.path === b);
    },
    // 清空tag
    clearTagsViews(state) {
      state.tagsViews = [];
      console.log("清空 tags");
    }
  },
  actions: {
    AddTag({ commit }, b) {
      console.log("store addTag");
      commit("pushTagsViews", b);
    },
    DelTag({ commit }, b) {
      console.log("store delTag");
      commit("delTagsViews", b);
    },
    OtherTag({ commit }, b) {
      console.log("store otherTag");
      commit("otherTagsViews", b);
    },
    CleatTag({ commit }) {
      console.log("store clearTag");
      commit("clearTagsViews");
    }
  }
};
