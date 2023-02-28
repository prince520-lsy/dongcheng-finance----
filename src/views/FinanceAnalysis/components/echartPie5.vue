<template>
  <div id="main9" style="width:576px;height: 400px; background-color: #fff;">

  </div>
</template>
<script>
import * as echarts from 'echarts';

export default {
  mounted() {
    var chartDom = document.getElementById('main9');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      title: {
        text: '销售费用',
        // subtext: 'Fake Data',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 1048, name: '项目一' },
            { value: 735, name: '项目二' },
            { value: 580, name: '项目三' },
            { value: 484, name: '项目四' },
            { value: 300, name: '项目五' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    option && myChart.setOption(option);
  },
}
</script>