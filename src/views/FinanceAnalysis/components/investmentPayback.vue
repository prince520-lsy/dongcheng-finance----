<template>
  <div id="main5" style="width: 800px; height: 400px;">

  </div>
</template>
<script>
import * as echarts from 'echarts';

export default {
  mounted() {
    var chartDom = document.getElementById('main5');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      title: {
        text: '投资回报率',
        // subtext: 'Fake Data',
        left: 'left'
      },
      tooltip: {
        // trigger: 'item'
      },
      legend: {
        // orient: 'vertical',
        // left: 'left'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 1048, name: '今年' },
            { value: 735, name: '去年' },
            { value: 580, name: '前年' }
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
<style lang="less" scoped>
#main5 {
  background-color: #fff;
}
</style>