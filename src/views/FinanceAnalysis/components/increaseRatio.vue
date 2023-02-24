<template>
  <div id="main103" style="width: 865px; height: 400px;">

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
        let decreaseratio = res.data.list.smalltaxes[0].decreaseratio
        let newDecrease = decreaseratio.replace('%', '')

        let decreaseratio1 = res.data.list.smalltaxes[1].decreaseratio
        let newDecrease1 = decreaseratio1.replace('%', '')

        let decreaseratio2 = res.data.list.smalltaxes[2].decreaseratio
        let newDecrease2 = decreaseratio2.replace('%', '')

        let decreaseratio3 = res.data.list.smalltaxes[3].decreaseratio
        let newDecrease3 = decreaseratio3.replace('%', '')

        let decreaseratio4 = res.data.list.smalltaxes[4].decreaseratio
        let newDecrease4 = decreaseratio4.replace('%', '')

        let decreaseratio5 = res.data.list.smalltaxes[5].decreaseratio
        let newDecrease5 = decreaseratio5.replace('%', '')

        let decreaseratio6 = res.data.list.smalltaxes[6].decreaseratio
        let newDecrease6 = decreaseratio6.replace('%', '')

        let decreaseratio7 = res.data.list.smalltaxes[7].decreaseratio
        let newDecrease7 = decreaseratio7.replace('%', '')

        let decreaseratio8 = res.data.list.smalltaxes[8].decreaseratio
        let newDecrease8 = decreaseratio8.replace('%', '')

        let decreaseratio9 = res.data.list.smalltaxes[9].decreaseratio
        let newDecrease9 = decreaseratio7.replace('%', '')
        console.log('newDecrease', newDecrease);
        console.log('decreaseratio', typeof decreaseratio);

        this.char = echarts.init(document.querySelector('#main103'))
        let option = {
          title: {
            text: '增减比率'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },

          xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLabel: {
              //x轴文字的配置
              show: true,
              interval: 0,//使x轴文字显示全

              formatter: function (params) {
                var newParamsName = "";
                var paramsNameNumber = params.length;
                var provideNumber = 3; //一行显示几个字
                var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
                if (paramsNameNumber > provideNumber) {
                  for (var p = 0; p < rowNumber; p++) {
                    var tempStr = "";
                    var start = p * provideNumber;
                    var end = start + provideNumber;
                    if (p == rowNumber - 1) {
                      tempStr = params.substring(start, paramsNameNumber);
                    } else {
                      tempStr = params.substring(start, end) + "\n";
                    }
                    newParamsName += tempStr;
                  }
                } else {
                  newParamsName = params;
                }
                return newParamsName;
              }
            },

            data: ['房产税', '土地税', '环保税', '个税', '城建税', '教育费附加', '地方教育费附加', '印花税', '工会经费', '残保']
          },
          yAxis: {

            type: 'value',
            axisLabel: {
              formatter: '{value} %'
            },

          },



          series: [

            {
              name: '',
              type: 'line',
              stack: 'Total',
              data: [newDecrease, newDecrease1, newDecrease2, newDecrease3, newDecrease4, newDecrease5, newDecrease6, newDecrease7, newDecrease8, newDecrease9],

              itemStyle: {
                normal: {
                  label: {
                    show: true,
                    position: 'top',
                    formatter: '{b}\n{c}%'
                  }
                }
              },
            },

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
#main103 {
  background-color: #fff;
}
</style>