<template>
  <div id="main2" class="prorortion">
    折线图
  </div>
</template>
<script>
import * as echarts from 'echarts';
import { axios } from '@/utils/request';
export default {
  mounted() {
    // var chartDom = document.getElementById('main2');
    // var myChart = echarts.init(chartDom);
    // var option;
    // option = {
    //   title: {
    //     text: ''
    //   },
    //   tooltip: {
    //     trigger: 'axis'
    //   },
    //   legend: {
    //     data: ['收入', '成本', '毛利', '管理费用', '销售费用', '财务费用', '利润']
    //   },
    //   grid: {
    //     left: '3%',
    //     right: '4%',
    //     bottom: '3%',
    //     containLabel: true
    //   },
    //   toolbox: {
    //     feature: {
    //       // saveAsImage: {}
    //     }
    //   },
    //   xAxis: {
    //     type: 'category',
    //     boundaryGap: false,
    //     data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    //   },
    //   yAxis: {
    //     type: 'value'
    //   },
    //   series: [

    //     {
    //       name: '收入',
    //       type: 'line',
    //       stack: 'Total',
    //       data: [320, 332, 301, 334, 390, 330, 320]
    //     },
    //     {
    //       name: '成本',
    //       type: 'line',
    //       stack: 'Total',
    //       data: [820, 932, 901, 934, 1290, 1330, 1320]
    //     },
    //     {
    //       name: '毛利',
    //       type: 'line',
    //       stack: 'Total',
    //       data: [820, 932, 901, 934, 1290, 1330, 1320]
    //     },
    //     {
    //       name: '管理费用',
    //       type: 'line',
    //       stack: 'Total',
    //       data: [820, 932, 901, 934, 1290, 1330, 1320]
    //     },
    //     {
    //       name: '销售费用',
    //       type: 'line',
    //       stack: 'Total',
    //       data: [820, 932, 901, 934, 1290, 1330, 1320]
    //     },
    //     {
    //       name: '财务费用',
    //       type: 'line',
    //       stack: 'Total',
    //       data: [820, 932, 901, 934, 1290, 1330, 1320]
    //     },
    //     {
    //       name: '利润',
    //       type: 'line',
    //       stack: 'Total',
    //       data: [820, 932, 901, 934, 1290, 1330, 1320]
    //     },

    //   ]
    // };

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