<template>
  <div id="main6" style="width:850px;height: 400px;background-color: #fff;">

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
        this.char = echarts.init(document.querySelector('#main6'))
        let option = {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
            data: [
              'Direct',
              'Marketing',
              'Search Engine',
              'Email',
              'Union Ads',
              'Video Ads',
              'Baidu',
              'Google',
              'Bing',
              'Others'
            ]
          },
          series: [
            {
              name: '预算',
              type: 'pie',
              selectedMode: 'single',
              radius: [0, '30%'],
              label: {
                position: 'center',
                fontSize: 36
              },
              labelLine: {
                show: false
              },
              data: [
                { value: 1548, name: '净利率' },

              ]
            },
            {
              name: 'Access From',
              type: 'pie',
              radius: ['45%', '60%'],
              labelLine: {
                length: 30
              },
              label: {
                formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                backgroundColor: '#F6F8FC',
                borderColor: '#8C8D8E',
                borderWidth: 1,
                borderRadius: 4,
                rich: {
                  a: {
                    color: '#6E7079',
                    lineHeight: 22,
                    align: 'center'
                  },
                  hr: {
                    borderColor: '#8C8D8E',
                    width: '100%',
                    borderWidth: 1,
                    height: 0
                  },
                  b: {
                    color: '#4C5058',
                    fontSize: 14,
                    fontWeight: 'bold',
                    lineHeight: 33
                  },
                  per: {
                    color: '#fff',
                    backgroundColor: '#4C5058',
                    padding: [3, 4],
                    borderRadius: 4
                  }
                }
              },
              data: [
                { value: profitmargin, name: '实际' },
                { value: 335, name: '预算' },

              ]
            }
          ]
        };
        // let option = {
        //   title: {
        //     text: '毛利率'
        //   },
        //   tooltip: {
        //     trigger: 'item'
        //   },
        //   legend: {
        //     top: '5%',
        //     left: 'center'
        //   },
        //   series: [
        //     {
        //       name: 'Access From',
        //       type: 'pie',
        //       radius: ['40%', '70%'],
        //       avoidLabelOverlap: false,
        //       itemStyle: {
        //         borderRadius: 10,
        //         borderColor: '#fff',
        //         borderWidth: 2
        //       },
        //       label: {
        //         show: false,
        //         position: 'center'
        //       },
        //       emphasis: {
        //         label: {
        //           show: true,
        //           fontSize: 40,
        //           fontWeight: 'bold'
        //         }
        //       },
        //       labelLine: {
        //         show: false
        //       },
        //       data: [
        //         { value: 1048, name: '预算' },
        //         { value: profitmargin, name: '实际' }
        //       ]
        //     }
        //   ]
        // };
        this.char.setOption(option)
      })
    }
  },
  created() {
    this.initPie1()
  },
  // mounted() {
  //   var chartDom = document.getElementById('main6');
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





<!-- <template>
  <div id="main6" style="width:865px;height: 400px;background-color: #fff;">

  </div>
</template>
<script>
import * as echarts from 'echarts';

export default {
  mounted() {
    var chartDom = document.getElementById('main6');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      title: {
        text: '净利率'
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
            { value: 735, name: '实际' }
          ]
        }
      ]
    };

    option && myChart.setOption(option);
  },
}
</script> -->