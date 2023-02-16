<template>
  <div id="main391" style="width: 850px; height: 400px;">

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
        let Lastinventoryturnover = res.data.list.lastyear.inventoryturnover
        //今年
        let inventoryturnover = res.data.list.thisyear.inventoryturnover
        //前年
        let Preinventoryturnover = res.data.list.previousyear.inventoryturnover
        this.char = echarts.init(document.querySelector('#main391'))
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
              data: inventoryturnover
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
              data: Lastinventoryturnover
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
              data: Preinventoryturnover
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
#main391 {
  background-color: #fff;
}
</style>