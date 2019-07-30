<template>
  <div class="login">
    <div class="center-box">
      <h2 class="my-h3">用户登录</h2>
      <el-form
        :model="loginForm"
        :rules="loginRules"
        ref="loginForm"
        label-position="top"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" type="password" @keyup.native.enter="submitForm('loginForm')"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="my-btn" type="primary" @click="submitForm('loginForm')">登录</el-button>
          <el-button class="my-btn" type="danger" @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 5,
            max: 12,
            message: "长度在 5 到 12 个字符",
            trigger: "change"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "长度在 6 到 12 个字符",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
     submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
             this.$request.login(this.loginForm).then(res => {
            if (res.data.meta.status === 400) {
              this.$message.warning(res.data.meta.msg);
            } else if (res.data.meta.status === 200) {
              // 对 去首页
              this.$message.success(res.data.meta.msg);
              // 保存token
              window.sessionStorage.setItem("token", res.data.data.token);
              // 代码方式跳转 window.location.href
              // 编程式导航
              this.$router.push("/");
            }
            });
          } else {
            // 错误提示
            this.$message.error('哥们你是机器人吗?');
            return false;
          }
        });
      },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
 
    
</script>

<style lang="scss">
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
  .login {
    height: 100%;
    background-color: #324152;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.center-box {
  width: 580px;
  height: 440px;
  background: white;
  border-radius: 10px;
  padding: 50px 35px;
  box-sizing: border-box;
  .my-btn {
    width: 100%;
    margin-left: 0;
  }
  .my-h3 {
    margin: 0;
    padding: 0;
    text-align: center;
  }
}
</style>