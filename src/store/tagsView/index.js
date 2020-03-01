export default {
  state: {
    // Tags标签页
    tagsViews: [{ name: "首页", action: "plain" }]
  },
  // getters 只会依赖 state 中的成员去更新
  getters: {
    tagsViews: state => state.tagsViews
  },
  mutations: {
    // 添加tag
    pushTagsViews(state, b) {
      state.tagsViews.push(b);
    },
    // 删除tag
    delTagsViews(state, b) {
      state.tagsViews.pop(b);
    }
  },
  actions: {
    AddTag({ commit }, token) {
      console.log("store addTag");
      commit("pushTagsViews", true);
      console.log(token);
    },
    DelTag({ commit }) {
      console.log("store delTag");
      commit("delTagsViews", false);
    }
  }
};
