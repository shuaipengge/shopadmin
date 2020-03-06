import { get } from "@/utils/Service"; //导入axios实例文件中方法

const apis = {
  // 数据报表
  getMounted() {
    console.log("数据报表api");
    return get("reports/type/1");
  }
};
export default apis;
