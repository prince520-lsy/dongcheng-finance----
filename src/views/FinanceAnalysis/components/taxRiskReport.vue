<template>
  <div id="mainId66">

  </div>
</template>
<script>
import * as echarts from 'echarts';
import { axios } from '@/utils/request';

export default {
  methods: {
    initSingleIndex() {
      axios.get('form/taxmanagement').then(res => {
        console.log("res2", res);

        let incometax0 = res.data.list.risktable[0].incometax

        let incometax1 = res.data.list.risktable[1].incometax

        let incometax2 = res.data.list.risktable[2].incometax

        let taxrisk0 = res.data.list.risktable[0].taxrisk

        let taxrisk1 = res.data.list.risktable[1].taxrisk

        let taxrisk2 = res.data.list.risktable[2].taxrisk
        this.char = echarts.init(document.querySelector('#mainId66'))

        let option = {
          title: {
            text: '一、企业税务风险预警图：'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {},
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          color: ['#c23531', '#00af50',],
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
          },
          yAxis: {
            type: 'category',
            data: ['低风险', '中风险', '高风险',]
          },
          series: [
            {
              name: '增值税',
              type: 'bar',
              data: [incometax0, incometax1, incometax2]
            },
            {
              name: '所得税',
              type: 'bar',
              data: [taxrisk0, taxrisk1, taxrisk2,]
            }
          ]
        };
        // let option = {
        //   title: {
        //     text: '单项指标分值比较图',
        //     x: 'center'
        //   },
        //   xAxis: {
        //     type: 'category',
        //     axisLabel: {
        //       interval: 0,
        //       rotate: 30,//倾斜度 -90 至 90 默认为0
        //       margin: 2,
        //       textStyle: {

        //         color: "#000000"
        //       }
        //     },
        //     data: ['净资产收益率（%）', '总资产报酬率（%）', '销售利润率(%)', '成本费用利润率（%）', '应收账款周转率（次）', '存货周转率（次）', '流动资产周转率（次）', '总资产周转率（次）', '资产负债率（%）', '现金流量负债比率（%）', '已获利息倍数', '速动比率（%）', '销售收入增长率（%）', '资本保值增值率（%）', '销售利润增长率（%）', '总资产增长率（%）']
        //   },
        //   yAxis: {
        //     type: 'value'
        //   },
        //   series: [
        //     {
        //       data: [

        //         {
        //           value: comparison[0],
        //           itemStyle: {
        //             color: '#68bfb8'
        //           }
        //         },
        //         {
        //           value: comparison[1],
        //           itemStyle: {
        //             color: '#68bfb8'
        //           }
        //         },
        //         {
        //           value: comparison[2],
        //           itemStyle: {
        //             color: '#68bfb8'
        //           }
        //         },
        //         {
        //           value: comparison[3],
        //           itemStyle: {
        //             color: '#68bfb8'
        //           }
        //         },
        //         {
        //           value: comparison[4],
        //           itemStyle: {
        //             color: '#68bfb8'
        //           }
        //         },
        //         {
        //           value: comparison[5],
        //           itemStyle: {
        //             color: '#68bfb8'
        //           }
        //         },
        //         {
        //           value: comparison[6],
        //           itemStyle: {
        //             color: '#68bfb8'
        //           }
        //         },
        //         {
        //           value: comparison[7],
        //           itemStyle: {
        //             color: '#68bfb8'
        //           }
        //         },
        //         {
        //           value: comparison[8],
        //           itemStyle: {
        //             color: '#68bfb8'
        //           }
        //         },
        //         {
        //           value: comparison[9],
        //           itemStyle: {
        //             color: '#68bfb8'
        //           }
        //         },
        //         {
        //           value: comparison[10],
        //           itemStyle: {
        //             color: '#68bfb8'
        //           }
        //         },
        //         {
        //           value: comparison[11],
        //           itemStyle: {
        //             color: '#68bfb8'
        //           }
        //         },
        //         {
        //           value: comparison[12],
        //           itemStyle: {
        //             color: '#68bfb8'
        //           }
        //         },
        //         {
        //           value: comparison[13],
        //           itemStyle: {
        //             color: '#68bfb8'
        //           }
        //         },
        //         {
        //           value: comparison[14],
        //           itemStyle: {
        //             color: '#68bfb8'
        //           }
        //         },
        //         {
        //           value: comparison[15],
        //           itemStyle: {
        //             color: '#68bfb8'
        //           }
        //         },

        //       ],
        //       itemStyle: {
        //         normal: {
        //           label: {
        //             show: true, //开启显示
        //             position: 'top', //在上方显示
        //             textStyle: { //数值样式
        //               color: 'black',
        //               fontSize: 16
        //             }
        //           }
        //         }
        //       },


        //       type: 'bar'
        //     }
        //   ]
        // };
        this.char.setOption(option)
      })
    }
  },
  created() {
    this.initSingleIndex()
  },

}
</script>
<style lang="less" scoped>
#mainId66 {
  width: 1830px;
  height: 520px;
}
</style>