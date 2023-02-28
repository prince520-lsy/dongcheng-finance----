<template>
  <div id="main7" style="width:850px;height: 400px; background-color: #fff;">

  </div>
</template>
<script>
import * as echarts from 'echarts';
import { axios } from '@/utils/request';
export default {
  methods: {
    initEchartPie3() {
      axios.get('form/Month').then(res => {
        let financial = res.data.cost.cost.financial
        console.log("financial", financial);
        let expenses = res.data.cost.cost.expenses

        let manufacturing = res.data.cost.cost.manufacturing

        let selling = res.data.cost.cost.selling
        this.char = echarts.init(document.querySelector('#main7'))
        let option = {
          title: {
            text: '成本费用结构图',
            // subtext: 'Fake Data',
            left: 'center'
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left'
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: '50%',
              data: [
                { value: financial, name: '账务费用' },
                { value: expenses, name: '管理费用' },
                { value: selling, name: '销售费用' },

                { value: manufacturing, name: '制造费用' }
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
    this.initEchartPie3()
  },
  mounted() {
    var chartDom = document.getElementById('main7');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      title: {
        text: '成本费用结构图',
        // subtext: 'Fake Data',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 1048, name: '账务费用' },
            { value: 735, name: '管理费用' },
            { value: 580, name: '销售费用' },

            { value: 300, name: '制造费用' }
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

    option && myChart.setOption(option);
  },
}
</script>