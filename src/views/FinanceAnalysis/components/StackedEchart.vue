<template>
  <div id="main">

  </div>
</template>
<script>
import * as echarts from 'echarts';
export default {
  mounted() {
    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      title: {
        text: '分析图',
        subtext: '单位/万元'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        }
      },
      // toolbox: {
      //   feature: {
      //     dataView: { show: true, readOnly: false },
      //     magicType: { show: true, type: ['line', 'bar'] },
      //     restore: { show: true },
      //     saveAsImage: { show: true }
      //   }
      // },
      legend: {
        data: ['收入', '材料成本', '税负率', '行业税率']
      },
      xAxis: [
        {
          type: 'category',
          data: [
            '1月',
            '2月',
            '3月',
            '4月',
            '5月',
            '6月',
            '7月',
            '8月',
            '9月',
            '10月',
            '11月',
            '12月'
          ],
          axisPointer: {
            type: 'shadow'
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '',
          min: 0,
          max: 1000,
          interval: 250,
          axisLabel: {
            formatter: '{value}'
          }
        },
        {
          type: 'value',
          // name: 'Temperature',
          min: 0,
          max: 25,
          interval: 5,
          axisLabel: {
            formatter: ''
          }
        }
      ],
      series: [
        {
          name: '收入',
          type: 'bar',
          tooltip: {
            valueFormatter: function (value) {
              return value + ' ml';
            }
          },
          data: [
            680, 693, 370, 670, 660, 760, 490, 700, 900, 230, 760, 260
          ]
        },
        {
          name: '材料成本',
          type: 'bar',
          tooltip: {
            valueFormatter: function (value) {
              return value + ' ml';
            }
          },
          data: [
            760, 190, 230, 610, 510, 100, 230, 120, 710, 480, 800, 370
          ]
        },
        {
          name: '税负率',
          type: 'line',
          yAxisIndex: 1,
          tooltip: {
            valueFormatter: function (value) {
              return value + ' °C';
            }
          },
          data: [6, 7, 7, 7, 9, 7, 7, 9, 8, 8, 7, 8]
        },
        {
          name: '行业税率',
          type: 'line',
          yAxisIndex: 1,
          tooltip: {
            valueFormatter: function (value) {
              return value + ' °C';
            }
          },
          data: [6.0, 5.2, 6.3, 6.7, 6.3, 8.2, 9.3, 3.4, 8.0, 6.5, 12.0, 6.2]
        }
      ]
    };

    option && myChart.setOption(option);
  },
}
</script>
<style lang="less" scoped>
#main {
  width: 1730px;
  height: 500px;
}
</style>