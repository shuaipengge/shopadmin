export default {
  // 令牌操作
  getToken() {
    return sessionStorage.getItem("TOKEN");
  },
  setToken(token) {
    sessionStorage.setItem("TOKEN", token);
  },
  removeToken() {
    return sessionStorage.removeItem("TOKEN");
  }
};
