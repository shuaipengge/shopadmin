import { get, deletes } from "@/utils/Service"; //导入axios实例文件中方法

const apis = {
  getRightsList() {
    console.log("权限列表api");
    return get("rights/list");
  },

  getRolesList() {
    console.log("角色列表api");
    return get("roles");
  },

  removeRightById(role, rightid) {
    console.log("移除角色权限api");
    return deletes(`roles/${role}/rights/${rightid}`);
  }
};

export default apis;
