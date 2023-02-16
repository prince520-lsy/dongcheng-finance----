<template>
  <div id="main413" style="width: 865px; height: 400px;">

</div>
</template>
<script>
import * as echarts from 'echarts';
import { axios } from '@/utils/request';
export default {
  methods: {
    initProfit() {
      axios.get('form/financialanalysis').then(res => {
        let Preroa = res.data.list.previousyear.roa
        let Lastroa = res.data.list.lastyear.roa
        let roa = res.data.list.thisyear.roa
        this.char = echarts.init(document.querySelector('#main413'))
        let option = {
          color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
          title: {
            text: '盈利能力'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          legend: {
            data: ['前年', '去年', '今年']
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '前年',
              type: 'line',
              stack: 'Total',
              smooth: true,
              lineStyle: {
                width: 0
              },
              showSymbol: false,
              areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgb(128, 255, 165)'
                  },
                  {
                    offset: 1,
                    color: 'rgb(1, 191, 236)'
                  }
                ])
              },
              emphasis: {
                focus: 'series'
              },
              data: Preroa
            },
            {
              name: '去年',
              type: 'line',
              stack: 'Total',
              smooth: true,
              lineStyle: {
                width: 0
              },
              showSymbol: false,
              areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgb(0, 221, 255)'
                  },
                  {
                    offset: 1,
                    color: 'rgb(77, 119, 255)'
                  }
                ])
              },
              emphasis: {
                focus: 'series'
              },
              data: Lastroa
            },
            {
              name: '今年',
              type: 'line',
              stack: 'Total',
              smooth: true,
              lineStyle: {
                width: 0
              },
              showSymbol: false,
              areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(250, 215, 115, 0.1, [
                  {
                    offset: 0,
                    color: 'rgb(55, 162, 255)'
                  },
                  {
                    offset: 1,
                    color: 'rgb(116, 21, 219)'
                  }
                ])
              },
              emphasis: {
                focus: 'series'
              },
              data: roa
            }
          ]
        };
        this.char.setOption(option)
      })
    }
  },
  created() {
    this.initProfit()
  },
  mounted() {
    // var chartDom = document.getElementById('main413');
    // var myChart = echarts.init(chartDom);
    // var option;

    // option = {
    //   color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
    //   title: {
    //     text: '盈利能力'
    //   },
    //   tooltip: {
    //     trigger: 'axis',
    //     axisPointer: {
    //       type: 'cross',
    //       label: {
    //         backgroundColor: '#6a7985'
    //       }
    //     }
    //   },
    //   legend: {
    //     data: ['前年', '去年', '今年']
    //   },
    //   toolbox: {
    //     feature: {
    //       saveAsImage: {}
    //     }
    //   },
    //   grid: {
    //     left: '3%',
    //     right: '4%',
    //     bottom: '3%',
    //     containLabel: true
    //   },
    //   xAxis: [
    //     {
    //       type: 'category',
    //       boundaryGap: false,
    //       data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    //     }
    //   ],
    //   yAxis: [
    //     {
    //       type: 'value'
    //     }
    //   ],
    //   series: [
    //     {
    //       name: '前年',
    //       type: 'line',
    //       stack: 'Total',
    //       smooth: true,
    //       lineStyle: {
    //         width: 0
    //       },
    //       showSymbol: false,
    //       areaStyle: {
    //         opacity: 0.8,
    //         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    //           {
    //             offset: 0,
    //             color: 'rgb(128, 255, 165)'
    //           },
    //           {
    //             offset: 1,
    //             color: 'rgb(1, 191, 236)'
    //           }
    //         ])
    //       },
    //       emphasis: {
    //         focus: 'series'
    //       },
    //       data: [140, 232, 101, 264, 90, 340, 250]
    //     },
    //     {
    //       name: '去年',
    //       type: 'line',
    //       stack: 'Total',
    //       smooth: true,
    //       lineStyle: {
    //         width: 0
    //       },
    //       showSymbol: false,
    //       areaStyle: {
    //         opacity: 0.8,
    //         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    //           {
    //             offset: 0,
    //             color: 'rgb(0, 221, 255)'
    //           },
    //           {
    //             offset: 1,
    //             color: 'rgb(77, 119, 255)'
    //           }
    //         ])
    //       },
    //       emphasis: {
    //         focus: 'series'
    //       },
    //       data: [120, 282, 111, 234, 220, 340, 310]
    //     },
    //     {
    //       name: '今年',
    //       type: 'line',
    //       stack: 'Total',
    //       smooth: true,
    //       lineStyle: {
    //         width: 0
    //       },
    //       showSymbol: false,
    //       areaStyle: {
    //         opacity: 0.8,
    //         color: new echarts.graphic.LinearGradient(250, 215, 115, 0.1, [
    //           {
    //             offset: 0,
    //             color: 'rgb(55, 162, 255)'
    //           },
    //           {
    //             offset: 1,
    //             color: 'rgb(116, 21, 219)'
    //           }
    //         ])
    //       },
    //       emphasis: {
    //         focus: 'series'
    //       },
    //       data: [320, 132, 201, 334, 190, 130, 220]
    //     }
    //   ]
    // };

    // option && myChart.setOption(option);
  },
}
</script>
<style lang="less" scoped>
#main413 {
  background-color: #fff;
}
</style>