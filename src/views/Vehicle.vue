<template>
  <div class="container">
    <Header></Header>
    <div class="centerbody">
      <Logo></Logo>








      <!--新建数据的对话框-->
      <el-dialog title="新建数据" :visible.sync="dialogaddFormVisible">
        <el-form :model="addform" :rules="rules" ref="addform">
          <el-form-item label="车辆编号" :label-width="formLabelWidth" prop="vehicle_id">
            <el-input v-model="addform.vehicle_id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="使用年限" :label-width="formLabelWidth" prop="vehicle_age">
            <el-input v-model="addform.vehicle_age" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="当前状态" :label-width="formLabelWidth" prop="current_status">
            <el-select v-model="addform.current_status" placeholder="请选择状态" style="width: 100% ;">
              <el-option label="正常" value="正常"></el-option>
              <el-option label="维修中" value="维修中"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="座位数" :label-width="formLabelWidth" prop="seat_count">
            <el-input v-model="addform.seat_count" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="启用时间" :label-width="formLabelWidth" prop="start_date">
            <el-date-picker v-model="addform.start_date" type="date" placeholder="选择日期" style="width: 100% ;">
            </el-date-picker>
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
          <el-form-item label="车辆编号" :label-width="formLabelWidth" prop="vehicle_id">
            <el-input v-model="editform.vehicle_id" autocomplete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="使用年限" :label-width="formLabelWidth" prop="vehicle_age">
            <el-input v-model="editform.vehicle_age" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="当前状态" :label-width="formLabelWidth" prop="current_status">
            <el-select v-model="editform.current_status" placeholder="请选择状态" style="width: 100% ;">
              <el-option label="正常" value="正常"></el-option>
              <el-option label="维修中" value="维修中"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="座位数" :label-width="formLabelWidth" prop="seat_count">
            <el-input v-model="editform.seat_count" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="启用时间" :label-width="formLabelWidth" prop="start_date">
            <el-date-picker v-model="editform.start_date" type="date" placeholder="选择日期" style="width: 100% ;">
            </el-date-picker>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeeditdialog">取 消</el-button>
          <el-button type="primary" @click="editData">确 定</el-button>
        </div>
      </el-dialog>



      <el-dialog title="车辆信息" :visible.sync="dialogwatchVisible" width="60%" class="watch-dialog">
        <div>
          <el-tabs v-model="activeName" >
            <el-tab-pane label="行驶记录" name="first">
              <el-table :data="tablerunData" style="width: 100%" height="500">
                <el-table-column v-for="(item, index) in runcolumns" :key="index" :prop="item.prop" :label="item.label">
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="维修记录" name="second">
              <el-table :data="tablefixData" style="width: 100%" height="500">
                <el-table-column v-for="(item, index) in fixcolumns" :key="index" :prop="item.prop" :label="item.label">
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-dialog>


















      <div class="findbox">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item class="flex-item" style="flex: 2;">
            <el-select v-model="formInline.searchColumn" placeholder="请选择查询列">
              <el-option label="车辆编号" value="vehicle_id"></el-option>
              <el-option label="使用年限" value="vehicle_age"></el-option>
              <el-option label="当前状态" value="current_status"></el-option>
              <el-option label="座位数" value="seat_count"></el-option>
              <el-option label="启用日期" value="start_date"></el-option>
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
          <el-table-column align="right" width="270">
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
  name: 'Vehicle',
  components: {
    Header,
    Logo
  },
  data() {
    return {
      dialogaddFormVisible: false,
      dialogeditFormVisible: false,
      dialogwatchVisible: false,
      loading: false,
      activeName: 'first',
      formLabelWidth: '120px',
      addform: {
        vehicle_id: '',
        vehicle_age: '',
        current_status: '',
        seat_count: '',
        start_date: '',
      },
      editform: {
        vehicle_id: '',
        vehicle_age: '',
        current_status: '',
        seat_count: '',
        start_date: '',
      },
      tempeditform: {
        vehicle_id: '',
        vehicle_age: '',
        current_status: '',
        seat_count: '',
        start_date: '',
      },
      watchform: {
        vehicle_id: '',
        vehicle_age: '',
        current_status: '',
        seat_count: '',
        start_date: '',
      },
      formInline: {
        finddata: '',
        searchColumn: 'vehicle_id',
      },
      tableData: [], // 原始数据
      tablerunData: [], // 行使数据
      tablefixData: [], // 维修数据
      // 列定义
      columns: [
        { label: '车辆编号', prop: 'vehicle_id' },
        { label: '使用年限', prop: 'vehicle_age' },
        { label: '当前状况', prop: 'current_status' },
        { label: '座位数', prop: 'seat_count' },
        { label: '启用日期', prop: 'start_date' },
      ],

      runcolumns: [
        { label: '编号', prop: 'rating_id' },
        { label: '司机编号', prop: 'driver_id' },
        { label: '线路编号', prop: 'route_id' },
        { label: '轮次', prop: 'round_number' },
        { label: '行使日期', prop: 'rating_date' },
      ],
      fixcolumns: [
        { label: '维修编号', prop: 'maintenance_id' },
        { label: '维修人员', prop: 'handler' },
        { label: '维修地点', prop: 'maintenance_location' },
        { label: '完成状态', prop: 'completion_status' },
        { label: '维修日期', prop: 'maintenance_date' },
      ],

      currentPage: 1, // 当前页码
      pageSize: 11,// 每页显示的条数
      isSearching: false,
      displayedData: [],
      loading: false,
      rules: {
        vehicle_id: [
          { required: true, message: '请输入车辆编号', trigger: 'blur' },
        ],
        vehicle_age: [
          { required: true, message: '请输入使用年限', trigger: 'blur' },
        ],
        current_status: [
          { required: true, message: '请输入当前状况', trigger: 'blur' },
        ],
        seat_count: [
          { required: true, message: '请输入座位数', trigger: 'blur' },
        ],
        start_date: [
          { required: true, message: '请输入启用日期', trigger: 'blur' },
        ]
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
      //console.log(this.addform);
      this.$refs.addform.validate((valid, errors) => {
        if (valid) {
          axios.post('http://106.75.217.80:3334/bus-sys/addvehicle', this.addform)
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
      this.activeName = 'first';
      this.whachform = row;
      axios.post('http://106.75.217.80:3334/bus-sys/getvehiclerun', row).then(response => {
        this.tablerunData = response.data;
      }).catch((error) => {
        this.$message.error('网络请求失败！');
      })
      axios.post('http://106.75.217.80:3334/bus-sys/getvehiclefix', row).then(response => {
        this.tablefixData = response.data;
      }).catch((error) => {
        this.$message.error('网络请求失败！');
      })
      this.dialogwatchVisible = true;
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
      //console.log(this.editform);
      this.$refs.editform.validate((valid, errors) => {
        if (valid) {
          axios.post('http://106.75.217.80:3334/bus-sys/editvehicle', this.editform)
            .then((response) => {
              let data = response.data;
              if (data.success) {
                this.fetchDrivers(); // 重新获取车辆数据列表
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
        axios.post('http://106.75.217.80:3334/bus-sys/deletevehicle', row)
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
      axios.get('http://106.75.217.80:3334/bus-sys/getvehicle')
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
  min-width: 1500px;
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

.watch-dialog {
  text-align: left;
}

.logout-message-box {
  margin-top: -200px !important;
  /* 向上移动50px，可根据需要调整 */
}
</style>
