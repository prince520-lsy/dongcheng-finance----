<template>
  <div id="main100" style="width: 865px; height: 400px;">

  </div>
</template>
<script>
import * as echarts from 'echarts';
import { axios } from '@/utils/request';
export default {
  methods: {
    initProfit() {
      axios.get('form/taxrisk').then(res => {

        console.log("res", res);
        let reality = res.data.list.analysis.reality
        let actualvat = res.data.list.analysis.actualvat
        let taxreality = res.data.list.analysis.taxreality
        let actualtax = res.data.list.analysis.actualtax
        this.char = echarts.init(document.querySelector('#main100'))
        let option = {
          title: {
            text: '税负率比较图表',
            x: 'center'
          },

          xAxis: {
            type: 'category',
            axisLabel: {
              interval: 0,//代表显示所有x轴标签显示
              rotate: 30, //代表逆时针旋转45度
            },
            data: ['增值税税负率(%)', '行业增值税税负率(%)', '所得税贡献率(%)', '行业所得税贡献率(%)']
          },
          yAxis: [
            {
              type: 'value',
              axisLabel: {
                formatter: '{value} %'
              },
            }
          ],


          series: [{
            type: 'bar',
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: 'inside',//数据在中间显示
                  formatter: '{c}%'//百分比显示
                }
              }
            },
            data: [reality, actualvat, taxreality, actualtax] //你要展示的数据
          }]

        };
        this.char.setOption(option)
      })
    }
  },
  created() {
    this.initProfit()
  },

}
</script>
<style lang="less" scoped>
#main100 {
  background-color: #fff;
}
</style>