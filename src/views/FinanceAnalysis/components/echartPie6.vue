<template>
  <div id="main951" style="width:576px;height: 400px; background-color: #fff;">

  </div>
</template>
<script>
import * as echarts from 'echarts';
import { axios } from '@/utils/request';
export default {
  methods: {
    initEchartPie6() {
      axios.get('form/Month').then(res => {
        let bnjf = res.data.cost.costdetails.administrativeexpenses[0].bnjf
        let bnjf1 = res.data.cost.costdetails.administrativeexpenses[1].bnjf
        let bnjf2 = res.data.cost.costdetails.administrativeexpenses[2].bnjf
        let bnjf3 = res.data.cost.costdetails.administrativeexpenses[3].bnjf
        let bnjf4 = res.data.cost.costdetails.administrativeexpenses[4].bnjf
        let bnjf5 = res.data.cost.costdetails.administrativeexpenses[5].bnjf
        let bnjf6 = res.data.cost.costdetails.administrativeexpenses[6].bnjf
        let bnjf7 = res.data.cost.costdetails.administrativeexpenses[7].bnjf
        let bnjf8 = res.data.cost.costdetails.administrativeexpenses[8].bnjf
        let bnjf9 = res.data.cost.costdetails.administrativeexpenses[9].bnjf
        console.log("bnjf", bnjf);
        this.char = echarts.init(document.querySelector('#main951'))
        let option = {
          title: {
            text: '管理费用明细',
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
                { value: bnjf, name: '办公费' },
                { value: bnjf1, name: '交通费' },
                { value: bnjf2, name: '餐费' },
                { value: bnjf3, name: '差旅费' },
                { value: bnjf4, name: '社保' },
                { value: bnjf5, name: '个税' },
                { value: bnjf6, name: '印花税' },
                { value: bnjf7, name: '工资' },
                { value: bnjf8, name: '维修费' },
                { value: bnjf9, name: '汽车使用费' },

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
    this.initEchartPie6()
  },
  // mounted() {
  //   var chartDom = document.getElementById('main951');
  //   var myChart = echarts.init(chartDom);
  //   var option;

  //   option = {
  //     title: {
  //       text: '管理费用明细',
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
  //           { value: bnjf, name: '办公费' },
  //           { value: bnjf1, name: '交通费' },
  //           { value: bnjf2, name: '餐费' },
  //           { value: bnjf3, name: '差旅费' },
  //           { value: bnjf4, name: '社保' },
  //           { value: bnjf5, name: '个税' },
  //           { value: bnjf6, name: '印花税' },
  //           { value: bnjf7, name: '工资' },
  //           { value: bnjf8, name: '维修费' },
  //           { value: bnjf9, name: '汽车使用费' },

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