<template>
  <div class="container">
    <Header1></Header1>
    <div class="centerbody">
      <Logo></Logo>

      <!--修改数据的对话框-->
      <el-dialog title="修改数据" :visible.sync="dialogeditFormVisible" :before-close="handleClose">
        <el-form :model="editform"  ref="editform">
          <el-form-item label="编号" :label-width="formLabelWidth" prop="rating_id">
            <el-input v-model="editform.rating_id" autocomplete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="司机编号" :label-width="formLabelWidth" prop="driver_id">
            <el-input v-model="editform.driver_id" autocomplete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="线路编号" :label-width="formLabelWidth" prop="route_id">
            <el-input v-model="editform.route_id" autocomplete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="线路轮次" :label-width="formLabelWidth" prop="round_number">
            <el-input v-model="editform.round_number" autocomplete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="评级日期" :label-width="formLabelWidth" prop="rating_date" >
            <el-date-picker v-model="editform.rating_date" type="date" placeholder="选择日期" style="width: 100% ;"disabled>
            </el-date-picker>
          </el-form-item>
          <el-form-item label="评级系数" :label-width="formLabelWidth" prop="rating_code">
            <el-select v-model="editform.rating_code" placeholder="请选择" style="width: 100% ;"disabled>
              <el-option label="A" value="A"></el-option>
              <el-option label="B" value="B"></el-option>
              <el-option label="C" value="C"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="评估指标" :label-width="formLabelWidth" prop="evaluation_number">
            <el-input v-model="editform.evaluation_number" autocomplete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="拥挤程度" :label-width="formLabelWidth" prop="is_crowded">
            <el-select v-model="editform.is_crowded" placeholder="请选择是否拥挤" style="width: 100% ;">
              <el-option label="拥挤" value="拥挤"></el-option>
              <el-option label="正常" value="正常"></el-option>
            </el-select>
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
              <el-option label="编号" value="rating_id"></el-option>
              <el-option label="车辆编号" value="vehicle_id"></el-option>
              <el-option label="线路编号" value="route_id"></el-option>
              <el-option label="线路轮次" value="round_number"></el-option>
              <el-option label="评级日期" value="rating_date"></el-option>
              <el-option label="评级系数" value="rating_code"></el-option>
              <el-option label="评估指标" value="evaluation_number"></el-option>
              <el-option label="是否拥挤" value="is_crowded"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="flex-item" style="flex: 4;">
            <el-input v-model="formInline.finddata" placeholder="请输入" style="width: 100% ;"></el-input>
          </el-form-item>
          <el-form-item class="flex-item" style="width: 140;">
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button type="primary" @click="back">重置</el-button>
          </el-form-item>

        </el-form>
      </div>
      <div class="formbox">
        <el-table :data="paginatedData" style="width: 90%" v-loading="loading" row-class-name="custom-row-class">
          <el-table-column v-for="(item, index) in columns" :key="index" :prop="item.prop" :label="item.label">
          </el-table-column>
          <el-table-column align="right" width="70">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
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
import Header1 from '@/components/Header1.vue';
import Logo from '@/components/Logo.vue';
import axios from 'axios';

export default {
  name: 'DriverRatingUser',
  components: {
    Header1,
    Logo
  },
  data() {
    return {
      dialogaddFormVisible: false,
      dialogeditFormVisible: false,
      loading: false,
      formLabelWidth: '120px',
      userform:{
        driver_id: '',
      },
      editform: {
        rating_id: '',
        driver_id: '',
        route_id: '',
        round_number: '',
        rating_date: '',
        rating_code: '',
        evaluation_number: '',
        is_crowded: '',
      },
      tempeditform: {
        rating_id: '',
        driver_id: '',
        route_id: '',
        round_number: '',
        rating_date: '',
        rating_code: '',
        evaluation_number: '',
        is_crowded: '',
      },
      formInline: {
        finddata: '',
        searchColumn: 'rating_id',
      },
      tableData: [], // 原始数据
      // 列定义
      columns: [
        { label: '编号', prop: 'rating_id' },
        { label: '司机编号', prop: 'driver_id' },
        { label: '司机姓名', prop: 'driver_name' },
        { label: '车辆编号', prop: 'vehicle_id' },
        { label: '线路编号', prop: 'route_id' },
        { label: '线路轮次', prop: 'round_number' },
        { label: '评级日期', prop: 'rating_date' },
        { label: '评级系数', prop: 'rating_code' },
        { label: '评估指标', prop: 'evaluation_number' },
        { label: '拥挤程度', prop: 'is_crowded' },
      ],
      currentPage: 1, // 当前页码
      pageSize: 11,// 每页显示的条数
      isSearching: false,
      displayedData: [],
      loading: false,
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
      console.log(this.editform);
      this.$refs.editform.validate((valid, errors) => {
        if (valid) {
          axios.post('http://106.75.217.80:3334/bus-sys/editdriverrating', this.editform)
            .then((response) => {
              let data = response.data;
              if (data.success) {
                this.fetchDrivers(); // 重新获取数据列表
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

    handleCurrentChange(newPage) {
      this.currentPage = newPage;
    },


    fetchDrivers() {
      this.loading = true;
      this.userform.driver_id=this.$store.state.user_id;
      axios.post('http://106.75.217.80:3334/bus-sys/getdriverratinguser',this.userform) // 假设后端接口路径为 /api/drivers
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

.logout-message-box {
  margin-top: -200px !important;
  /* 向上移动50px，可根据需要调整 */
}
</style>
