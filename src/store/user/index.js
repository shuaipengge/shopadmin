import utils from "../../utils/utils";

export default {
  state: {
    // 是否登录
    isLogin: utils.getToken() ? true : false
  },
  // getters 只会依赖 state 中的成员去更新
  getters: {
    isLogin: state => state.isLogin
  },
  mutations: {
    // 修改状态
    setLoginState(state, b) {
      state.isLogin = b;
    }
  },
  actions: {
    login({ commit }, token) {
      console.log("store login");
      // 登录成功
      commit("setLoginState", true);
      console.log(token);
      utils.setToken(token);
    },
    logout({ commit }) {
      console.log("store logout");
      // 清除token
      utils.removeToken();
      // 重置状态
      commit("setLoginState", false);
    }
  }
};
