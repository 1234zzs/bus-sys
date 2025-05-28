<template>
    <div id="main"></div>
</template>

<script>
import * as echarts from 'echarts';
import axios from 'axios';

export default {
    data() {
        return {
            myChart: null, // 用于存储 ECharts 实例
            chartData: [] // 用于存储从后端获取的数据
        };
    },
    mounted() {
        this.$nextTick(() => {
            this.myChart = echarts.init(document.getElementById('main'));
            this.fetchChartData();
        });
    },
    methods: {
        async fetchChartData() {
            try {
                const response = await axios.get('http://106.75.217.80:3334/bus-sys/getcardata');
                const data = response.data;
                // 将获取到的数据转换为 ECharts 可识别的格式并存储到 chartData 中
                this.chartData = data.map(item => ({ name: item.name, value: item.value }));
                // 更新图表数据
                this.updateChart();
            } catch (error) {
                console.error('网络请求失败！', error);
                // 如果你使用了 Element Plus 或其他支持 $message 的UI库，可以取消注释以下行
                // this.$message.error('网络请求失败！');
            }
        },
        updateChart() {
            // 定义图表配置
            const option = {
                title: {
                    text: '车辆状态图', // 标题文本
                    left: 'center', // 标题位置，居中
                    top: '5%', // 标题距离容器顶部的距离
                    textStyle: {
                        fontSize: 18, // 标题字体大小
                        fontWeight: 'bold', // 标题字体粗细
                        color: '#333' // 标题字体颜色
                    }
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    bottom: '3%',
                    left: 'center'
                },
                series: [
                    {
                        name: '数目',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderRadius: 10,
                            borderColor: '#fff',
                            borderWidth: 2
                        },
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: 20,
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: this.chartData // 使用从后端获取的数据
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
#main {
    width: 100%;
    height: 100%;
}
</style>