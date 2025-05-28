<template>
  <div id="main1"></div>
</template>

<script>
import * as echarts from 'echarts';
import axios from 'axios';

export default {
  data() {
    return {
      myChart: null, // 用于存储 ECharts 实例
      chartData: {
        categories: [], // X轴类别数据
        values: [] // Y轴数值数据
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.myChart = echarts.init(document.getElementById('main1'));
      this.fetchChartData();
    });
  },
  methods: {
    async fetchChartData() {
      try {
        const response = await axios.get('http://106.75.217.80:3334/bus-sys/getworkdata');
        const data = response.data;
        // 将获取到的数据转换为ECharts需要的格式
        this.chartData.categories = data.map(item => item.name);
        this.chartData.values = data.map(item => item.value);
        // 更新图表数据
        this.updateChart();
      } catch (error) {
        console.error('网络请求失败！', error);
      }
    },
    updateChart() {
      const option = {
         title: {
          text: '工作数据统计', // 标题文本
          left: 'center', // 标题位置，居中
          top: '5%', // 标题距离顶部位置
          textStyle: {
            fontSize: 18, // 标题字体大小
            fontWeight: 'bold', // 标题字体粗细
            color: '#333' // 标题字体颜色
          }},
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.chartData.categories,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '数目',
            type: 'bar',
            barWidth: '60%',
            data: this.chartData.values
          }
        ]
      };

      // 设置图表配置
      this.myChart.setOption(option);
    }
  }
};
</script>

<style scoped>
#main1 {
  width: 100%;
  height: 100%;
}
</style>