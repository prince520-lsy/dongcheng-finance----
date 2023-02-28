<template>
  <div id="main9" style="width:576px;height: 400px; background-color: #fff;">

  </div>
</template>
<script>
import * as echarts from 'echarts';
import { axios } from '@/utils/request';
export default {
  methods: {
    initEchartPie5() {
      axios.get('form/Month').then(res => {
        let sellingexpenses = res.data.cost.costdetails.sellingexpenses[0].bnjf
        console.log('sellingexpenses', sellingexpenses);
        this.char = echarts.init(document.querySelector('#main9'))
        let option = {
          title: {
            text: '销售费用明细',
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
                { value: sellingexpenses, name: '运杂费' },

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
        this.char.setOption(option)
      })
    }
  },
  created() {
    this.initEchartPie5()
  },
  // mounted() {
  //   var chartDom = document.getElementById('main9');
  //   var myChart = echarts.init(chartDom);
  //   var option;

  //   option = {
  //     title: {
  //       text: '销售费用明细',
  //       // subtext: 'Fake Data',
  //       left: 'center'
  //     },
  //     tooltip: {
  //       trigger: 'item'
  //     },
  //     legend: {
  //       orient: 'vertical',
  //       left: 'left'
  //     },
  //     series: [
  //       {
  //         name: 'Access From',
  //         type: 'pie',
  //         radius: '50%',
  //         data: [
  //           { value: 1048, name: '项目一' },
  //           { value: 735, name: '项目二' },
  //           { value: 580, name: '项目三' },
  //           { value: 484, name: '项目四' },
  //           { value: 300, name: '项目五' }
  //         ],
  //         emphasis: {
  //           itemStyle: {
  //             shadowBlur: 10,
  //             shadowOffsetX: 0,
  //             shadowColor: 'rgba(0, 0, 0, 0.5)'
  //           }
  //         }
  //       }
  //     ]
  //   };

  //   option && myChart.setOption(option);
  // },
}
</script>