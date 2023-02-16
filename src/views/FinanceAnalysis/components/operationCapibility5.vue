<template>
  <div id="main395" style="width: 850px; height: 400px;">

</div>
</template>
<script>
import * as echarts from 'echarts';
import { axios } from '@/utils/request';
export default {
  methods: {
    initOperaton() {
      axios.get('form/financialanalysis').then(res => {
        //去年
        let Lasttotalassetturnover = res.data.list.lastyear.totalassetturnover
        //今年
        let totalassetturnover = res.data.list.thisyear.totalassetturnover
        //前年
        let Pretotalassetturnover = res.data.list.previousyear.totalassetturnover
        this.char = echarts.init(document.querySelector('#main395'))
        let option = {
          title: {
            text: '运营能力'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              // Use axis to trigger tooltip
              type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
            }
          },
          legend: {},
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value'
          },
          yAxis: {
            type: 'category',
            data: ['12月', '11月', '10月', '9月', '8月', '7月', '6月', '5月', '4月', '3月', '2月', '1月']
          },
          series: [
            {
              name: '今年',
              type: 'bar',
              stack: 'total',
              label: {
                show: true
              },
              emphasis: {
                focus: 'series'
              },
              data: totalassetturnover
            },
            {
              name: '去年',
              type: 'bar',
              stack: 'total',
              label: {
                show: true
              },
              emphasis: {
                focus: 'series'
              },
              data: Lasttotalassetturnover
            },
            {
              name: '前年',
              type: 'bar',
              stack: 'total',
              label: {
                show: true
              },
              emphasis: {
                focus: 'series'
              },
              data: Pretotalassetturnover
            }
          ]
        };
        this.char.setOption(option)
      })
    }
  },
  created() {
    this.initOperaton()
  },
  mounted() {

  },
}
</script>
<style lang="less" scoped>
#main395 {
  background-color: #fff;
}
</style>