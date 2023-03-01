<template>
  <div id="mainId1">

  </div>
</template>
<script>
import * as echarts from 'echarts';
import { axios } from '@/utils/request';
export default {
  methods: {
    initMainId1() {
      axios.get('form/financialriskreport').then(res => {
        let analyticalvalue = res.data.analyticalvalue
        this.char = echarts.init(document.querySelector('#mainId1'))
        let option = {
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
                  value: analyticalvalue[0],
                  itemStyle: {
                    color: '#fde74c'
                  }
                },
                {
                  value: analyticalvalue[1],
                  itemStyle: {
                    color: '#fb7920'
                  }
                },
                {
                  value: analyticalvalue[2],
                  itemStyle: {
                    color: '#9bc53d'
                  }
                },
                {
                  value: analyticalvalue[3],
                  itemStyle: {
                    color: '#f45b68'
                  }
                },

              ],
              type: 'bar'
            }
          ]
        };
        this.char.setOption(option)
      })
    }
  },
  created() {
    this.initMainId1()
  },
  // mounted() {
  //   var chartDom = document.getElementById('mainId1');
  //   var myChart = echarts.init(chartDom);
  //   var option;

  //   option = {
  //     title: {
  //       text: '四大能力指标分值分析图'
  //     },
  //     xAxis: {
  //       type: 'category',
  //       data: ['一、盈利能力分析', '二、运营能力分析', '三、偿债能力分析', '四、成长能力分析']
  //     },
  //     yAxis: {
  //       type: 'value'
  //     },
  //     series: [
  //       {
  //         data: [

  //           {
  //             value: 82,
  //             itemStyle: {
  //               color: '#fde74c'
  //             }
  //           },
  //           {
  //             value: 87,
  //             itemStyle: {
  //               color: '#fb7920'
  //             }
  //           },
  //           {
  //             value: 77,
  //             itemStyle: {
  //               color: '#9bc53d'
  //             }
  //           },
  //           {
  //             value: 72,
  //             itemStyle: {
  //               color: '#f45b68'
  //             }
  //           },

  //         ],
  //         type: 'bar'
  //       }
  //     ]
  //   };

  //   option && myChart.setOption(option);
  // },
}
</script>
<style lang="less" scoped>
#mainId1 {
  width: 1730px;
  height: 520px;
}
</style>