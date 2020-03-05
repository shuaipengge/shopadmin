<template>
  <div class="add">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 提示区域 -->
      <el-alert
        title="添加商品信息"
        type="info"
        center
        show-icon
        :closable="false"
      ></el-alert>
      <!-- 步骤条 -->
      <el-steps
        :space="200"
        :active="activeIndex - 0"
        finish-status="success"
        align-center
        simple
      >
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>

      <!-- tab栏区域 -->
      <!-- 表单 -->
      <el-form
        ref="addformRef"
        :model="addForm"
        :rules="addFormRules"
        label-width="100px"
        label-position="top"
      >
        <el-tabs
          v-model="activeIndex"
          :tab-position="'left'"
          :before-leave="beforeTabLeave"
          @tab-click="tabClicked"
        >
          <el-tab-pane name="0" label="基本信息">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="addForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="addForm.goods_price" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="addForm.goods_weight" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="addForm.goods_number" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader
                expand-trigger="hover"
                :options="catelist"
                :props="cateProps"
                v-model="addForm.goods_cat"
                @change="handleChange"
              ></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane name="1" label="商品参数">
            <!-- 渲染表单的item项 -->
            <el-form-item
              :label="item.attr_name"
              v-for="item in manyTableDate"
              :key="item.attr_id"
            >
              <!-- 复选框组 -->
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox
                  :label="cb"
                  v-for="(cb, i) in item.attr_vals"
                  :key="i"
                  border
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">
            <el-form-item
              :label="item.attr_name"
              v-for="item in onlytableDate"
              :key="item.attr_id"
            >
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane name="3" label="商品图片">
            <!-- action 表示图片要上传到后台的API地址 -->
            <el-upload
              :action="uploadURL"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              list-type="picture"
              :headers="headerObj"
              :on-success="handleSuccess"
              :multiple="true"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane name="4" label="商品内容">
            <!-- 富文本编辑器组件 -->
            <quill-editor v-model="addForm.goods_introduce"></quill-editor>
            <!-- 添加商品的按钮 -->
            <el-button type="primary" class="btnAdd" @click="add('addformRef')"
              >添加商品</el-button
            >
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>

    <!-- 图片预览 -->
    <el-dialog title="图片预览" :visible.sync="previewVisible" width="50%">
      <img :src="previewPath" alt class="previewImg" />
    </el-dialog>
  </div>
</template>

<script>
import utils from "@/utils/utils";
import _ from "lodash";

export default {
  data() {
    return {
      activeIndex: "0",
      // 添加商品的表单
      addForm: {
        goods_name: "",
        goods_price: 0,
        goods_weight: 0,
        goods_number: 0,
        // 商品所属的分类数组
        goods_cat: [],
        // 图片的数组
        pics: [],
        // 商品的详情描述
        goods_introduce: "",
        attrs: []
      },
      // 表单验证规则
      addFormRules: {
        goods_name: [
          { required: true, message: "请输入商品名称", trigger: "blur" }
        ],
        goods_price: [
          { required: true, message: "请输入商品价格", trigger: "blur" }
        ],
        goods_weight: [
          { required: true, message: "请输入商品重量", trigger: "blur" }
        ],
        goods_number: [
          { required: true, message: "请输入商品数量", trigger: "blur" }
        ],
        goods_cat: [
          { required: true, message: "请选择商品分类", trigger: "blur" }
        ]
      },
      // 商品分类列表
      catelist: [],
      cateProps: {
        label: "cat_name",
        value: "cat_id",
        children: "children"
      },
      // 动态参数列表数据
      manyTableDate: [],
      // 静态属性列表数据
      onlytableDate: [],
      // 上传图片的url地址
      uploadURL: process.env.VUE_APP_UPLOAD_URL,
      // 图片上传组件的headers请求头对象
      headerObj: {
        Authorization: utils.getToken()
      },
      previewPath: "",
      previewVisible: false
    };
  },
  created() {
    this.getCateList();
  },
  methods: {
    getCateList() {
      this.$api.Goods.getCateList({})
        .then(result => {
          const { data: res } = result;
          console.log(res);
          if (res.meta.status !== 200) {
            return this.$msg.error(res.meta.msg, "", 1500);
          }
          this.$msg.ok(res.meta.msg, "操作成功", 1000);
          this.catelist = res.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 级联选择器选中项变化 会触发这个函数
    handleChange() {
      console.log(this.addForm.goods_cat);
      if (this.addForm.goods_cat.length !== 3) {
        this.addForm.goods_cat = [];
      }
    },
    beforeTabLeave(activeName, oldActiveName) {
      if (oldActiveName === "0" && this.addForm.goods_cat.length !== 3) {
        this.$msg.error("请选择商品分类!", "", 1500);
        return false;
      }
    },
    tabClicked() {
      // 证明访问的是动态参数面板
      if (this.activeIndex === "1") {
        this.$api.Goods.getParamsData(this.cateId, { sel: "many" })
          .then(result => {
            const { data: res } = result;
            console.log(res);
            if (res.meta.status !== 200) {
              return this.$msg.error(res.meta.msg, "", 1500);
            }
            res.data.forEach(item => {
              item.attr_vals =
                item.attr_vals.length === 0 ? [] : item.attr_vals.split(" ");
            });
            this.manyTableDate = res.data;
          })
          .catch(error => {
            console.log(error);
          });
      } else if (this.activeIndex === "2") {
        this.$api.Goods.getParamsData(this.cateId, { sel: "only" })
          .then(result => {
            const { data: res } = result;
            console.log(res);
            if (res.meta.status !== 200) {
              return this.$msg.error(res.meta.msg, "", 1500);
            }
            this.onlytableDate = res.data;
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    // 处理图片的预览效果
    handlePreview(file) {
      this.previewPath = file.response.data.url;
      this.previewVisible = true;
    },
    // 处理移除图片的操作
    handleRemove(file) {
      // 1.获取将要删除的图片的临时路径
      const filePath = file.response.data.tmp_path;
      // 2.从pics数组中,找到这个图片对应的索引值
      const i = this.addForm.pics.findIndex(x => x.pic === filePath);
      // 3.调用数组的splice方法,把图片信息对象,从pice数组中移除
      this.addForm.pics.splice(i, 1);
    },
    // 监听图片上传成功的事件
    handleSuccess(response) {
      console.log(response);
      // 1.拼接得到一个图片信息对象
      const picInfo = { pic: response.data.tmp_path };
      // 2.将图片信息对象,push到pice数组中
      this.addForm.pics.push(picInfo);
    },
    // 添加商品
    add(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          this.$msg.error("请填写表单必填项！", "", 1500);
          return;
        }
        // 执行添加的业务逻辑
        // lodash cloneDeep(obj)
        const form = _.cloneDeep(this.addForm);
        form.goods_cat = form.goods_cat.join(",");
        // 处理动态参数
        this.manyTableDate.forEach(item => {
          const newInfo = {
            attr_id: item.attr_id,
            attr_vals: item.attr_vals.join(" ")
          };
          this.addForm.attrs.push(newInfo);
        });
        // 处理静态属性
        this.onlytableDate.forEach(item => {
          const newInfo = { attr_id: item.attr_id, attr_vals: item.attr_vals };
          this.addForm.attrs.push(newInfo);
        });
        form.attrs = this.addForm.attrs;
        console.log(form);
        // 发起请求添加商品
        // 商品的名称，必须是唯一的
        this.$api.Goods.addGoods(form)
          .then(result => {
            const { data: res } = result;
            console.log(res);
            if (res.meta.status !== 201) {
              return this.$msg.error(res.meta.msg, "", 1500);
            }
            this.$msg.ok(res.meta.msg, "操作成功", 1000);
            this.$router.push("/goods");
          })
          .catch(error => {
            console.log(error);
          });
      });
    }
  },
  // 计算属性
  computed: {
    // 获取三级分类的Id
    cateId() {
      if (this.addForm.goods_cat.length === 3) {
        return this.addForm.goods_cat[2];
      }
      return null;
    }
  }
};
</script>

<style lang="less" scoped>
@import "~@/styles/add";
</style>
