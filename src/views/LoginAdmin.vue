<template>

  <body id="poster">
    <el-form class="login-container" labal-position="left" label-width="0px">
      <h3 class="login_title">
        管理员登陆
      </h3>
      <el-form-item el-form-item label="">
        <el-input type="text" v-model="loginForm.login_name" autocomplete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item el-form-item label="">
        <el-input type="password" v-model="loginForm.password" autocomplete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item style="width: 100%;">
        <el-button type="primary" style="width: 45%;background: #50bff7;border: none;" v-on:click="login">登陆</el-button>
        <el-button @click="touser()" style="width: 45%;">司机登陆</el-button>
      </el-form-item>
    </el-form>
  </body>
</template>

<script>
//import { mapActions } from 'vuex';
export default {
  name: 'LoginAdmin',
  data() {
    return {
      loginForm: {
        login_name: '',
        password: '',
      },
      role: 'admin',
    }
  },
  methods: {
    login() {
      if (this.loginForm.login_name === '' || this.loginForm.password === '') {
        this.$message.error('账号或密码不能为空');
        return;
      } else if (this.loginForm.login_name === 'admin' && this.loginForm.password === 'admin') {
        this.$message({
          message: '成功登录',
          type: 'success'
        });
        this.$store.commit('setUserId', this.loginForm.login_name); // 假设 user_id 是登录名
        this.$store.commit('setIsLogin', true);
        this.$store.commit('setRole', this.role);
        this.$router.push({ path: '/home' })
      } else {
        this.$message.error('账号或密码错误');
      }
    },
    touser() {
      this.$router.push({ path: '/loginuser' })
    }
  }
}
</script>

<style scoped>
#poster {
  background-image: url('@/assets/background.jpg');
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}

body {
  margin: 0px;
  padding: 0px;
}

.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 90px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.login_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
</style>