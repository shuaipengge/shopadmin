import { post } from "../../utils/Service"; //导入axios实例文件中方法

const apis = {
  // 用户登录
  userLogin(user) {
    console.log("用户登录api");
    return post("login", user);
  }
};

export default apis;
