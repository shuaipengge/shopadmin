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
  }
};

export default apis;
