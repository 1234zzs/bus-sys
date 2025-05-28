<template>
  <div class="container">
    <Header1></Header1>
    <div class="centerbody">
      <Logo></Logo>

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
          <el-form-item class="flex-item" style="width: 150;;">
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button type="primary" @click="back">重置</el-button>
          </el-form-item>

        </el-form>
      </div>
      <div class="formbox">
        <el-table :data="paginatedData" style="width: 90%" v-loading="loading" row-class-name="custom-row-class">
          <el-table-column v-for="(item, index) in columns" :key="index" :prop="item.prop" :label="item.label">
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
  name: 'ScheduleUser',
  components: {
    Header1,
    Logo
  },
  data() {
    return {
      loading: false,
      formLabelWidth: '120px',
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
</style>
