<template>
    <div class="container">
        <Header1 ref="header1"></Header1>
        <div class="centerbody">
            <Logo></Logo>

            <!--修改数据的对话框-->
            <el-dialog title="修改个人信息" :visible.sync="dialogeditFormVisible" :before-close="handleClose">
                <el-form :model="editform" :rules="rules" ref="editform">
                    <el-form-item label="司机编号" :label-width="formLabelWidth" prop="driver_id">
                        <el-input v-model="editform.driver_id" autocomplete="off" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="司机姓名" :label-width="formLabelWidth" prop="driver_name">
                        <el-input v-model="editform.driver_name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" :label-width="formLabelWidth" prop="gender">
                        <el-select v-model="editform.gender" placeholder="请选择性别" style="width: 100% ;">
                            <el-option label="男" value="男"></el-option>
                            <el-option label="女" value="女"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="入职时间" :label-width="formLabelWidth" prop="hire_date">
                        <el-date-picker v-model="editform.hire_date" type="date" placeholder="选择日期"
                            style="width: 100% ;">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="电话号码" :label-width="formLabelWidth" prop="phone_number">
                        <el-input v-model="editform.phone_number" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="年龄" :label-width="formLabelWidth" prop="age">
                        <el-input v-model.number="editform.age" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="户籍" :label-width="formLabelWidth" prop="residence">
                        <el-input v-model="editform.residence" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="closeeditdialog">取 消</el-button>
                    <el-button type="primary" @click="editData">确 定</el-button>
                </div>
            </el-dialog>




            <el-dialog title="修改账号信息" :visible.sync="dialogeditFormVisibleuser" :before-close="handleCloseuser">
                <el-form :model="editformuser" :rules="rules" ref="editformuser">
                    <el-form-item label="账号" :label-width="formLabelWidth" prop="driver_id">
                        <el-input v-model="editformuser.driver_id" autocomplete="off" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
                        <el-input v-model="editformuser.username" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
                        <el-input v-model="editformuser.password" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="closeeditdialoguser">取 消</el-button>
                    <el-button type="primary" @click="editDatauser">确 定</el-button>
                </div>
            </el-dialog>

            <div class="centerpart">
                <div class="picture">
                    <el-carousel :interval="5000" height="100%">
                        <el-carousel-item v-for="item in 4" :key="item">
                            <h3>图片待定{{ item }}</h3>
                        </el-carousel-item>
                    </el-carousel>
                </div>
                <div class="graphs">
                    <div class="car">
                        <Car></Car>
                    </div>
                    <div class="work">
                        <Work1></Work1>
                    </div>
                </div>
            </div>
            <div class="bottom">
                <el-row :gutter="20"> <!-- 添加 gutter 为卡片添加间距 -->
                    <el-col :span="24">
                        <el-card shadow="hover" class="bottom-card">
                            <div class="userxx">
                                <el-descriptions class="margin-top" title="个人信息" :column="3" border>
                                    <template slot="extra">
                                        <el-button type="primary" size="medium"
                                            @click="handleEdit(userform)">修改个人信息</el-button>
                                    </template>
                                    <el-descriptions-item>
                                        <template slot="label">
                                            <i class="el-icon-user"></i>
                                            姓名
                                        </template>
                                        {{ userform.driver_name }}
                                    </el-descriptions-item>
                                    <el-descriptions-item>
                                        <template slot="label">
                                            <i class="el-icon-mobile-phone"></i>
                                            性别
                                        </template>
                                        {{ userform.gender }}
                                    </el-descriptions-item>
                                    <el-descriptions-item>
                                        <template slot="label">
                                            <i class="el-icon-mobile-phone"></i>
                                            手机号
                                        </template>
                                        {{ userform.phone_number }}
                                    </el-descriptions-item>
                                    <el-descriptions-item>
                                        <template slot="label">
                                            <i class="el-icon-location-outline"></i>
                                            户籍
                                        </template>
                                        {{ userform.residence }}
                                    </el-descriptions-item>
                                    <el-descriptions-item>
                                        <template slot="label">
                                            <i class="el-icon-location-outline"></i>
                                            年龄
                                        </template>
                                        {{ userform.age }}
                                    </el-descriptions-item>
                                    <el-descriptions-item>
                                        <template slot="label">
                                            <i class="el-icon-location-outline"></i>
                                            入职时间
                                        </template>
                                        {{ userform.hire_date }}
                                    </el-descriptions-item>
                                </el-descriptions>
                            </div>
                            <div class="userzhanghao">
                                <el-descriptions class="margin-top" title="账号信息" :column="3" border>
                                    <template slot="extra">
                                        <el-button type="primary" size="medium"
                                            @click="handleEdituser(userzhanghao)">修改账号信息</el-button>
                                    </template>
                                    <el-descriptions-item>
                                        <template slot="label">
                                            <i class="el-icon-user"></i>
                                            账号
                                        </template>
                                        {{ userzhanghao.driver_id }}
                                    </el-descriptions-item>
                                    <el-descriptions-item>
                                        <template slot="label">
                                            <i class="el-icon-mobile-phone"></i>
                                            用户名
                                        </template>
                                        {{ userzhanghao.username }}
                                    </el-descriptions-item>
                                    <el-descriptions-item>
                                        <template slot="label">
                                            <i class="el-icon-mobile-phone"></i>
                                            密码
                                        </template>
                                        {{ userzhanghao.password }}
                                    </el-descriptions-item>
                                </el-descriptions>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
import Header1 from '@/components/Header1.vue';
import Logo from '@/components/Logo.vue';
import Car from '@/components/Car.vue';
import Work1 from '@/components/Work1.vue';

import axios from 'axios';

export default {
    name: 'User',
    components: {
        Header1,
        Logo,
        Car,
        Work1,
    },
    data() {
        return {
            formLabelWidth: '120px',
            dialogeditFormVisible: false,
            dialogeditFormVisibleuser: false,
            driverform: {
                driver_id: '',
            },
            userform: {
                driver_id: '',
                driver_name: '',
                gender: '',
                hire_date: '',
                phone_number: '',
                age: '',
                residence: '',
            },
            editform: {
                driver_id: '',
                driver_name: '',
                gender: '',
                hire_date: '',
                phone_number: '',
                age: '',
                residence: '',
            },
            tempeditform: {
                driver_id: '',
                driver_name: '',
                gender: '',
                hire_date: '',
                phone_number: '',
                age: '',
                residence: '',
            },
            editformuser: {
                driver_id: '',
                username: '',
                password: '',
            },
            tempeditformuser: {
                driver_id: '',
                username: '',
                password: '',
            },
            userzhanghao: {
                driver_id: '',
                username: '',
                password: '',
            },
            rules: {
                driver_id: [
                    { required: true, message: "请输入司机编号", trigger: 'blur' },
                    { min: 0, max: 100, message: "长度n个字符", trigger: 'blur' },
                ],
                driver_name: [
                    { required: true, message: "请输入姓名", trigger: 'blur' },
                    {
                        pattern: /^[a-zA-Z\u4e00-\u9fa5]+$/,
                        message: "姓名不能包含特殊符号",
                        trigger: 'blur'
                    },
                ],
                gender: [
                    { required: true, message: "请选择性别", trigger: 'blur' },
                ],
                hire_date: [
                    { required: true, message: "请选择入职时间", trigger: 'blur' },
                ],
                phone_number: [
                    { required: true, message: "请输入电话号码", trigger: 'blur' },
                    { min: 11, max: 11, message: "格式不正确", trigger: 'blur' },
                    { pattern: /^[0-9]+$/, message: "只能输入0-9的数字", trigger: 'blur' },
                ],
                age: [
                    { required: true, message: "请输入年龄", trigger: 'blur' },
                    { type: 'number', message: "年龄必须是数字", trigger: 'blur' },
                    {
                        validator: (rule, value, callback) => {
                            if (value < 20 || value > 60) {
                                callback(new Error("年龄必须在20到60之间"));
                            } else {
                                callback();
                            }
                        },
                        trigger: 'blur'
                    },
                ],
                residence: [
                    { required: true, message: "请输入户籍", trigger: 'blur' },
                ],
                driver_id: [
                    { required: true, message: '请输入司机编号', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ],
            }
        }
    },
    computed: {
    },
    methods: {
        setScreenSize() {
            
        },

        fetchDrivers() {
            this.driverform.driver_id = this.$store.state.user_id;
            axios.post('http://106.75.217.80:3334/bus-sys/getuserdriver', this.driverform)
                .then(response => {
                    this.userform = response.data;
                })
                .catch(error => {
                    this.$message.error('网络请求失败！');
                });
        },

        fetchUser() {
            this.driverform.driver_id = this.$store.state.user_id;
            axios.post('http://106.75.217.80:3334/bus-sys/getuser', this.driverform)
                .then(response => {
                    this.userzhanghao = response.data;
                })
                .catch(error => {
                    this.$message.error('网络请求失败！');
                });
        },
        handleEdit(userform) {
            if (this.$refs.editform) {
                this.$nextTick(() => {
                    this.$refs.editform.resetFields();
                });
            }
            this.editform = { ...userform };
            this.tempeditform = { ...userform };
            this.dialogeditFormVisible = true;
        },

        closeeditdialog() {
            this.editform = { ...this.tempeditform };
            this.dialogeditFormVisible = false;
        },
        handleClose(done) {
            this.editform = { ...this.tempeditform }; // 恢复原始数据
            done(); // 关闭对话框
        },

        editData() {
            this.$refs.editform.validate((valid, errors) => {
                if (valid) {
                    axios.post('http://106.75.217.80:3334/bus-sys/editdriver', this.editform)
                        .then((response) => {
                            let data = response.data;
                            if (data.success) {
                                this.fetchDrivers(); // 重新获取司机数据列表
                                this.dialogeditFormVisible = false;
                                //console.log(this.addform);
                                this.$message({
                                    message: '修改成功',
                                    type: 'success'
                                });
                                this.fetchDrivers();
                            } else {
                                this.$message.error(data.message || '修改失败');
                            }
                        }).catch((error) => {
                            this.$message.error('网络请求失败！');
                        })
                } else {
                    this.$message.error('请正确填写信息！');
                }
            });
        },



        handleEdituser(userzhanghao) {
            if (this.$refs.editformuser) {
                this.$nextTick(() => {
                    this.$refs.editformuser.resetFields();
                });
            }
            this.editformuser = { ...userzhanghao };
            this.tempeditformuser = { ...userzhanghao };
            this.dialogeditFormVisibleuser = true;
        },

        closeeditdialoguser() {
            this.editformuser = { ...this.tempeditformuser };
            this.dialogeditFormVisibleuser = false;
        },
        handleCloseuser(done) {
            this.editformuser = { ...this.tempeditformuser }; // 恢复原始数据
            done(); // 关闭对话框
        },

        editDatauser() {
            this.$refs.editformuser.validate((valid, errors) => {
                if (valid) {
                    axios.post('http://106.75.217.80:3334/bus-sys/editdriver_auth', this.editformuser)
                        .then((response) => {
                            let data = response.data;
                            if (data.success) {
                                this.fetchDrivers(); // 重新获取司机数据列表
                                this.dialogeditFormVisibleuser = false;
                                //console.log(this.addform);
                                this.$message({
                                    message: '修改成功',
                                    type: 'success'
                                });
                                this.$refs.header1.getusername();
                                this.fetchUser();
                            } else {
                                this.$message.error(data.message || '修改失败');
                            }
                        }).catch((error) => {
                            this.$message.error('网络请求失败！');
                        })
                } else {
                    this.$message.error('请正确填写信息！');
                }
            });
        },
    },
    mounted() {
        this.setScreenSize();
        this.fetchDrivers();
        this.fetchUser();
    },
}
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  width: 100%;
  min-width: 1400px;
  height: 900px;
  margin: 0;
  padding: 0;
  background-color: rgb(228, 243, 255);
  top: 0;
  left: 0;
}

.centerbody {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0;
    padding: 0;
    width: 80%;
    height: 100%;
    min-width: 800px;
    min-height: 500px;
    background-color: #ffffff;
}

.centerpart {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0;
    padding: 0px;
    width: 100%;
    height: 60%;
    min-width: 800px;
    min-height: 300px;
    background-color: rgb(228, 243, 255);
}

.bottom {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 35%;
    min-width: 800px;
    min-height: 175px;
    background-color: rgb(228, 243, 255);
}

.el-row {
    display: flex;
    justify-content: center;
    /* 水平居中 */
    align-items: center;
    /* 垂直居中 */
    height: 100%;
    width: 100%;
}

.el-col {
    display: flex;
    justify-content: center;
    /* 水水平居中 */
    align-items: center;
    /* 垂直居中 */
    height: 100%;
    width: 100%;
}

.el-card {
    border-radius: 20px !important;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    height: 90%;
    margin-top: 20px;
    /* 上边距 */
    margin-bottom: 20px;
    /* 下边距 */
}

.bottom-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 90%;
    min-height: 300px;
}

.userxx {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 60%;
    min-height: 0; /* 防止内容溢出 */
}

.userzhanghao {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 40%;
    min-height: 0; /* 防止内容溢出 */
}

/* 确保描述组件内部也能自适应高度 */
.el-descriptions {
    height: 100%;
}

/* 描述项容器 */
.el-descriptions__body {
    height: 100%;
    display: flex;
    flex-direction: column;
}

/* 表格主体 */
.el-descriptions__table {
    flex: 1;
    height: 0; /* 让表格可以伸缩 */
}

.el-descriptions-item__container {
    height: 100%;
    overflow: auto;
}

.picture {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px;
    padding: 0;
    width: 85%;
    height: 100%;
    min-width: 600px;
    min-height: 300px;
    background-color: rgb(228, 243, 255);
}

.picture:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    /* 鼠标悬浮时的阴影效果 */
}

.graphs {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px;
    padding: 0;
    width: 25%;
    height: 100%;
    min-width: 200px;
    min-height: 300px;
    background-color: rgb(228, 243, 255);
}

.car {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0;
    padding: 0;
    margin: 0 0 5px 0;
    width: 100%;
    height: 48%;
    min-width: 160px;
    min-height: 144px;
    background-color: rgb(255, 255, 255);
    border-radius: 20px;
}

.car:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    /* 鼠标悬浮时的阴影效果 */
}

.work {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0;
    padding: 0;
    margin: 5px 0 0 0;
    width: 100%;
    height: 48%;
    min-width: 160px;
    min-height: 144px;
    background-color: rgb(255, 255, 255);
    border-radius: 20px;
}

.work:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    /* 鼠标悬浮时的阴影效果 */
}

.el-carousel {
    width: 100%;
    height: 100%;
}

.el-carousel__item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}

.el-carousel__item:nth-child(4n) {
    background-color: #ffd78e !important;
}

.el-carousel__item:nth-child(4n+1) {
    background-color: #ffc7f1 !important;
}

.el-carousel__item:nth-child(4n+2) {
    background-color: #c8f6ff !important;
}

.el-carousel__item:nth-child(4n+3) {
    background-color: #d0ffcd !important;
}
</style>