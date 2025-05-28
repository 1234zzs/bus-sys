<template>
  <div class="container">
    <Header></Header>
    <div class="centerbody">
      <Logo></Logo>








      <!--新建数据的对话框-->
      <el-dialog title="新建数据" :visible.sync="dialogaddFormVisible">
        <el-form :model="addform" :rules="rules" ref="addform">
          <el-form-item label="司机编号" :label-width="formLabelWidth" prop="driver_id">
            <el-input v-model="addform.driver_id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="司机姓名" :label-width="formLabelWidth" prop="driver_name">
            <el-input v-model="addform.driver_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth" prop="gender">
            <el-select v-model="addform.gender" placeholder="请选择性别" style="width: 100% ;">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="入职时间" :label-width="formLabelWidth" prop="hire_date">
            <el-date-picker v-model="addform.hire_date" type="date" placeholder="选择日期" style="width: 100% ;">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="电话号码" :label-width="formLabelWidth" prop="phone_number">
            <el-input v-model="addform.phone_number" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="年龄" :label-width="formLabelWidth" prop="age">
            <el-input v-model.number="addform.age" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="户籍" :label-width="formLabelWidth" prop="residence">
            <el-input v-model="addform.residence" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogaddFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addData">确 定</el-button>
        </div>
      </el-dialog>







      <!--修改数据的对话框-->
      <el-dialog title="修改数据" :visible.sync="dialogeditFormVisible" :before-close="handleClose">
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
            <el-date-picker v-model="editform.hire_date" type="date" placeholder="选择日期" style="width: 100% ;">
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









      <!--工作记录对话框-->
      <el-dialog title="工作记录" :visible.sync="dialogworkVisible" width="60%" class="work-dialog"
        >
        <div class="work-dialog-content">
          <div class="driverxx">
            <el-descriptions class="margin-top" title="" :column="3" size="" border>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-user"></i>
                  司机姓名
                </template>
                <span class="workdialogp">{{ whachform.driver_name }}</span>
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-user"></i>
                  性别
                </template>
                {{ whachform.gender }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-user"></i>
                  年龄
                </template>
                {{ whachform.age }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-mobile-phone_number"></i>
                  电话号码
                </template>
                {{ whachform.phone_number }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-office-building"></i>
                  户籍
                </template>
                {{ whachform.residence }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
          <div class="driverworkform">
            <el-table :data="tableworkData" class="work-table" style="width: 100%" height="400">
              <el-table-column v-for="(item, index) in workcolumns" :key="index" :prop="item.prop" :label="item.label">
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-dialog>











      <div class="findbox">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item class="flex-item" style="flex: 2;">
            <el-select v-model="formInline.searchColumn" placeholder="请选择查询列">
              <el-option label="司机编号" value="driver_id"></el-option>
              <el-option label="姓名" value="driver_name"></el-option>
              <el-option label="性别" value="gender"></el-option>
              <el-option label="入职时间" value="hire_date"></el-option>
              <el-option label="电话号码" value="phone_number"></el-option>
              <el-option label="年龄" value="age"></el-option>
              <el-option label="户籍" value="residence"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="flex-item" style="flex: 4;">
            <el-input v-model="formInline.finddata" placeholder="请输入" style="width: 100% ;"></el-input>
          </el-form-item>
          <el-form-item class="flex-item" style="width: 210;;">
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button type="primary" @click="back">重置</el-button>
            <el-button type="primary" @click="add">新增</el-button>
          </el-form-item>

        </el-form>
      </div>
      <div class="formbox">
        <el-table :data="paginatedData" style="width: 90%" v-loading="loading" row-class-name="custom-row-class">
          <el-table-column v-for="(item, index) in columns" :key="index" :prop="item.prop" :label="item.label">
          </el-table-column>
          <el-table-column align="right" width="210">
            <template slot-scope="scope">
              <el-button size="mini" @click="handlewatch(scope.row)">查看</el-button>
              <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="pagebox">
        <el-pagination :page-size=pageSize :pager-count="7" layout="total,prev, pager, next,jumper"
          :total=displayedData.length @current-change="handleCurrentChange" :current-page="currentPage">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Logo from '@/components/Logo.vue';
import axios from 'axios';

export default {
  name: 'Driver',
  components: {
    Header,
    Logo
  },
  data() {
    return {
      dialogaddFormVisible: false,
      dialogeditFormVisible: false,
      dialogworkVisible: false,
      loading: false,
      formLabelWidth: '120px',
      addform: {
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
      whachform: {
        driver_id: '',
        driver_name: '',
        gender: '',
        hire_date: '',
        phone_number: '',
        age: '',
        residence: '',
      },
      formInline: {
        finddata: '',
        searchColumn: 'driver_id',
      },
      tableData: [], // 原始数据
      tableworkData: [], // 工作记录数据
      // 列定义
      columns: [
        { label: '司机编号', prop: 'driver_id' },
        { label: '姓名', prop: 'driver_name' },
        { label: '性别', prop: 'gender' },
        { label: '入职时间', prop: 'hire_date' },
        { label: '电话号码', prop: 'phone_number' },
        { label: '年龄', prop: 'age' },
        { label: '户籍', prop: 'residence' },
      ],
      workcolumns: [
        { label: '评级编号', prop: 'rating_id' },
        { label: '车辆编号', prop: 'vehicle_id' },
        { label: '工作日期', prop: 'rating_date' },
        { label: '工作线路', prop: 'route_id' },
        { label: '轮次', prop: 'round_number' },
        { label: '评级系数', prop: 'rating_code' },
        { label: '评估指标', prop: 'evaluation_number' },
        { label: '拥挤程度', prop: 'is_crowded' },
      ],
      currentPage: 1, // 当前页码
      //currentworkPage: 1, // 当前页码
      pageSize: 11,// 每页显示的条数
      //workpageSize: 7,// 每页显示的条数
      isSearching: false,
      displayedData: [],
      //displayedworkData: [],
      loading: false,
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
      }
    };
  },
  computed: {
    // 计算当前页的数据
    paginatedData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.displayedData.slice(start, end);
    },

  },
  methods: {

    setScreenSize() {
      this.pageSize = Math.floor(((900 * 0.7) - 45) / 55);
    },

    formatDate(date) {
      if (!date) return null; // 如果日期为空，返回 null
      return new Date(date); // 将字符串转换为 Date 对象
    },
    onSubmit() {
      this.currentPage = 1;
      if (this.formInline.finddata) {
        const lowerCaseFindData = this.formInline.finddata.toLowerCase();
        this.displayedData = this.tableData.filter(item =>
          item[this.formInline.searchColumn]?.toString().toLowerCase().includes(lowerCaseFindData)
        );
        this.isSearching = true; // 设置查询标志
      } else {
        this.displayedData = this.tableData; // 如果没有查询条件，显示全部数据
        this.isSearching = false; // 清除查询标志
      }
    },

    back() {
      this.displayedData = this.tableData;
      this.formInline.finddata = '';
    },

    add() {
      this.dialogaddFormVisible = true;
      this.$nextTick(() => {
        this.$refs.addform.resetFields();
      });
    },
    addData() {
      this.addform.hire_date = this.formatDate(this.addform.hire_date);
      //console.log(this.addform);
      this.$refs.addform.validate((valid, errors) => {
        if (valid) {
          axios.post('http://106.75.217.80:3334/bus-sys/adddriver', this.addform)
            .then((response) => {
              let data = response.data;
              if (data.success) {
                this.fetchDrivers(); // 重新获取司机数据列表
                this.dialogaddFormVisible = false;
                //console.log(this.addform);
                this.$message({
                  message: '添加成功',
                  type: 'success'
                });
              } else {
                this.$message.error(data.message || '添加失败');
              }
            }).catch((error) => {
              this.$message.error('网络请求失败！');
            })
        } else {
          this.$message.error('请正确填写信息！');
        }
      }
      );
    },

    handlewatch(row) {
      this.whachform = row;
      axios.post('http://106.75.217.80:3334/bus-sys/getdriverwork', row).then(response => {
        this.tableworkData = response.data;
        //console.log(response.data);
        //console.log(response.data);
      }).catch((error) => {
        this.$message.error('网络请求失败！');
      })
      this.dialogworkVisible = true;
    },

    handleEdit(row) {
      if (this.$refs.editform) {
        this.$nextTick(() => {
          this.$refs.editform.resetFields();
        });
      }
      this.editform = { ...row };
      this.tempeditform = { ...row };
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
      this.editform.hire_date = this.formatDate(this.editform.hire_date);
      //console.log(this.editform);
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

    handleDelete(row) {
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        roundButton: true,
        customClass: 'logout-message-box' // 添加自定义class
      }).then(() => {
        axios.post('http://106.75.217.80:3334/bus-sys/deletedriver', row)
          .then((response) => {
            //console.log("删除行数据",row);
            let data = response.data;
            if (data.success) {
              this.fetchDrivers();
              this.$message({
                message: '删除成功',
                type: 'success'
              });
            } else {
              this.$message.error(data.message || '删除失败');
            }
          }).catch((error) => {
            this.$message.error('网络请求失败！');
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    handleCurrentChange(newPage) {
      this.currentPage = newPage;
    },

    handleCurrentworkChange(newPage) {
      this.currentworkPage = newPage;
    },


    fetchDrivers() {
      this.loading = true;
      axios.get('http://106.75.217.80:3334/bus-sys/getdriver') // 假设后端接口路径为 /api/drivers
        .then(response => {
          //console.log('Response data:', response.data);
          this.tableData = response.data; // 将后端返回的数据赋值给 tableData
          this.displayedData = this.tableData; // 初始化显示全部数据
          //console.log('displayedData:', this.displayedData);
          //console.log('paginatedData:', this.paginatedData);
          this.loading = false;
        })
        .catch(error => {
          this.loading = false;
          this.$message.error('网络请求失败！');
        });
    },

  },
  mounted() {
    this.setScreenSize();
    this.fetchDrivers();
  },
}
</script>

<style >
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


.findbox {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 20%;
  min-width: 800px;
  min-height: 100px;
  background-color: #ffffff;
}

.demo-form-inline {
  display: flex;
  align-items: center;
  width: 80%;
  background-color: #ffffff;
}

.flex-item {
  display: flex;
  align-items: center;
  justify-content: center;
}

.flex-item .el-form-item__content {
  width: 100% !important;
}

.formbox {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 70%;
  min-height: 350px;
  background-color: #ffffff;
}

.el-table__header {
  height: 45px !important;
  /* 设置表头高度 */
}

.custom-row-class {
  height: 55px !important;
  /* 设置固定的行高 */
}

.pagebox {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 10%;
  min-width: 800px;
  min-height: 50px;
  background-color: #ffffff;
}

.work-dialog {
  text-align: left;
  /* 对齐整个对话框内容 */
}

.work-dialog-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* 对齐内容到左侧 */
}

.driverxx {
  width: 100%;
  height: 30%;
}

.driverworkform {
  width: 100%;
  height: 70%;
}

.workdialogp {
  margin-bottom: 10px;
  font-size: 18px;
}


.el-dialog__title {
  font-size: 25px !important;
  /* 设置标题字体大小 */
  font-weight: bold;
  /* 设置标题字体加粗 */
}

.logout-message-box {
  margin-top: -200px !important;
  /* 向上移动50px，可根据需要调整 */
}
</style>
