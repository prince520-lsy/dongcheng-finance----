<template>
  <div id="main61" style="width: 865px; height: 400px;">

  </div>
</template>
<script>
import * as echarts from 'echarts';
import { axios } from '@/utils/request';
export default {
  methods: {
    initLongTerm() {
      axios.get('form/financialanalysis').then(res => {
        console.log(13, res);
        //前年
        let Precashflow = res.data.list.previousyear.cashflow
        //去年
        let Lastcashflow = res.data.list.lastyear.cashflow
        //今年
        let cashflow = res.data.list.thisyear.cashflow
        console.log('cashflow', cashflow);
        this.char = echarts.init(document.querySelector('#main61'))
        let option = {
          title: {
            text: '长期偿债能力'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['前年', '去年', '今年']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {}
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']

          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: '前年',
              type: 'line',
              stack: 'Total',
              data: Precashflow
            },
            {
              name: '去年',
              type: 'line',
              stack: 'Total',
              data: Lastcashflow
            },
            {
              name: '今年',
              type: 'line',
              stack: 'Total',
              data: cashflow
            }
          ]
        };
        this.char.setOption(option)

      })
    }
  },
  created() {
    this.initLongTerm()
  },
  mounted() {
    // var chartDom = document.getElementById('main2');
    // var myChart = echarts.init(chartDom);
    // var option;

    // option = {
    //   title: {
    //     text: '长期偿债能力'
    //   },
    //   tooltip: {
    //     trigger: 'axis'
    //   },
    //   legend: {
    //     data: ['前年', '去年', '今年']
    //   },
    //   grid: {
    //     left: '3%',
    //     right: '4%',
    //     bottom: '3%',
    //     containLabel: true
    //   },
    //   toolbox: {
    //     feature: {}
    //   },
    //   xAxis: {
    //     type: 'category',
    //     boundaryGap: false,
    //     data: ['1月', '2月', '3月', '4月', '5月', '6月']
    //   },
    //   yAxis: {
    //     type: 'value'
    //   },
    //   series: [
    //     {
    //       name: '前年',
    //       type: 'line',
    //       stack: 'Total',
    //       data: [120, 132, 101, 134, 90, 230, 210]
    //     },
    //     {
    //       name: '去年',
    //       type: 'line',
    //       stack: 'Total',
    //       data: [220, 182, 191, 234, 290, 330, 310]
    //     },
    //     {
    //       name: '今年',
    //       type: 'line',
    //       stack: 'Total',
    //       data: [150, 232, 201, 154, 190, 330, 410]
    //     }
    //   ]
    // };

    // option && myChart.setOption(option, true);
  },
}
</script>
<style lang="less" scoped>
#main61 {
  background-color: #fff;
}
</style>