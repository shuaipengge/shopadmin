<template>
  <div class="users">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card class="box-card">
      <!-- 搜索框 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            class="input-with-select"
            clearable
            @clear="getUserList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUserList('search')"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="3">
          <el-button @click="addDialogVisible = true" type="primary"
            >添加用户</el-button
          >
        </el-col>
        <el-col :span="3">
          <el-button @click="exportExcel" type="primary">导出表格</el-button>
        </el-col>
      </el-row>

      <!-- 表格区域 -->
      <el-table :data="userlist" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column prop="type" label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              @change="userStateChanged(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row.id)"
            ></el-button>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeUserById(scope.row.id)"
            ></el-button>
            <!-- 分配角色 -->
            <el-tooltip
              effect="dark"
              content="分配角色"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                icon="el-icon-s-tools"
                size="mini"
                @click="setRole(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-row :gutter="24" type="flex" justify="center">
        <el-col :span="12">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryInfo.pagenum"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="queryInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </el-col>
      </el-row>
    </el-card>

    <!-- 添加用户对话框 -->
    <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="resetForm('addUserFormRef')"
    >
      <!-- 对话框内容区域  rules验证规则 ref表单名称-->
      <el-form
        :model="addUserForm"
        :rules="addUserFormrules"
        ref="addUserFormRef"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addUserForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addUserForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addUserForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addUserForm.mobile"></el-input>
        </el-form-item>
      </el-form>

      <!-- 对话框底部按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser('addUserFormRef')"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <!-- 修改用户对话框 -->
    <el-dialog
      title="修改用户"
      :visible.sync="editDialogVisible"
      width="50%"
      @click="resetForm('editFormRef')"
    >
      <el-form
        :model="editUserForm"
        :rules="addUserFormrules"
        ref="editFormRef"
        label-width="70px"
      >
        <el-form-item label="用户名">
          <el-input v-model="editUserForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editUserForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="editUserForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo('editFormRef')"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <!-- 分配角色的对话框 -->
    <el-dialog
      title="分配角色"
      :visible.sync="setRoleDialogVisible"
      width="50%"
      @close="setRoleDialogClosed"
    >
      <div>
        <p>当前的用户：{{ userInfo.username }}</p>
        <p>当前的角色：{{ userInfo.role_name }}</p>
        <p>
          分配新的角色:
          <el-select v-model="selectedRoleId" placeholder="请选择">
            <el-option
              v-for="item in rolesList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRoleInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    // 验证邮箱的规则
    let checkEmail = (rule, value, cd) => {
      // 验证邮箱的正则表达式
      const regEmail = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/;

      if (regEmail.test(value)) {
        // 合法的邮箱
        return cd();
      }
      cd(new Error("请输入合法的邮箱"));
    };
    // 验证手机号的规则
    let checkMoble = (rule, value, cd) => {
      // 验证手机号的正则表达式
      const regMoble = /^1[3456789]\d{9}$/;
      if (regMoble.test(value)) {
        return cd();
      }
      cd(new Error("请输入合法的手机号"));
    };

    return {
      // 获取用户列表参数
      queryInfo: {
        query: "",
        // 当前的页码
        pagenum: 1,
        // 每页条数
        pagesize: 10
      },
      // 用户列表
      userlist: [],
      // 总条数
      total: 0,
      // 添加用户对话框
      addDialogVisible: false,
      // 修改用户对话框
      editDialogVisible: false,
      // 添加用户表单数据
      addUserForm: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      // 控制分配角色对话框的显示与隐藏
      setRoleDialogVisible: false,
      // 需要被分配角色的用户信息
      userInfo: {},
      // 所有角色的数据列表
      rolesList: [],
      // 已选中的角色ID值
      selectedRoleId: "",
      // 查询到的用户信息对象
      editUserForm: {},
      // 添加用户表单的验证规则对象
      addUserFormrules: {
        username: [
          { required: true, message: "清输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "用户名的长度在3~10字符之间",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "清输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "密码的长度在3~10字符之间",
            trigger: "blur"
          }
        ],
        email: [
          { required: true, message: "清输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "清输入手机号码", trigger: "blur" },
          { validator: checkMoble, trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    getUserList(search) {
      // fix 用户在非第一页查询时,请求的参数重置第一页
      if (search == "search") {
        this.queryInfo.pagenum = 1;
      }
      this.$api.Users.getUserList(this.queryInfo)
        .then(result => {
          const { data: res } = result;
          console.log(res);
          if (res.meta.status !== 200) {
            return this.$msg.error(res.meta.msg, "", 1500);
          }
          this.userlist = res.data.users;
          this.total = res.data.total;
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getUserList();
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getUserList();
    },
    // 监听 switch 开关状态的改变
    userStateChanged(user) {
      this.$api.Users.userState(`users/${user.id}/state/${user.mg_state}`)
        .then(result => {
          const { data: res } = result;
          console.log(res);
          if (res.meta.status !== 200) {
            user.mg_state = !user.mg_state;
            return this.$msg.error(res.meta.msg, "", 1500);
          }
          this.$msg.ok(res.meta.msg, "操作成功", 1000);
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 监听添加用户对话框的关闭事件
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 提交表单 添加用户
    addUser(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) return;
        // 校验通过 发送请求
        this.$api.Users.addUser(this.addUserForm)
          .then(result => {
            const { data: res } = result;
            console.log(res);
            if (res.meta.status !== 201) {
              return this.$msg.error(res.meta.msg, "", 1500);
            }
            this.$msg.ok(res.meta.msg, "操作成功", 1000);
            // 隐藏添加用户的对话框
            this.addDialogVisible = false;
            // 刷新用户列表
            this.getUserList();
          })
          .catch(error => {
            console.log(error);
          });
        console.log("ok");
      });
    },
    // 展示编辑用户对话框
    showEditDialog(id) {
      this.$api.Users.getUser(id)
        .then(result => {
          const { data: res } = result;
          console.log(res);
          if (res.meta.status !== 200) {
            return this.$msg.error(res.meta.msg, "", 1500);
          }
          this.$msg.ok(res.meta.msg, "操作成功", 1000);
          this.editUserForm = res.data;
          // 展示修改用户的对话框
          this.editDialogVisible = true;
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 修改用户信息提交
    editUserInfo(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) return;
        this.$api.Users.editUser(this.editUserForm.id, {
          email: this.editUserForm.email,
          mobile: this.editUserForm.mobile
        })
          .then(result => {
            const { data: res } = result;
            console.log(res);
            if (res.meta.status !== 200) {
              return this.$msg.error(res.meta.msg, "", 1500);
            }
            this.$msg.ok(res.meta.msg, "操作成功", 1000);
            // 隐藏修改用户的对话框
            this.editDialogVisible = false;
            // 刷新用户列表
            this.getUserList();
          })
          .catch(error => {
            console.log(error);
          });
      });
    },
    // 删除用户
    removeUserById(id) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 执行删除逻辑
          this.$api.Users.deleteUser(id)
            .then(result => {
              const { data: res } = result;
              console.log(res);
              if (res.meta.status !== 200) {
                return this.$msg.error(res.meta.msg, "", 1500);
              }
              this.$msg.ok(res.meta.msg, "操作成功", 1000);
              // 刷新用户列表
              this.getUserList();
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(() => {
          this.$msg.info("已取消删除", "", 1000);
        });
    },
    // 展示分配角色的对话框
    setRole(userInfo) {
      this.userInfo = userInfo;
      // 获取所有角色的列表信息
      this.$api.Power.getRolesList()
        .then(result => {
          const { data: res } = result;
          console.log(res);
          if (res.meta.status !== 200) {
            return this.$msg.error(res.meta.msg, "", 1500);
          }
          this.rolesList = res.data;
          this.setRoleDialogVisible = true;
        })
        .catch(error => {
          console.log(error);
        });
    },
    //导出的方法
    exportExcel() {
      require.ensure([], () => {
        const { export_json_to_excel } = require("@/utils/Excel/Export2Excel"); //注意这个Export2Excel路径
        const tHeader = ["ID", "姓名", "邮箱", "电话", "角色", "状态"]; // 上面设置Excel的表格第一行的标题
        const filterVal = [
          "id",
          "username",
          "email",
          "mobile",
          "role_name",
          "mg_state"
        ]; // 上面是tableData里对象的属性key值
        const list = this.userlist; //把要导出的数据tableData存到list
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "列表excel"); //最后一个是表名字
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    // 点击按钮，分配角色
    saveRoleInfo() {
      if (!this.selectedRoleId) {
        return this.$message.error("请选择要分配的角色！");
      }
      this.$api.Power.saveRoleInfo(this.userInfo.id, {
        rid: this.selectedRoleId
      })
        .then(result => {
          const { data: res } = result;
          console.log(res);
          if (res.meta.status !== 200) {
            return this.$msg.error(res.meta.msg, "", 1500);
          }
          this.$msg.ok(res.meta.msg, "操作成功", 1000);
          this.getUserList();
          this.setRoleDialogVisible = false;
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 监听分配角色对话框的关闭事件
    setRoleDialogClosed() {
      this.selectedRoleId = "";
      this.userInfo = {};
    }
  }
};
</script>

<style lang="less" scoped>
@import "~@/styles/users";
</style>
