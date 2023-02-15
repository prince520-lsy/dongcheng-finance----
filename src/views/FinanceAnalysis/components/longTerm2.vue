<template>
  <div id="main31" style="width: 865px; height: 400px;">

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
        let Preequitymultiplier = res.data.list.previousyear.equitymultiplier
        //去年
        let Lastequitymultiplier = res.data.list.lastyear.equitymultiplier
        //今年
        let equitymultiplier = res.data.list.thisyear.equitymultiplier
        console.log('equitymultiplier', equitymultiplier);
        this.char = echarts.init(document.querySelector('#main31'))
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
              data: Preequitymultiplier
            },
            {
              name: '去年',
              type: 'line',
              stack: 'Total',
              data: Lastequitymultiplier
            },
            {
              name: '今年',
              type: 'line',
              stack: 'Total',
              data: equitymultiplier
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

  },
}
</script>
<style lang="less" scoped>
#main31 {
  background-color: #fff;
}
</style>