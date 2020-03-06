//根据id获取用户信息
// export const getUserInfoById = id => {
//   console.log("获取用户信息api");
//   return get(`${bsae_api}/web/user/${id}`);
// };

// 引入各个模块的api
import Login from "./login";
import System from "./system";
import Users from "./users";
import Power from "./power";
import Goods from "./goods";
import Orders from "./orders";

export default {
  Login,
  System,
  Users,
  Power,
  Goods,
  Orders
};
