<template>
  <div class="container">
    <Header></Header>
    <div class="centerbody">
      <Logo></Logo>








      <!--新建数据的对话框-->
      <el-dialog title="新建数据" :visible.sync="dialogaddFormVisible">
        <el-form :model="addform" :rules="rules" ref="addform">
          <el-form-item label="线路编号" :label-width="formLabelWidth" prop="route_id">
            <el-input v-model="addform.route_id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="线路名" :label-width="formLabelWidth" prop="route_name">
            <el-input v-model="addform.route_name" autocomplete="off"></el-input>
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
          <el-form-item label="线路名" :label-width="formLabelWidth" prop="route_name">
            <el-input v-model="editform.route_name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeeditdialog">取 消</el-button>
          <el-button type="primary" @click="editData">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="线路信息" :visible.sync="dialogRSVVisible" width="60%" class="RSV-dialog">
        <div>
          <el-descriptions class="margin-top" title="" :column="3" size="" border>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-user"></i>
                线路编号
              </template>
              {{ whachform.route_id }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-user"></i>
                线路名
              </template>
              {{ whachform.route_name }}
            </el-descriptions-item>
          </el-descriptions>
        </div>
        <div class="RSVform">
          <el-table :data="tableRSVData" class="RSV-table" style="width: 100%" height="500">
            <el-table-column v-for="(item, index) in RSVcolumns" :key="index" :prop="item.prop" :label="item.label">
            </el-table-column>
            <el-table-column align="right" width="150">
              <template slot-scope="scope">
                <el-button size="mini" @click="RSVedit(scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="RSVdelete(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="RSVadd">添加</el-button>
        </div>
      </el-dialog>

      <el-dialog title="修改站点序号" :visible.sync="dialogeditRSVVisible">
        <el-form :model="editsiteform" :rules="rules" ref="editsiteform">
          <el-form-item label="线路编号" :label-width="formLabelWidth" prop="route_id">
            <el-input v-model="editsiteform.route_id" autocomplete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="站点编号" :label-width="formLabelWidth" prop="site_id">
            <el-input v-model="editsiteform.site_id" autocomplete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="站点名" :label-width="formLabelWidth" prop="site_name">
            <el-input v-model="editsiteform.site_name" autocomplete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="站点序号" :label-width="formLabelWidth" prop="sequence_number">
            <el-input v-model="editsiteform.sequence_number" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogeditRSVVisible = false">取 消</el-button>
          <el-button type="primary" @click="RSVeditData()">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="添加站点" :visible.sync="dialogaddRSVVisible">
        <el-form :model="addsiteform" :rules="rules" ref="addsiteform">
          <el-form-item label="线路编号" :label-width="formLabelWidth" prop="route_id">
            <el-input v-model="addsiteform.route_id" autocomplete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="站点编号" :label-width="formLabelWidth" prop="site_id">
            <el-input v-model="addsiteform.site_id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="站点序号" :label-width="formLabelWidth" prop="sequence_number">
            <el-input v-model="addsiteform.sequence_number" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogaddRSVVisible = false">取 消</el-button>
          <el-button type="primary" @click="RSVaddData()">确 定</el-button>
        </div>
      </el-dialog>

      <div class="findbox">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item class="flex-item" style="flex: 2;">
            <el-select v-model="formInline.searchColumn" placeholder="请选择查询列">
              <el-option label="线路编号" value="route_id"></el-option>
              <el-option label="线路名" value="route_name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="flex-item" style="flex: 4;">
            <el-input v-model="formInline.finddata" placeholder="请输入" style="width: 100% ;"></el-input>
          </el-form-item>
          <el-form-item class="flex-item" style="width: 210;">
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
  name: 'Route',
  components: {
    Header,
    Logo
  },
  data() {
    return {
      dialogaddFormVisible: false,
      dialogeditFormVisible: false,
      dialogRSVVisible: false,
      dialogaddRSVVisible: false,
      dialogeditRSVVisible: false,
      loading: false,
      formLabelWidth: '120px',
      addform: {
        route_id: '',
        route_name: '',
      },
      addsiteform: {
        route_id: '',
        site_id: '',
        sequence_number: ''
      },
      addsiteformblank: {
        route_id: '',
        site_id: '',
        sequence_number: ''
      },
      editform: {
        route_id: '',
        route_name: '',
      },
      editsiteform: {
        route_id: '',
        site_id: '',
        site_name: '',
        sequence_number: ''
      },
      tempeditform: {
        route_id: '',
        route_name: '',
      },
      whachform: {
        route_id: '',
        route_name: '',
      },
      formInline: {
        finddata: '',
        searchColumn: 'route_id',
      },
      tableData: [], // 原始数据
      tableRSVData: [], // 工作记录数据
      // 列定义
      columns: [
        { label: '线路编号', prop: 'route_id' },
        { label: '线路名', prop: 'route_name' },
      ],
      RSVcolumns: [
        { label: '线路编号', prop: 'route_id' },
        { label: '站点编号', prop: 'site_id' },
        { label: '站点名', prop: 'site_name' },
        { label: '站点序号', prop: 'sequence_number' }
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
        route_name: [
          { required: true, message: '请输入线路名', trigger: 'blur' },
        ]
      },

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
          axios.post('http://106.75.217.80:3334/bus-sys/addroute', this.addform)
            .then((response) => {
              let data = response.data;
              if (data.success) {
                this.fetchDrivers();
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
      axios.post('http://106.75.217.80:3334/bus-sys/getRSV', row).then(response => {
        this.tableRSVData = response.data;
      }).catch((error) => {
        this.$message.error('网络请求失败！');
      })
      this.dialogRSVVisible = true;
    },

    RSVedit(row) {
      this.editsiteform = row;
      this.dialogeditRSVVisible = true;
    },

    RSVeditData() {
      this.$refs.editsiteform.validate((valid, errors) => {
        if (valid) {
          axios.post('http://106.75.217.80:3334/bus-sys/editRS', this.editsiteform)
            .then((response) => {
              let data = response.data;
              if (data.success) {
                this.dialogeditRSVVisible = false;
                this.$message({
                  message: '修改成功',
                  type: 'success'
                });
                this.fetchRSVData(this.whachform);
              } else {
                this.$message.error(data.message || '添加失败');
              }
            }).catch((error) => {
              this.$message.error('网络请求失败！');
            })
        } else {
          this.$message.error('请正确填写信息！');
        }
      });
    },
    RSVadd() {
      this.addsiteform = { ...this.addsiteformblank }; // 使用展开运算符重置
      console.log(this.addsiteform);
      this.addsiteform.route_id = this.whachform.route_id;
      this.dialogaddRSVVisible = true;
    },

    RSVaddData() {
      this.$refs.addsiteform.validate((valid, errors) => {
        if (valid) {
          axios.post('http://106.75.217.80:3334/bus-sys/addRS', this.addsiteform)
            .then((response) => {
              let data = response.data;
              if (data.success) {
                this.dialogaddRSVVisible = false;
                this.$message({
                  message: '添加成功',
                  type: 'success'
                });
                // 重新获取站点数据
                this.fetchRSVData(this.whachform);
              } else {
                this.$message.error(data.message || '添加失败');
              }
            }).catch((error) => {
              this.$message.error('网络请求失败！');
            })
        } else {
          this.$message.error('请正确填写信息！');
        }
      });
    },

    // 添加一个方法来获取站点数据
    fetchRSVData(row) {
      axios.post('http://106.75.217.80:3334/bus-sys/getRSV', row).then(response => {
        this.tableRSVData = response.data;
      }).catch((error) => {
        this.$message.error('网络请求失败！');
      });
    },

    RSVdelete(row) {
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        roundButton: true,
        customClass: 'logout-message-box' // 添加自定义class
      }).then(() => {
        axios.post('http://106.75.217.80:3334/bus-sys/deleteRS', row)
          .then((response) => {
            let data = response.data;
            if (data.success) {
              this.$message({
                message: '删除成功',
                type: 'success'
              });
              // 重新获取站点数据
              this.fetchRSVData(this.whachform);
            } else {
              this.$message.error(data.message || '删除失败');
            }
          }).catch((error) => {
            this.$message.error('网络请求失败！');
          });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
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
          axios.post('http://106.75.217.80:3334/bus-sys/editroute', this.editform)
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
        axios.post('http://106.75.217.80:3334/bus-sys/deleteroute', row)
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
      axios.get('http://106.75.217.80:3334/bus-sys/getroute') // 假设后端接口路径为 /api/drivers
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

.RSV-dialog {
  text-align: left;
  /* 对齐整个对话框内容 */
}

.RSV-dialog-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* 对齐内容到左侧 */
}

.driverxx {
  width: 100%;
  height: 30%;
}

.RSVform {
  width: 100%;
  height: 70%;
  min-height: 411.67px;
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
