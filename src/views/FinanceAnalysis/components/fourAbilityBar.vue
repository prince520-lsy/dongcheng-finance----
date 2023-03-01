<template>
  <div id="mainId1">

  </div>
</template>
<script>
import * as echarts from 'echarts';
export default {
  mounted() {
    var chartDom = document.getElementById('mainId1');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      title: {
        text: '四大能力指标分值分析图'
      },
      xAxis: {
        type: 'category',
        data: ['一、盈利能力分析', '二、运营能力分析', '三、偿债能力分析', '四、成长能力分析']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [

            {
              value: 82,
              itemStyle: {
                color: '#fde74c'
              }
            },
            {
              value: 87,
              itemStyle: {
                color: '#fb7920'
              }
            },
            {
              value: 77,
              itemStyle: {
                color: '#9bc53d'
              }
            },
            {
              value: 72,
              itemStyle: {
                color: '#f45b68'
              }
            },

          ],
          type: 'bar'
        }
      ]
    };

    option && myChart.setOption(option);
  },
}
</script>
<style lang="less" scoped>
#mainId1 {
  width: 1730px;
  height: 520px;
}
</style>