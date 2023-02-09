<template>
  <div id="main8" style="width:800px;height: 400px;">

  </div>
</template>
<script>
import * as echarts from 'echarts';

export default {
  mounted() {
    var chartDom = document.getElementById('main8');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      title: {
        text: '成本结构图'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 1048, name: '人工' },
            { value: 735, name: '管理材料费用' },
            // { value: 580, name: 'Email' },
            // { value: 484, name: 'Union Ads' },
            { value: 300, name: '制造费用' }
          ]
        }
      ]
    };

    option && myChart.setOption(option);
  },
}
</script>