<template>
  <div id="main5" style="width:850px;height: 400px;background-color: #fff;">

  </div>
</template>
<script>
import * as echarts from 'echarts';
import { axios } from '@/utils/request';

export default {
  methods: {
    initPie1() {
      axios.get('form/Profits').then(res => {
        console.log("resProfit", res);

        let interestrate = res.data.interestrate.interestrate
        console.log("interestrate", interestrate);
        let profitmargin = res.data.profitmargin.profitmargin
        console.log("profitmargin", profitmargin);
        this.char = echarts.init(document.querySelector('#main5'))

        let option = {
          title: {
            text: '毛利率'
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
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
              },
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
                { value: 1048, name: '预算' },
                { value: interestrate, name: '实际' }
              ]
            }
          ]
        };
        this.char.setOption(option)
      })
    }
  },
  created() {
    this.initPie1()
  },
  // mounted() {
  //   var chartDom = document.getElementById('main5');
  //   var myChart = echarts.init(chartDom);
  //   var option;

  //   option = {
  //     title: {
  //       text: '毛利率'
  //     },
  //     tooltip: {
  //       trigger: 'item'
  //     },
  //     legend: {
  //       top: '5%',
  //       left: 'center'
  //     },
  //     series: [
  //       {
  //         name: 'Access From',
  //         type: 'pie',
  //         radius: ['40%', '70%'],
  //         avoidLabelOverlap: false,
  //         itemStyle: {
  //           borderRadius: 10,
  //           borderColor: '#fff',
  //           borderWidth: 2
  //         },
  //         label: {
  //           show: false,
  //           position: 'center'
  //         },
  //         emphasis: {
  //           label: {
  //             show: true,
  //             fontSize: 40,
  //             fontWeight: 'bold'
  //           }
  //         },
  //         labelLine: {
  //           show: false
  //         },
  //         data: [
  //           { value: 1048, name: '预算' },
  //           { value: 735, name: '实际' }
  //         ]
  //       }
  //     ]
  //   };

  //   option && myChart.setOption(option);
  // },
}
</script>