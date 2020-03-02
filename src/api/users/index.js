import { get, put } from "@/utils/Service"; //导入axios实例文件中方法

const apis = {
  // 系统菜单
  getUserList(queryInfo) {
    console.log("用户列表api");
    return get("users", queryInfo);
  },

  userState(urldata) {
    console.log("修改用户状态api");
    return put(urldata);
  }
};

export default apis;
