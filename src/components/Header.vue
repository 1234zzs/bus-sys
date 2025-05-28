<template>
    <div class="leftbody">
        <div class="userava">
            <el-image style="width: 100px; height: 100px" :src="require('@/assets/buslogo.png')" fit="fill"></el-image>
            <h3>公交车管理系统</h3>
        </div>
        <div class="nav-container">
            <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" @select="handleSelect">
                <el-menu-item index="1" @click="toPage('/home')">
                    <i class="el-icon-menu"></i>
                    <span slot="title">首页</span>
                </el-menu-item>
                <el-submenu index="2" v-model="isSystemManagementOpen">
                    <template slot="title">
                        <i class="el-icon-setting"></i>
                        <span>系统管理</span>
                    </template>
                    <el-menu-item index="2-1" @click="toPage('/driver')">
                        <i class="el-icon-setting"></i>
                        <span slot="title">司机</span>
                    </el-menu-item>
                    <el-menu-item index="2-2" @click="toPage('/vehicle')">
                        <i class="el-icon-setting"></i>
                        <span slot="title">车辆</span>
                    </el-menu-item>
                    <el-menu-item index="2-3" @click="toPage('/route')">
                        <i class="el-icon-setting"></i>
                        <span slot="title">线路</span>
                    </el-menu-item>
                    <el-menu-item index="2-4" @click="toPage('/site')">
                        <i class="el-icon-setting"></i>
                        <span slot="title">站点</span>
                    </el-menu-item>
                    <el-menu-item index="2-5" @click="toPage('/driverrating')">
                        <i class="el-icon-setting"></i>
                        <span slot="title">工作记录</span>
                    </el-menu-item>
                    <el-menu-item index="2-6" @click="toPage('/maintenance')">
                        <i class="el-icon-setting"></i>
                        <span slot="title">维修记录</span>
                    </el-menu-item>
                    <el-menu-item index="2-7" @click="toPage('/schedule')">
                        <i class="el-icon-setting"></i>
                        <span slot="title">排班表</span>
                    </el-menu-item>
                </el-submenu>
                <el-menu-item index="3" @click="toPage('/driver_auth')">
                    <i class="el-icon-document"></i>
                    <span slot="title">账号管理</span>
                </el-menu-item>
                <div class="logout-wrapper">
                    <div class="logout-container">
                        <el-link type="danger" :underline="false" icon="el-icon-switch-button" @click="handleLogout"
                            class="logout-link">
                            退出登录
                        </el-link>
                    </div>
                </div>
            </el-menu>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Header',
    data() {
        return {
            activeIndex: '1',
            isSystemManagementOpen: true, // 控制系统管理菜单的展开状态
        }
    },
    methods: {
        toPage(path) {
            if (this.$route.path != path) {
                this.$router.push({ path: path });
            }
        },
        handleSelect(index) {
            this.activeIndex = index; // 更新激活的菜单项
        },
        handleLogout() {
            this.$confirm('确定要退出登录吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                roundButton: true,
                customClass: 'logout-message-box' // 添加自定义class
            }).then(() => {
                // 清除登录状态
                this.$store.commit('setUserId', ''); // 修改这里
                this.$store.commit('setIsLogin', false);
                this.$store.commit('setRole', '');

                // 清除本地存储（如果使用了）
                localStorage.removeItem('user_id');
                localStorage.removeItem('islogin');
                localStorage.removeItem('role');

                // 跳转到登录页
                this.$router.push('/');

                this.$message({
                    type: 'success',
                    message: '退出成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消退出'
                });
            });
        },
    },
    watch: {
        '$route.path': {
            immediate: true,
            handler(newPath) {
                // 根据路由路径动态设置激活的菜单项
                if (newPath === '/driver') this.activeIndex = '2-1';
                else if (newPath === '/home') this.activeIndex = '1';
                else if (newPath === '/vehicle') this.activeIndex = '2-2';
                else if (newPath === '/route') this.activeIndex = '2-3';
                else if (newPath === '/site') this.activeIndex = '2-4';
                else if (newPath === '/driverrating') this.activeIndex = '2-5';
                else if (newPath === '/maintenance') this.activeIndex = '2-6';
                else if (newPath === '/schedule') this.activeIndex = '2-7';
                else if (newPath === '/driver_auth') this.activeIndex = '3';
            },
        },
    },
}
</script>

<style scoped>
.leftbody {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0;
    padding: 0;
    width: 20%;
    height: 100%;
    min-width: 200px;
    min-height: 500px;
    overflow: hidden;
}

.userava {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 20%;
    min-width: 200px;
    min-height: 100px;
    background-color: rgb(228, 243, 255);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.nav-container {
    width: 100%;
    height: 80%;
    min-width: 200px;
    min-height: 400px;
    padding: 5%;
    background-color: rgb(228, 243, 255);
}

.el-menu-vertical-demo {
    width: 90%;
    min-width: 180px;
    height: 100%;
    min-height: 400px;
    border-radius: 10px;
}

.el-menu-item,
.el-submenu__title {
    color: #303133;
    background-color: transparent !important;
}

.el-menu-item:hover,
.el-submenu__title:hover {
    background-color: #d2e9ff !important;
    color: #ffffff !important;
}

.el-menu-item.is-active,
.el-submenu.is-active .el-submenu__title {
    background-color: #ffffff !important;
    color: #50bff7 !important;
}

.el-menu-item span,
.el-submenu__title span {
    display: inline-block;
    width: 70px;
    text-align: left;
}


/* 新增退出按钮样式 */
.logout-wrapper {
    height: 60px;
    width: 100%;
    margin: 0;
    padding: 0;
}

.logout-container {
    position: absolute;
    bottom: 30px;
    left: 46%;
    transform: translateX(-50%);
    max-width: 200px;
    text-align: center;
}

.logout-link {
    color: #666 !important;
    padding: 10px 0;
}

.logout-link:hover {
    color: #f56c6c !important;
    background-color: transparent;
    text-decoration: underline;
}

.logout-link i {
    margin-right: 8px;
}

/* 调整导航容器高度 */
.nav-container {
    position: relative;
    height: calc(80% - 60px);
    /* 为退出链接留出空间 */
}

.logout-message-box {
    margin-top: -200px !important;
    /* 向上移动50px，可根据需要调整 */
}
</style>