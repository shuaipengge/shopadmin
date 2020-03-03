<template>
  <div class="roles">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <!-- 添加角色按钮区域 -->
      <el-row>
        <el-col>
          <el-button type="primary" @click="addRolesVisible = true"
            >添加角色</el-button
          >
        </el-col>
      </el-row>

      <!-- 角色列表区域 -->
      <el-table :data="rolelist" border stripe>
        <!-- 展开列 -->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <!-- 根据index判断 来添加样式 -->
            <el-row
              :class="['bdbottom', index1 === 0 ? 'bdtop' : '', 'vcenter']"
              v-for="(item1, index1) in scope.row.children"
              :key="item1.id"
            >
              <!-- 渲染一级权限 -->
              <el-col :span="5">
                <el-tag
                  closable
                  @close="removeRightById(scope.row, item1.id)"
                  >{{ item1.authName }}</el-tag
                >
                <i class="el-icon-caret-right"></i>
              </el-col>

              <!-- 渲染二级和三级权限 -->
              <el-col :span="19">
                <!-- 通过for循环 嵌套渲染二级权限 -->
                <el-row
                  :class="[index2 === 0 ? '' : 'bdtop', 'vcenter']"
                  v-for="(item2, index2) in item1.children"
                  :key="item2.id"
                >
                  <el-col :span="6">
                    <el-tag
                      closable
                      @close="removeRightById(scope.row, item2.id)"
                      type="success"
                      >{{ item2.authName }}</el-tag
                    >
                    <i class="el-icon-caret-right"></i>
                  </el-col>

                  <!-- 通过for循环来渲染三级权限 -->
                  <el-col :span="18">
                    <el-tag
                      closable
                      @close="removeRightById(scope.row, item3.id)"
                      type="warning"
                      v-for="item3 in item2.children"
                      :key="item3.id"
                      >{{ item3.authName }}</el-tag
                    >
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <!-- 索引列 -->
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="openeditRoles(scope.row.id)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="delRoles(scope.row.id)"
              >删除</el-button
            >
            <el-button
              size="mini"
              type="warning"
              icon="el-icon-setting"
              @click="showSetRightDialog(scope.row)"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 所有角色列表数据
      rolelist: [],
      // 控制分配权限的对话框显示与隐藏
      setRightDialogVisble: false,
      // 所有权限的数据
      rightslist: [],
      // 树形控件的属性绑定
      treeProps: {
        label: "authName",
        children: "children"
      },
      // 默认选中的节点ID值数组
      defKeys: [],
      // 当前即将分配权限的角色ID
      roleId: "",
      // 控制添加角色的对话框显示与隐藏
      addRolesVisible: false,
      // 添加角色的数据表单
      addFromRoles: {
        roleName: "",
        roleDesc: ""
      },
      // 修改角色信息的数据表单
      editFromRoles: {},
      // 添加表单的验证规则
      addFromRolesRules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "角色名称的长度在1~10个字符之间",
            trigger: "blur"
          }
        ],
        roleDesc: [
          { required: true, message: "请输入角色描述", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "角色描述的长度在1~10个字符之间",
            trigger: "blur"
          }
        ]
      },
      // 控制修改角色对话框的显示与隐藏
      editRolesVisible: false
    };
  },
  created() {
    this.getRolesList();
  },
  methods: {
    // 获取所有角色列表
    getRolesList() {
      this.$api.Power.getRolesList()
        .then(result => {
          const { data: res } = result;
          console.log(res);
          if (res.meta.status !== 200) {
            return this.$msg.error(res.meta.msg, "", 1500);
          }
          this.rolelist = res.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 删除角色权限
    removeRightById(role, rightid) {
      // 弹框提示是否删除
      this.$confirm("此操作将移除该权限, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 执行删除逻辑
          this.$api.Power.removeRightById(role.id, rightid)
            .then(result => {
              const { data: res } = result;
              console.log(res);
              if (res.meta.status !== 200) {
                return this.$msg.error(res.meta.msg, "", 1500);
              }
              this.$msg.ok(res.meta.msg, "操作成功", 1000);
              // 重新赋值用户权限
              role.children = res.data;
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(() => {
          this.$msg.info("已取消删除", "", 1000);
        });
    }
  }
};
</script>

<style lang="less" scoped>
@import "~@/styles/roles";
</style>
