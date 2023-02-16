<template>
  <div id="main2" style="width: 850px; height: 400px;">

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
        let Prequickratio = res.data.list.previousyear.quickratio
        //去年
        let Lastquickratio = res.data.list.lastyear.quickratio
        console.log(17, Lastquickratio);
        //今年
        let quickratio = res.data.list.thisyear.quickratio
        this.char = echarts.init(document.querySelector('#main2'))
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
              data: Prequickratio

            },
            {
              name: '去年',
              type: 'bar',
              data: Lastquickratio

            },
            {
              name: '今年',
              type: 'bar',
              data: quickratio

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
    var chartDom = document.getElementById('main2');
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
          name: '去年',
          type: 'bar',
          data: Lastquickratio

        },
        {
          name: '今年',
          type: 'bar',
          data: quickratio

        }
      ]
    };

    option && myChart.setOption(option, true);

  },
}
</script>
<style lang="less" scoped>
#main2 {
  background-color: #fff;
}
</style>
