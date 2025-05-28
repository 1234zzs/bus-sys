<template>

    <body id="poster">
        <el-form class="login-container" labal-position="left" label-width="0px">
            <h3 class="login_title">
                司机登陆
            </h3>
            <el-form-item el-form-item label="">
                <el-input type="text" v-model="loginForm.driver_id" autocomplete="off" placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item el-form-item label="">
                <el-input type="password" v-model="loginForm.password" autocomplete="off" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item style="width: 100%;">
                <el-button type="primary" style="width: 45%;background: #50bff7;border: none;"
                    v-on:click="login">登陆</el-button>
                <el-button @click="toadmin()" style="width: 45%;">管理员登陆</el-button>
            </el-form-item>
        </el-form>
    </body>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    name: 'LoginUser',
    data() {
        return {
            loginForm: {
                driver_id: '',
                password: '',
            },
            role: 'user',
        }
    },
    methods: {
        login() {
            this.axios.post('http://106.75.217.80:3334/bus-sys/loginuser', this.loginForm).then((resp) => {
                let data = resp.data;
                if (data.success) {
                    this.$message({
                        message: '成功登录',
                        type: 'success'
                    });
                    this.$store.commit('setUserId', this.loginForm.driver_id); // 假设 user_id 是登录名
                    this.$store.commit('setIsLogin', true);
                    this.$store.commit('setRole', this.role);
                    this.$router.push({ path: '/user' })
                } else {
                    // 登录失败
                    this.$message.error(data.message || '登录失败，请检查用户名和密码');
                }

            })


        },
        toadmin() {
            this.$router.push({ path: '/' })
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