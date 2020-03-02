import { get } from "@/utils/Service"; //导入axios实例文件中方法

const apis = {
  // 系统菜单
  getMenuList() {
    console.log("菜单列表api");
    return get("menus");
  }
};

export default apis;
