<template>
  <div id="main" style="width: 850px; height: 400px;">

  </div>
</template>
<script>
import * as echarts from 'echarts';
import { axios } from '@/utils/request';
export default {

  methods: {
    initShortTerm() {
      axios.get('form/financialanalysis').then(res => {
        console.log(14, res.data.list.capital);
        //营运资本
        let capital = res.data.list.capital
        this.char = echarts.init(document.querySelector('#main'))

        let option = {
          title: {
            text: '短期偿债能力',
            subtext: '单位/万元'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['去年', '今年']
          },
          toolbox: {
            show: true,
            feature: {
              dataView: { show: false, readOnly: false },
              magicType: { show: false, type: ['line', 'bar'] },
              restore: { show: false },
              saveAsImage: { show: false }
            }
          },
          calculable: true,
          xAxis: [
            {
              type: 'category',
              // prettier-ignore
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
              name: '去年',
              type: 'bar',
              data: [
                // 2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
              ]
            },
            {
              name: '今年',
              type: 'bar',
              data: capital


            }
          ]
        };
        this.char.setOption(option)
      })
    }
  },
  created() {
    this.initShortTerm()
  },
  mounted() {
    // var chartDom = document.getElementById('main');
    // var myChart = echarts.init(chartDom);
    // var option;

    // option = {
    //   title: {
    //     text: '短期偿债能力',
    //     subtext: '单位/万元'
    //   },
    //   tooltip: {
    //     trigger: 'axis'
    //   },
    //   legend: {
    //     data: ['去年', '今年']
    //   },
    //   toolbox: {
    //     show: true,
    //     feature: {
    //       dataView: { show: false, readOnly: false },
    //       magicType: { show: false, type: ['line', 'bar'] },
    //       restore: { show: false },
    //       saveAsImage: { show: false }
    //     }
    //   },
    //   calculable: true,
    //   xAxis: [
    //     {
    //       type: 'category',
    //       // prettier-ignore
    //       data: ['1月', '2月', '3月', '4月', '5月', '6月']
    //     }
    //   ],
    //   yAxis: [
    //     {
    //       type: 'value'
    //     }
    //   ],
    //   series: [
    //     {
    //       name: '去年',
    //       type: 'bar',
    //       data: [
    //         2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
    //       ]
    //     },
    //     {
    //       name: '今年',
    //       type: 'bar',
    //       data: [
    //         2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
    //       ]
    //     }
    //   ]
    // };

    // option && myChart.setOption(option, true);

  },
}
</script>
<style lang="less" scoped>
#main {
  background-color: #fff;
}
</style>
