<template>
  <div id="main102" style="width: 865px; height: 400px;">

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
        let tax1 = res.data.list.smalltaxes[0].periodamount
        let tax2 = res.data.list.smalltaxes[1].periodamount
        let tax3 = res.data.list.smalltaxes[2].periodamount
        let tax4 = res.data.list.smalltaxes[3].periodamount
        let tax5 = res.data.list.smalltaxes[4].periodamount
        let tax6 = res.data.list.smalltaxes[5].periodamount
        let tax7 = res.data.list.smalltaxes[6].periodamount
        let tax8 = res.data.list.smalltaxes[7].periodamount
        let tax9 = res.data.list.smalltaxes[8].periodamount
        let tax10 = res.data.list.smalltaxes[9].periodamount
        this.char = echarts.init(document.querySelector('#main102'))
        let option = {
          title: {
            text: '上期纳税额',

            // left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            bottom: 10,
            left: 'center',
            data: ['房产税', '土地税', '环保税', '个税', '城建税', '教育费附加', '地方教育费附加', '印花税', '工会经费', '残保']
          },
          series: [
            {
              type: 'pie',
              radius: '65%',
              center: ['50%', '50%'],
              selectedMode: 'single',
              data: [

                { value: tax1, name: '房产税' },
                { value: tax2, name: '土地税' },
                { value: tax3, name: '环保税' },
                { value: tax4, name: '个税' },
                { value: tax5, name: '城建税' },
                { value: tax6, name: '教育费附加' },
                { value: tax7, name: '地方教育费附加' },
                { value: tax8, name: '印花税' },
                { value: tax9, name: '工会经费' },
                { value: tax10, name: '残保' },
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
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
#main102 {
  background-color: #fff;
}
</style>