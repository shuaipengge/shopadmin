import { get, post, deletes, put } from "@/utils/Service"; //导入axios实例文件中方法

const apis = {
  getRightsList(data) {
    console.log("权限列表api");
    return get(`rights/${data}`);
  },

  getRolesList() {
    console.log("角色列表api");
    return get("roles");
  },

  removeRightById(role, rightid) {
    console.log("移除角色权限api");
    return deletes(`roles/${role}/rights/${rightid}`);
  },

  allotRights(roleId, data) {
    console.log("分配权限api");
    return post(`roles/${roleId}/rights`, data);
  },

  saveRoleInfo(id, data) {
    console.log("分配角色api");
    return put(`users/${id}/role`, data);
  }
};

export default apis;
