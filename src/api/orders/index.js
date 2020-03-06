import { get } from "@/utils/Service"; //导入axios实例文件中方法

const apis = {
  getOrderList(params) {
    console.log("订单列表api");
    return get("orders", params);
  }
};

export default apis;
