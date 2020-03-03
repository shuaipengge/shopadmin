import { get, put, post, deletes } from "@/utils/Service"; //导入axios实例文件中方法

const apis = {
  // 系统菜单
  getUserList(queryInfo) {
    console.log("用户列表api");
    return get("users", queryInfo);
  },

  userState(urldata) {
    console.log("修改用户状态api");
    return put(urldata);
  },

  addUser(user) {
    console.log("添加用户api");
    return post("users", user);
  },

  getUser(id) {
    console.log("获取用户api");
    return get(`users/${id}`);
  },

  editUser(id, data) {
    console.log("修改用户信息api");
    return put(`users/${id}`, data);
  },

  deleteUser(id) {
    console.log("删除用户api");
    return deletes(`users/${id}`);
  }
};

export default apis;
