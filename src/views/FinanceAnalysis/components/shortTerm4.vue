<template>
  <div id="main4" style="width: 850px; height: 400px;">

</div>
</template>
<script>
import * as echarts from 'echarts';
import { axios } from '@/utils/request';
export default {

  methods: {
    initShortTerm() {
      axios.get('form/financialanalysis').then(res => {
        console.log(14, res);
        //前年
        let Precashflowratio = res.data.list.previousyear.cashflowratio
        //去年
        let Lastcashflowratio = res.data.list.lastyear.cashflowratio
        //今年
        let cashflowratio = res.data.list.thisyear.cashflowratio
        this.char = echarts.init(document.querySelector('#main4'))
        let option = {
          title: {
            text: '短期偿债能力',
            subtext: ''
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['前年', '去年', '今年']
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
              data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月',]
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
              type: 'bar',
              data: Precashflowratio

            },
            {
              name: '去年',
              type: 'bar',
              data: Lastcashflowratio

            },
            {
              name: '今年',
              type: 'bar',
              data: cashflowratio

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
    var chartDom = document.getElementById('main4');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      title: {
        text: '短期偿债能力',
        subtext: ''
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
          data: ['1月', '2月', '3月', '4月', '5月', '6月']
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
            2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
          ]
        },
        {
          name: '今年',
          type: 'bar',
          data: [
            2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
          ]
        }
      ]
    };

    option && myChart.setOption(option, true);

  },
}
</script>
<style lang="less" scoped>
#main4 {
  background-color: #fff;
}
</style>
