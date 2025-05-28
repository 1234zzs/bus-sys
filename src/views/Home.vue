<template>
  <div class="container">
    <Header></Header>
    <div class="centerbody">
      <Logo></Logo>
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
            <Work></Work>
          </div>
        </div>
      </div>
      <div class="bottom">
        <el-row :gutter="20"> <!-- 添加 gutter 为卡片添加间距 -->
          <el-col :span="6">
            <el-card shadow="hover" class="bottom-card" @click.native="todriver">
              <h3>司机</h3>
              {{ alldata.driver_number }}
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover" class="bottom-card" @click.native="tovehicle">
              <h3>车辆</h3>
              {{ alldata.vehicle_number }}
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover" class="bottom-card" @click.native="toroute">
              <h3>线路</h3>
              {{ alldata.route_number }}
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover" class="bottom-card" @click.native="tosite">
              <h3>站点</h3>
              {{ alldata.site_number }}
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Logo from '@/components/Logo.vue';
import Car from '@/components/Car.vue';
import Work from '@/components/Work.vue';

import axios from 'axios';

export default {
  name: 'Home',
  components: {
    Header,
    Logo,
    Car,
    Work,
  },
  data() {
    return {
      alldata: {
        driver_number: 0,
        vehicle_number: 0,
        round_number: 0,
        site_number: 0
      }
    }
  },
  computed: {
  },
  methods: {
    setScreenSize() {
      
    },

    fetchDrivers() {
      this.loading = true;
      axios.get('http://106.75.217.80:3334/bus-sys/getalldata') // 假设后端接口路径为 /api/drivers
        .then(response => {
          this.alldata = response.data;
          this.loading = false;
        })
        .catch(error => {
          this.loading = false;
          this.$message.error('网络请求失败！');
        });
    },

    todriver() {
      this.$router.push({ path: '/driver' });
    },
    tovehicle() {
      this.$router.push({ path: '/vehicle' });
    },
    toroute() {
      this.$router.push({ path: '/route' });
    },
    tosite() {
      this.$router.push({ path: '/site' });
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
  /* 水平居中 */
  align-items: center;
  /* 垂直居中 */
  height: 100%;
  width: 100%;
}

.el-card {
  border-radius: 20px !important;
  cursor: pointer;
}

.bottom-card {
  display: flex;
  justify-content: center;
  align-items: normal;
  height: 80%;
  width: 100%;
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