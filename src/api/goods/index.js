import { get, post, put, deletes } from "@/utils/Service"; //导入axios实例文件中方法

const apis = {
  getCateList(params) {
    console.log("商品分类列表api");
    return get("categories", params);
  },

  addCate(data) {
    console.log("添加分类api");
    return post("categories", data);
  },

  getCate(id) {
    console.log("获取分类api");
    return get(`categories/${id}`);
  },

  editCate(id, data) {
    console.log("修改分类api");
    return put(`categories/${id}`, data);
  },

  delCate(id) {
    console.log("删除分类api");
    return deletes(`categories/${id}`);
  },

  getParamsData(id, params) {
    console.log("获取分类参数api");
    return get(`categories/${id}/attributes`, params);
  },

  postParamsData(id, data) {
    console.log("添加分类参数api");
    return post(`categories/${id}/attributes`, data);
  },

  getParamsDataByID(cateID, attr_id, params) {
    console.log("查询分类参数api");
    return get(`categories/${cateID}/attributes/${attr_id}`, params);
  },

  editParams(id, attrId, params) {
    console.log("修改分类参数api");
    return put(`categories/${id}/attributes/${attrId}`, params);
  },

  delParams(id, attrid) {
    console.log("删除分类参数api");
    return deletes(`categories/${id}/attributes/${attrid}`);
  },

  getCoodsList(params) {
    console.log("商品列表api");
    return get("goods", params);
  },

  delGoods(id) {
    console.log("删除商品api");
    return deletes(`goods/${id}`);
  },

  addGoods(data) {
    console.log("添加商品api");
    return post("goods", data);
  }
};

export default apis;
