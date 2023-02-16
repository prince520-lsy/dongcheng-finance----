<template>
  <div id="main58" style="width: 865px; height: 400px;">

</div>
</template>
<script>
import * as echarts from 'echarts';
import { axios } from '@/utils/request';
export default {
  data() {
    return {

    }
  },
  methods: {
    initInvestment() {
      axios.get('form/financialanalysis').then(res => {
        console.log('roi', res.data.list.thisyear.roi.roi);
        let arr = res.data.list.thisyear.roi.roi
        this.char = echarts.init(document.querySelector('#main58'))

        let option = {
          title: {
            text: '投资回报率'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
            data: [
              // 'Direct',
              // 'Marketing',
              // 'Search Engine',
              // 'Email',
              // 'Union Ads',
              // 'Video Ads',
              // 'Baidu',
              // 'Google',
              // 'Bing',
              // 'Others'
            ]
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              selectedMode: 'single',
              radius: [0, '30%'],
              label: {
                position: 'inner',
                fontSize: 14
              },
              labelLine: {
                show: false
              },
              data: [
                { value: 1548, name: '去年', selected: true },
                { value: 775, name: '今年', selected: true },
                { value: 679, name: '前年', selected: true }
              ]
            },
            {
              name: 'Access From',
              type: 'pie',
              radius: ['40%', '60%'],
              labelLine: {
                length: 30
              },
              label: {
                formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                backgroundColor: '#F6F8FC',
                borderColor: '#8C8D8E',
                borderWidth: 1,
                borderRadius: 4,
                rich: {
                  a: {
                    color: '#6E7079',
                    lineHeight: 22,
                    align: 'center'
                  },
                  hr: {
                    borderColor: '#8C8D8E',
                    width: '100%',
                    borderWidth: 1,
                    height: 0
                  },
                  b: {
                    color: '#4C5058',
                    fontSize: 14,
                    fontWeight: 'bold',
                    lineHeight: 33
                  },
                  per: {
                    color: '#fff',
                    backgroundColor: '#4C5058',
                    padding: [3, 4],
                    borderRadius: 4
                  }
                }
              },
              data: [
                { value: 1048, name: '1月' },
                { value: 335, name: '2月' },
                { value: 310, name: '3月' },
                { value: 251, name: '4月' },
                { value: 234, name: '5月' },
                { value: 147, name: '6月' },
                { value: 135, name: '7月' },
                { value: 102, name: '8月' },
                { value: 102, name: '9月' },
                { value: 102, name: '10月' },
                { value: 102, name: '11月' },
                { value: 102, name: '12月' },

              ]
            }
          ]
        };
        this.char.setOption(option)
      })
    }
  },
  created() {
    this.initInvestment()
  },
  mounted() {
    var chartDom = document.getElementById('main5');
    var myChart = echarts.init(chartDom);
    var option;

    // option = {
    //   title: {
    //     text: '投资回报率',
    //     // subtext: 'Fake Data',
    //     left: 'left'
    //   },
    //   tooltip: {
    //     // trigger: 'item'
    //   },
    //   legend: {
    //     // orient: 'vertical',
    //     // left: 'left'
    //   },
    //   series: [
    //     {
    //       name: 'Access From',
    //       type: 'pie',
    //       radius: '80%',
    //       data: [
    //         { value: 1048, name: '今年' },
    //         { value: 735, name: '去年' },
    //         { value: 580, name: '前年' }
    //       ],
    //       emphasis: {
    //         itemStyle: {
    //           shadowBlur: 10,
    //           shadowOffsetX: 0,
    //           shadowColor: 'rgba(0, 0, 0, 0.5)'
    //         }
    //       }
    //     }
    //   ]
    // };
    option = {
      title: {
        text: '投资回报率'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        data: [
          'Direct',
          'Marketing',
          'Search Engine',
          'Email',
          'Union Ads',
          'Video Ads',
          'Baidu',
          'Google',
          'Bing',
          'Others'
        ]
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          selectedMode: 'single',
          radius: [0, '30%'],
          label: {
            position: 'inner',
            fontSize: 14
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 1548, name: '去年', selected: true },
            { value: 775, name: '今年', selected: true },
            { value: 679, name: '前年', selected: true }
          ]
        },
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '60%'],
          labelLine: {
            length: 30
          },
          label: {
            formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
            backgroundColor: '#F6F8FC',
            borderColor: '#8C8D8E',
            borderWidth: 1,
            borderRadius: 4,
            rich: {
              a: {
                color: '#6E7079',
                lineHeight: 22,
                align: 'center'
              },
              hr: {
                borderColor: '#8C8D8E',
                width: '100%',
                borderWidth: 1,
                height: 0
              },
              b: {
                color: '#4C5058',
                fontSize: 14,
                fontWeight: 'bold',
                lineHeight: 33
              },
              per: {
                color: '#fff',
                backgroundColor: '#4C5058',
                padding: [3, 4],
                borderRadius: 4
              }
            }
          },
          data: [
            { value: 1048, name: '1月' },
            { value: 335, name: '2月' },
            { value: 310, name: '3月' },
            { value: 251, name: '4月' },
            { value: 234, name: '5月' },
            { value: 147, name: '6月' },
            { value: 135, name: '7月' },
            { value: 102, name: '8月' },
            { value: 102, name: '9月' },
            { value: 102, name: '10月' },
            { value: 102, name: '11月' },
            { value: 102, name: '12月' },

          ]
        }
      ]
    };

    option && myChart.setOption(option);
  },
}
</script>
<style lang="less" scoped>
#main58 {
  background-color: #fff;
}
</style>