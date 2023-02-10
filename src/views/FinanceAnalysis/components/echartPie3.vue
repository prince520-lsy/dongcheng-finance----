<template>
  <div id="main7" style="width:850px;height: 400px; background-color: #fff;">

  </div>
</template>
<script>
import * as echarts from 'echarts';

export default {
  mounted() {
    var chartDom = document.getElementById('main7');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      title: {
        text: '成本费用结构图',
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
            { value: 1048, name: '服务费用' },
            { value: 735, name: '管理费用' },
            { value: 580, name: '营收费用' },
            // { value: 484, name: 'Union Ads' },
            { value: 300, name: '经营费用' }
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