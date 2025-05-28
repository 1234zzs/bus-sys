<template>
  <div class="container">
    <Header></Header>
    <div class="centerbody">
      <Logo></Logo>








      <el-dialog title="新建数据" :visible.sync="dialogaddFormVisible">
        <el-form :model="addform" :rules="rules" ref="addform">
          <el-form-item label="线路编号" :label-width="formLabelWidth" prop="route_id">
            <el-input v-model="addform.route_id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="轮次" :label-width="formLabelWidth" prop="round_number">
            <el-input v-model="addform.round_number" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="车辆编号" :label-width="formLabelWidth" prop="vehicle_id">
            <el-input v-model="addform.vehicle_id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="发车时间" :label-width="formLabelWidth" prop="departure_time">
            <el-time-picker v-model="addform.departure_time" format="HH:mm" value-format="HH:mm:00" placeholder="选择时间"
              style="width: 100%;">
            </el-time-picker>
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
          <el-form-item label="线路编号" :label-width="formLabelWidth" prop="route_id">
            <el-input v-model="editform.route_id" autocomplete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="轮次" :label-width="formLabelWidth" prop="round_number">
            <el-input v-model="editform.round_number" autocomplete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="车辆编号" :label-width="formLabelWidth" prop="vehicle_id">
            <el-input v-model="editform.vehicle_id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="发车时间" :label-width="formLabelWidth" prop="departure_time">
            <el-time-picker v-model="editform.departure_time" format="HH:mm" value-format="HH:mm:00" placeholder="选择时间"
              style="width: 100% ;">
            </el-time-picker>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeeditdialog">取 消</el-button>
          <el-button type="primary" @click="editData">确 定</el-button>
        </div>
      </el-dialog>

      <div class="findbox">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item class="flex-item" style="flex: 2;">
            <el-select v-model="formInline.searchColumn" placeholder="请选择查询列">
              <el-option label="线路编号" value="route_id"></el-option>
              <el-option label="轮次" value="round_number"></el-option>
              <el-option label="车辆编号" value="vehicle_id"></el-option>
              <el-option label="发车时间" value="departure_time"></el-option>
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
          <el-table-column align="right" width="150">
            <template slot-scope="scope">
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
  name: 'Schedule',
  components: {
    Header,
    Logo
  },
  data() {
    return {
      dialogaddFormVisible: false,
      dialogeditFormVisible: false,
      loading: false,
      formLabelWidth: '120px',
      addform: {
        route_id: '',
        departure_time: '',
        vehicle_id: '',
        round_number: '',
      },
      editform: {
        route_id: '',
        departure_time: '',
        vehicle_id: '',
        round_number: '',
      },
      tempeditform: {
        route_id: '',
        departure_time: '',
        vehicle_id: '',
        round_number: '',
      },
      formInline: {
        finddata: '',
        searchColumn: 'route_id',
      },
      tableData: [], // 原始数据
      // 列定义
      columns: [
        { label: '线路编号', prop: 'route_id' },
        { label: '轮次', prop: 'round_number' },
        { label: '车辆编号', prop: 'vehicle_id' },
        { label: '发车时间', prop: 'departure_time' },
      ],
      currentPage: 1, // 当前页码
      pageSize: 11,// 每页显示的条数
      isSearching: false,
      displayedData: [],
      loading: false,
      rules: {
        route_id: [
          { required: true, message: '请输入线路编号', trigger: 'blur' },
        ],
        departure_time: [
          { required: true, message: '请选择出发时间', trigger: 'change' },
        ],
        vehicle_id: [
          { required: true, message: '请输入车辆编号', trigger: 'blur' },
        ],
        round_number: [
          { required: true, message: '请输入轮次', trigger: 'blur' },
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
          axios.post('http://106.75.217.80:3334/bus-sys/addschedule', this.addform)
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
          axios.post('http://106.75.217.80:3334/bus-sys/editschedule', this.editform)
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
        axios.post('http://106.75.217.80:3334/bus-sys/deleteschedule', row)
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

    fetchDrivers() {
      this.loading = true;
      axios.get('http://106.75.217.80:3334/bus-sys/getschedule') // 假设后端接口路径为 /api/drivers
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

.logout-message-box {
  margin-top: -200px !important;
  /* 向上移动50px，可根据需要调整 */
}
</style>
