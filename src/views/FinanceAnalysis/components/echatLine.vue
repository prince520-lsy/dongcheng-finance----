<template>
  <div id="main2" class="prorortion">
    折线图
  </div>
</template>
<script>
import * as echarts from 'echarts';
export default {
  mounted() {
    var chartDom = document.getElementById('main2');
    var myChart = echarts.init(chartDom);
    var option;
    console.log(13, chartDom);
    option = {
      title: {
        text: '完成率  同期对比增长率'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['完成率', '同期对比增长率']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          // saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['1月', '2月', '3月', '4月', '5月', '6月']
      },
      yAxis: {
        type: 'value'
      },
      series: [

        {
          name: '完成率',
          type: 'line',
          stack: 'Total',
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: '同期对比增长率',
          type: 'line',
          stack: 'Total',
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
      ]
    };

    option && myChart.setOption(option);
  },

}



</script>

<style lang="less" scoped>
#main2 {
  width: 800px;
  height: 400px;

}
</style>