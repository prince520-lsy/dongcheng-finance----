<template>
  <div id="main1314" style="width:1729px;height: 400px;">

  </div>
</template>
<script>
import * as echarts from 'echarts';
import { axios } from '@/utils/request';
export default {
  methods: {
    inityiBiaoPan3() {
      axios.get('form/financialriskreport').then(res => {
        // let rate2 = res.data.list.taxrisk.rateofincome
        // let newrate2 = rate2.replace('%', '')
        let countval = res.data.countval
        console.log("countval", typeof countval);
        let newcountval = countval / 100
        this.char = echarts.init(document.querySelector('#main1314'))
        let option = {
          series: [
            {
              type: 'gauge',
              startAngle: 180,
              endAngle: 0,
              center: ['50%', '75%'],
              radius: '150%',
              min: 0,
              max: 2,
              splitNumber: 5,
              axisLine: {
                lineStyle: {
                  width: 60,
                  color: [
                    [0.1, '#fc0000'],
                    [0.3, '#ff8600'],
                    [0.4, '#fffc01'],
                    [0.6, '#91d148'],
                    [1, '#00af50'],

                  ]
                }
              },
              pointer: {
                icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
                length: '12%',
                width: 20,
                offsetCenter: [0, '-50%'],
                itemStyle: {
                  color: 'inherit'
                }
              },
              axisTick: {
                length: 13,
                lineStyle: {
                  color: 'inherit',
                  width: 0
                }
              },
              splitLine: {
                length: 20,
                lineStyle: {
                  color: 'inherit',
                  width: 0
                }
              },
              axisLabel: {
                color: '#464646',
                fontSize: 20,
                distance: -60,
                rotate: 'tangential',
                formatter: function (value) {
                  if (value === 1.0) {
                    return '优秀';
                  }
                  else if (value === 0.95) {
                    return '良好';
                  }
                  else if (value === 0.7) {
                    return '平均';
                  }
                  else if (value === 0.65) {
                    return '较低';

                  }

                  else if (value === 0.65) {
                    return '较差';
                  }
                  return '';
                }
              },
              title: {
                offsetCenter: [0, '-10%'],
                fontSize: 22
              },
              detail: {
                fontSize: 30,
                offsetCenter: [0, '-35%'],
                valueAnimation: true,
                formatter: function (value) {
                  return Math.round(value * 100) + '分';
                },
                color: 'inherit'
              },
              data: [
                {
                  value: newcountval,
                  name: '某某企业2023年：财务风险仪表盘'
                }
              ]
            }
          ]
        };
        // let option = {
        //   title: {
        //     text: '所得税税额变动率',
        //   },
        //   series: [
        //     {
        //       type: 'gauge',
        //       startAngle: 180,
        //       endAngle: 0,
        //       min: -100,
        //       max: 100,
        //       radius: '100%',
        //       splitNumber: 8,
        //       itemStyle: {
        //         color: '#58D9F9',
        //         shadowColor: 'rgba(0,138,255,0.45)',
        //         shadowBlur: 10,
        //         shadowOffsetX: 2,
        //         shadowOffsetY: 2
        //       },
        //       progress: {
        //         show: true,
        //         roundCap: true,
        //         width: 18
        //       },
        //       pointer: {
        //         icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
        //         length: '75%',
        //         width: 16,
        //         offsetCenter: [0, '5%']
        //       },
        //       axisLine: {
        //         roundCap: true,
        //         lineStyle: {
        //           width: 18
        //         }
        //       },
        //       axisTick: {
        //         splitNumber: 2,
        //         lineStyle: {
        //           width: 2,
        //           color: '#999'
        //         }
        //       },
        //       splitLine: {
        //         length: 12,
        //         lineStyle: {
        //           width: 3,
        //           color: '#999'
        //         }
        //       },
        //       axisLabel: {
        //         distance: 30,
        //         color: '#999',
        //         fontSize: 20
        //       },
        //       title: {
        //         show: false
        //       },
        //       detail: {
        //         backgroundColor: '#fff',
        //         borderColor: '#999',
        //         borderWidth: 2,
        //         width: '60%',
        //         lineHeight: 40,
        //         height: 40,
        //         borderRadius: 8,
        //         offsetCenter: [0, '35%'],
        //         valueAnimation: true,
        //         formatter: function (value) {
        //           return '{value|' + value.toFixed(0) + '}{unit|%}';
        //         },
        //         rich: {
        //           value: {
        //             fontSize: 50,
        //             fontWeight: 'bolder',
        //             color: '#777'
        //           },
        //           unit: {
        //             fontSize: 20,
        //             color: '#999',
        //             padding: [0, 0, -20, 10]
        //           }
        //         }
        //       },
        //       data: [
        //         {
        //           value: newrate2
        //         }
        //       ]
        //     }
        //   ]
        // };
        this.char.setOption(option)
      })
    }
  },
  created() {
    this.inityiBiaoPan3()
  },
  // mounted() {
  //   var chartDom = document.getElementById('main1314');
  //   var myChart = echarts.init(chartDom);
  //   var option;

  //   option = {
  //     title: {
  //       text: '所得税税额变动率',
  //     },
  //     series: [
  //       {
  //         type: 'gauge',
  //         startAngle: 180,
  //         endAngle: 0,
  //         min: -100,
  //         max: 100,
  //         radius: '100%',
  //         splitNumber: 8,
  //         itemStyle: {
  //           color: '#58D9F9',
  //           shadowColor: 'rgba(0,138,255,0.45)',
  //           shadowBlur: 10,
  //           shadowOffsetX: 2,
  //           shadowOffsetY: 2
  //         },
  //         progress: {
  //           show: true,
  //           roundCap: true,
  //           width: 18
  //         },
  //         pointer: {
  //           icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
  //           length: '75%',
  //           width: 16,
  //           offsetCenter: [0, '5%']
  //         },
  //         axisLine: {
  //           roundCap: true,
  //           lineStyle: {
  //             width: 18
  //           }
  //         },
  //         axisTick: {
  //           splitNumber: 2,
  //           lineStyle: {
  //             width: 2,
  //             color: '#999'
  //           }
  //         },
  //         splitLine: {
  //           length: 12,
  //           lineStyle: {
  //             width: 3,
  //             color: '#999'
  //           }
  //         },
  //         axisLabel: {
  //           distance: 30,
  //           color: '#999',
  //           fontSize: 20
  //         },
  //         title: {
  //           show: false
  //         },
  //         detail: {
  //           backgroundColor: '#fff',
  //           borderColor: '#999',
  //           borderWidth: 2,
  //           width: '60%',
  //           lineHeight: 40,
  //           height: 40,
  //           borderRadius: 8,
  //           offsetCenter: [0, '35%'],
  //           valueAnimation: true,
  //           formatter: function (value) {
  //             return '{value|' + value.toFixed(0) + '}{unit|%}';
  //           },
  //           rich: {
  //             value: {
  //               fontSize: 50,
  //               fontWeight: 'bolder',
  //               color: '#777'
  //             },
  //             unit: {
  //               fontSize: 20,
  //               color: '#999',
  //               padding: [0, 0, -20, 10]
  //             }
  //           }
  //         },
  //         data: [
  //           {
  //             value: newrate2
  //           }
  //         ]
  //       }
  //     ]
  //   };

  //   option && myChart.setOption(option);
  // },
}
</script>