<template>
  <div id="main104" style="width: 865px; height: 400px;">

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
        let proportion = res.data.list.smalltaxes[0].proportion
        let newProportion = proportion.replace('%', '')

        let proportion1 = res.data.list.smalltaxes[1].proportion
        let newProportion1 = proportion1.replace('%', '')

        let proportion2 = res.data.list.smalltaxes[2].proportion
        let newProportion2 = proportion2.replace('%', '')

        let proportion3 = res.data.list.smalltaxes[3].proportion
        let newProportion3 = proportion3.replace('%', '')

        let proportion4 = res.data.list.smalltaxes[4].proportion
        let newProportion4 = proportion4.replace('%', '')

        let proportion5 = res.data.list.smalltaxes[5].proportion
        let newProportion5 = proportion5.replace('%', '')

        let proportion6 = res.data.list.smalltaxes[6].proportion
        let newProportion6 = proportion6.replace('%', '')

        let proportion7 = res.data.list.smalltaxes[7].proportion
        let newProportion7 = proportion7.replace('%', '')

        let proportion8 = res.data.list.smalltaxes[8].proportion
        let newProportion8 = proportion8.replace('%', '')

        let proportion9 = res.data.list.smalltaxes[9].proportion
        let newProportion9 = proportion9.replace('%', '')



        this.char = echarts.init(document.querySelector('#main104'))
        let option = {
          title: {
            text: '本期占收入比'
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
              data: [newProportion, newProportion1, newProportion2, newProportion3, newProportion4, newProportion5, newProportion6, newProportion7, newProportion8, newProportion9],

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
#main104 {
  background-color: #fff;
}
</style>