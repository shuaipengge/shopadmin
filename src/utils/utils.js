export default {
  // 令牌操作
  getToken() {
    return sessionStorage.getItem("TOKEN");
  },
  setToken(token) {
    this.setSession("TOKEN", token);
  },
  removeToken() {
    return sessionStorage.removeItem("TOKEN");
  }
};
