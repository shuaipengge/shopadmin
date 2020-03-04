<template>
  <div class="cate">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" @click="showAddCateDialog"
            >添加分类</el-button
          >
        </el-col>
      </el-row>

      <!-- 表格区域 -->
      <tree-table
        class="treeTable"
        :data="catelist"
        :columns="columns"
        :selection-type="false"
        :expand-type="false"
        show-index
        index-text="#"
        border
        :show-row-hover="false"
      >
        <!-- 是否有效 -->
        <template slot="isok" slot-scope="scope">
          <i
            class="el-icon-success"
            v-if="scope.row.cat_deleted === false"
            style="color: lightgreen;"
          ></i>
          <i class="el-icon-error" v-else style="color: red;"></i>
        </template>
        <!-- 排序 -->
        <template slot="order" slot-scope="scope">
          <el-tag size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
          <el-tag
            size="mini"
            type="success"
            v-else-if="scope.row.cat_level === 1"
            >二级</el-tag
          >
          <el-tag size="mini" type="warning" v-else>三级</el-tag>
        </template>
        <!-- 操作 -->
        <template slot="opt" slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="editCate(scope.row.cat_id)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="delCate(scope.row.cat_id)"
            >删除</el-button
          >
        </template>
      </tree-table>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="querInfo.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="querInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      ></el-pagination>
    </el-card>

    <!-- 添加分类的对话框 -->
    <el-dialog
      title="添加分类"
      :visible.sync="addCateDialogVisible"
      width="50%"
      @close="addCateDialogClosed('addCateFormRef')"
    >
      <!-- 添加分类的表单 -->
      <el-form
        ref="addCateFormRef"
        :model="addCateForm"
        label-width="100px"
        :rules="addCateFormRules"
      >
        <el-form-item label="分类名称:" prop="cat_name">
          <el-input v-model="addCateForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类:">
          <!-- options 指定数据源 -->
          <!-- props 用来指定数据配置对象 -->
          <el-cascader
            v-model="selectedKeys"
            :options="parentCateList"
            :props="cascaderProps"
            @change="parentCateChange"
            clearable
          ></el-cascader>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCate('addCateFormRef')"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <!-- 修改分类的对话框 -->
    <el-dialog
      title="修改分类"
      :visible.sync="editCateDialogVisible"
      width="50%"
    >
      <!-- 修改分类的表单 -->
      <el-form
        ref="editCateFormRef"
        :model="editCatefrom"
        label-width="100px"
        :rules="addCateFormRules"
      >
        <el-form-item label="分类名称:" prop="cat_name">
          <el-input v-model="editCatefrom.cat_name"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="doeditCate('editCateFormRef')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      querInfo: {
        // 查询条件
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      // 商品分类的数据列表，默认为空
      catelist: [],
      // 总数据条数
      total: 0,
      // 为table指定列的定义
      columns: [
        {
          label: "分类名称",
          prop: "cat_name"
        },
        {
          label: "是否有效",
          // 表示，将当前列定义为模板列
          type: "template",
          // 表示当前这一列使用模板名称
          template: "isok"
        },
        {
          label: "排序",
          // 表示，将当前列定义为模板列
          type: "template",
          // 表示当前这一列使用模板名称
          template: "order"
        },
        {
          label: "操作",
          // 表示，将当前列定义为模板列
          type: "template",
          // 表示当前这一列使用模板名称
          template: "opt"
        }
      ],
      // 控制添加分类对话框的显示与隐藏
      addCateDialogVisible: false,
      // 添加分类的表单数据对象
      addCateForm: {
        // 将要添加的分类名称
        cat_name: "",
        // 父级分类的ID
        cat_pid: 0,
        // 分类的等级，默认要添加的是1级分类
        cat_level: 0
      },
      // 添加分类的表单验证规则对象
      addCateFormRules: {
        cat_name: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "分类名称的长度在1~10个字符之间",
            trigger: "blur"
          }
        ]
      },
      // 父级分类的列表
      parentCateList: [],
      // 指定级联选择器的配置对象
      cascaderProps: {
        checkStrictly: true,
        expandTrigger: "hover",
        value: "cat_id",
        label: "cat_name",
        children: "children"
      },
      // 选中的父级分类的ID数组
      selectedKeys: [],
      // 查询要修改的分类信息
      editCatefrom: {},
      // 控制修改分类对话框的显示与隐藏
      editCateDialogVisible: false
    };
  },
  created() {
    this.getCateList();
  },
  methods: {
    // 获取商品
    getCateList() {
      this.$api.Goods.getCateList(this.querInfo)
        .then(result => {
          const { data: res } = result;
          console.log(res);
          if (res.meta.status !== 200) {
            return this.$msg.error(res.meta.msg, "", 1500);
          }
          // 把数据列表，赋值给 catelist
          this.catelist = res.data.result;
          // 为数据条数赋值
          this.total = res.data.total;
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 监听 pageseize 改变
    handleSizeChange(newSize) {
      this.querInfo.pagesize = newSize;
      this.getCateList();
    },
    // 监听 pagenum 改变
    handleCurrentChange(newPage) {
      this.querInfo.pagenum = newPage;
      this.getCateList();
    },
    // 点击添加分类按钮
    showAddCateDialog() {
      // 先获取父级分类的数列表
      this.getParentCateList();
      // 再展示出对话框
      this.addCateDialogVisible = true;
    },
    // 获取父级分类的数据列表
    getParentCateList() {
      this.$api.Goods.getCateList({ params: { type: 2 } })
        .then(result => {
          const { data: res } = result;
          console.log(res);
          if (res.meta.status !== 200) {
            return this.$msg.error(res.meta.msg, "", 1500);
          }
          this.parentCateList = res.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 选择项发生变化触发这个函数
    parentCateChange() {
      console.log(this.selectedKeys);
      // 如果 selectKeys 数组中的lenght大于0，证明选中的父级分类
      // 反之，就说明没有选中任何父级分类
      if (this.selectedKeys.length > 0) {
        // 父级分类的ID
        this.addCateForm.cat_pid = this.selectedKeys[
          this.selectedKeys.length - 1
        ];
        // 为当前分类的等级赋值
        this.addCateForm.cat_level = this.selectedKeys.length;
      } else {
        // 父级分类的ID
        this.addCateForm.cat_pid = 0;
        // 为当前分类的等级赋值
        this.addCateForm.cat_level = 0;
      }
    },
    // 点击按钮添加新的分类
    addCate(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) return;
        // 校验通过 发送请求

        this.$api.Goods.addCate(this.addCateForm)
          .then(result => {
            const { data: res } = result;
            console.log(res);
            if (res.meta.status !== 201) {
              return this.$msg.error(res.meta.msg, "", 1500);
            }
            this.$msg.ok(res.meta.msg, "操作成功", 1000);
            this.getCateList();
            this.addCateDialogVisible = false;
          })
          .catch(error => {
            console.log(error);
          });
      });
    },
    // 监听对话框关闭事件，重置表单数据
    addCateDialogClosed(formName) {
      this.$refs[formName].resetFields();
      this.selectedKeys = [];
      this.addCateForm.cat_pid = 0;
      this.addCateForm.cat_level = 0;
    },
    // 点击编辑分类事件,获取分类信息
    editCate(id) {
      this.$api.Goods.getCate(id)
        .then(result => {
          const { data: res } = result;
          console.log(res);
          if (res.meta.status !== 200) {
            return this.$msg.error(res.meta.msg, "", 1500);
          }
          this.editCatefrom = res.data;
          this.editCateDialogVisible = true;
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 编辑分类确定提交事件
    doeditCate(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) return;
        // 校验通过 发送请求
        this.$api.Goods.editCate(this.editCatefrom.cat_id, this.editCatefrom)
          .then(result => {
            const { data: res } = result;
            console.log(res);
            if (res.meta.status !== 200) {
              return this.$msg.error(res.meta.msg, "", 1500);
            }
            this.$msg.ok(res.meta.msg, "操作成功", 1000);
            this.editCateDialogVisible = false;
            this.getCateList();
          })
          .catch(error => {
            console.log(error);
          });
      });
    },
    // 点击删除分类数据
    delCate(id) {
      this.$api.Goods.delCate(id)
        .then(result => {
          const { data: res } = result;
          console.log(res);
          if (res.meta.status !== 200) {
            return this.$msg.error(res.meta.msg, "", 1500);
          }
          this.$msg.ok(res.meta.msg, "操作成功", 1000);
          this.getCateList();
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="less" scoped>
@import "~@/styles/cate.less";
</style>
