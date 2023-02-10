<template>
  <div id="main3" style="width: 850px; height: 400px;">

  </div>
</template>
<script>
import * as echarts from 'echarts';

export default {
  mounted() {
    var chartDom = document.getElementById('main3');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      title: {
        text: '运营能力'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // Use axis to trigger tooltip
          type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
        }
      },
      legend: {},
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value'
      },
      yAxis: {
        type: 'category',
        data: ['6月', '5月', '4月', '3月', '2月', '1月']
      },
      series: [
        {
          name: '今年',
          type: 'bar',
          stack: 'total',
          label: {
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: [320, 302, 301, 334, 390, 330, 320]
        },
        {
          name: '去年',
          type: 'bar',
          stack: 'total',
          label: {
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: '前年',
          type: 'bar',
          stack: 'total',
          label: {
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: [220, 182, 191, 234, 290, 330, 310]
        }
      ]
    };

    option && myChart.setOption(option);
  },
}
</script>
<style lang="less" scoped>
#main3 {
  background-color: #fff;
}
</style>