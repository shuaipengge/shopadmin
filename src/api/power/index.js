import { get } from "@/utils/Service"; //导入axios实例文件中方法

const apis = {
  getRightsList() {
    console.log("权限列表api");
    return get("rights/list");
  },

  getRolesList() {
    console.log("角色列表api");
    return get("roles");
  }
};

export default apis;
