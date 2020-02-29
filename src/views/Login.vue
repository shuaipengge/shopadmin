<template>
  <div>
    <el-form @submit.native.prevent :model="user" label-width="80px">
      <el-form-item>
        <el-input prefix-icon="el-icon-user" v-model="user.username"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          prefix-icon="el-icon-lock"
          v-model="user.password"
          type="password"
        ></el-input>
      </el-form-item>
      <!-- 按钮 -->
      <el-form-item class="btns">
        <el-button type="primary" @click="login">登录</el-button>
        <el-button type="info" @click="restLoginForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      // 这是登录表单的数据绑定对象
      user: {
        username: "admin",
        password: "123456"
      },
      // 这是表单验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: "请输入登录名称", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 点击重置按钮，重置登录表单
    restLoginForm() {
      // console.log(this)
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      this.$msg.error("开始登录", "", 1500);
      this.$msg.message("登录成功标题", "123消息", 1500, true);
      this.$api.Login.userLogin(this.user)
        .then(result => {
          const { data: res } = result;
          console.log(res.data);
          this.$store.dispatch("login", res.data.token);
        })
        .catch(error => {
          console.log(error);
        });

      // API.userLogin(this.user)
      //   .then(result => {})
      //   .catch(error => {});
      // 1.将token保存在客户端的 sessionStorage 中
      // 1.1 其他接口会校验 token
      // 1.2 token 只在当前网站打开有效 将token保存在sessionStorage
      // 2.通过编程式导航 跳转到主页 /home
      this.$router.push("/home");
    }
  }
};
</script>

<style lang="less" scoped>
@import "../styles/login.less";
</style>
