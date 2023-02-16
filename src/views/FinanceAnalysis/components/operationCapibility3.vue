<template>
  <div id="main393" style="width: 850px; height: 400px;">

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
        let Lastworkingcapital = res.data.list.lastyear.workingcapital
        //今年
        let workingcapital = res.data.list.thisyear.workingcapital
        //前年
        let Preworkingcapital = res.data.list.previousyear.workingcapital
        this.char = echarts.init(document.querySelector('#main393'))
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
              data: workingcapital
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
              data: Lastworkingcapital
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
              data: Preworkingcapital
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
#main393 {
  background-color: #fff;
}
</style>