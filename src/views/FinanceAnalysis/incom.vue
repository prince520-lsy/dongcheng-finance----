<template>
  <div>

    <div class="navBox">
      <div class="date">选择日期
        <a-button class="year" @click="changeColor(1)" :class="buttonIndex==1?'bgColor':''">
          年
        </a-button>
        <a-button class="month" @click="changeColor(2)" :class="buttonIndex == 2 ? 'bgColor' : ''">月</a-button>
        <a-button class="acu" @click="changeColor(3)" :class="buttonIndex == 3 ? 'bgColor' : ''">累计</a-button>

      </div>
    </div>

    <div class="tableRow">
      <div class="table1">

        <div class="tableTitle1">收入成本预算费用表</div>
        <a-table :columns="columns" :data-source="data" :pagination="false">
          <a slot="name" slot-scope="text">{{ text }}</a>
        </a-table>
      </div>

      <div class="table2">
        <div class="tableTitle2">各月份营收费用表</div>
        <a-table :columns="columns2" :data-source="data2" :pagination="false">
          <a slot="name" slot-scope="text">{{ text }}</a>
        </a-table>

      </div>

    </div>

    <div class="echartsRow">

      <div class="echarts1">

        <div class="category">
        </div>

        <!-- echarts1 -->
        <fareEcharts />
      </div>

      <div class="echarts2">
        <div class="time">

        </div>
        <div class="category">

        </div>


        <!-- echarts2 -->

        <echatLine />
        <div></div>
      </div>


    </div>





  </div>
</template>
<script>

const data = []
const columns = [
  {
    title: '项目',
    dataIndex: 'project',
    key: 'project',
    scopedSlots: { customRender: 'project' },
  },
  {
    title: '本期',
    dataIndex: 'month',
    key: 'month',
    scopedSlots: { customRender: 'month' },
  },
  {
    title: '去年同期',
    dataIndex: 'qntq',
    key: 'qntq',
    scopedSlots: { customRender: 'qntq' },
  },
  {
    title: '累计',
    dataIndex: 'lj',
    key: 'lj',
    scopedSlots: { customRender: 'lj' },
  },
  {
    title: '去年同期累计',
    dataIndex: 'qntqlj',
    key: 'qntqlj',
    scopedSlots: { customRender: 'qntqlj' },
    ellipsis: true,
  },

];

const columns2 = [
  {
    title: '月份',
    dataIndex: 'month',
    key: 'month',
    scopedSlots: { customRender: 'month' },
  },
  {
    title: '收入',
    dataIndex: 'incom',
    key: 'incom',
    scopedSlots: { customRender: 'incom' },
    width: 80,
  },
  {
    title: '成本',
    dataIndex: 'cost',
    key: 'cost',
    scopedSlots: { customRender: 'cost' },
    ellipsis: true,
  },
  {
    title: '毛利',
    dataIndex: 'pureprofit',
    key: 'pureprofit',
    scopedSlots: { customRender: 'pureprofit' },
    ellipsis: true,
  },
  {
    title: '管理费用',
    dataIndex: 'manageCost',
    key: 'manageCost',
    scopedSlots: { customRender: 'manageCost' },
    ellipsis: true,
  },
  {
    title: '销售费用',
    dataIndex: 'saleCost',
    key: 'saleCost',
    scopedSlots: { customRender: 'saleCost' },
    ellipsis: true,
  },
  {
    title: '财务费用',
    dataIndex: 'financeCost',
    key: 'financeCost',
    scopedSlots: { customRender: 'financeCost' },
    ellipsis: true,
  },
  {
    title: '利润',
    dataIndex: 'profit',
    key: 'profit',
    scopedSlots: { customRender: 'profit' },
    ellipsis: true,
  },
];
const data2 = []

import * as echarts from 'echarts';
import echartWrap from '@/components/EchartWrap/Index.vue'
import fareEcharts from './components/fareEcharts.vue';
import echatLine from './components/echatLine.vue';
import { getIncomTable, getIncomMonthTable, getecharts1Data, getecharts2Data } from '@/api/incom'
import { axios } from '@/utils/request';
export default {
  components: { echatLine, echartWrap, fareEcharts },
  data() {
    return {
      data,
      data2,
      columns,
      columns2,
      buttonIndex: 2,

    };
  },
  methods: {
    //初始化echarts1
    initChart1() {
      axios.get('form/ProfitChartAnalysis').then(res => {
        console.log(190, res.data.list[0][0]);
        let actuData = res.data.list[0][0].data
        console.log(actuData);
        let lastYearPi = res.data.list[0][1].data
        console.log(lastYearPi);
        this.char = echarts.init(document.querySelector('#main'))
        // let option = {
        //   title: {
        //     text: '各月份营收费用瀑布图'
        //   },
        //   tooltip: {
        //     trigger: 'axis',
        //     axisPointer: {
        //       type: 'shadow'
        //     },
        //     formatter: function (params) {
        //       let tar;
        //       if (params[1] && params[1].value !== '-') {
        //         tar = params[1];
        //       } else {
        //         tar = params[2];
        //       }
        //       return tar && tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
        //     }
        //   },
        //   legend: {
        //     data: ['实际', '预算', '去年同期']
        //   },
        //   grid: {
        //     left: '3%',
        //     right: '4%',
        //     bottom: '3%',
        //     containLabel: true
        //   },
        //   xAxis: {
        //     type: 'category',
        //     data: ['收入', '成本', '毛利', '营业管理财务费用', '利润',]

        //   },
        //   yAxis: {
        //     type: 'value'
        //   },
        //   series: [
        //     {
        //       name: 'Placeholder',
        //       type: 'bar',
        //       stack: 'Total',
        //       silent: true,
        //       itemStyle: {
        //         borderColor: 'transparent',
        //         color: 'transparent'
        //       },
        //       emphasis: {
        //         itemStyle: {
        //           borderColor: 'transparent',
        //           color: 'transparent'
        //         }
        //       },
        //       data: [0, 900, 1245, 1530, 1376, 1376, 1511, 1689, 1856, 1495, 1292]
        //     },
        //     {
        //       name: '实际',
        //       type: 'bar',
        //       stack: 'Total',
        //       label: {
        //         show: true,
        //         position: 'top'
        //       },
        //       data: [900, 345, 393, '-', '-', 135, 178, 286, '-', '-', '-']
        //     },
        //     {
        //       name: '预算',
        //       type: 'bar',
        //       stack: 'Total',
        //       label: {
        //         show: true,
        //         position: 'bottom'
        //       },
        //       data: ['-', '-', '-', 108, 154, '-', '-', '-', 119, 361, 203]
        //     },
        //     {
        //       name: '去年同期',
        //       type: 'bar',
        //       stack: 'Total',
        //       label: {
        //         show: true,
        //         position: 'top'
        //       },
        //       data: [900, 345, 393, '-', '-', 135, 178, 286, '-', '-', '-']
        //     },
        //   ]
        // };
        // let option = {
        //   title: {
        //     text: '各月份营收费用瀑布图'
        //   },
        //   tooltip: {
        //     trigger: 'axis',
        //     axisPointer: {
        //       type: 'shadow'
        //     },
        //     formatter: function (params) {
        //       let tar;
        //       if (params[1] && params[1].value !== '-') {
        //         tar = params[1];
        //       } else {
        //         tar = params[2];
        //       }
        //       return tar && tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
        //     }
        //   },
        //   legend: {
        //     data: ['实际', '预算', '去年同期']
        //   },
        //   grid: {
        //     left: '3%',
        //     right: '4%',
        //     bottom: '3%',
        //     containLabel: true
        //   },
        //   xAxis: {
        //     type: 'category',
        //     data: ['收入', '成本', '毛利', '营业费用', '管理费用', '财务费用', '利润']
        //   },
        //   yAxis: {
        //     type: 'value'
        //   },
        //   series: [
        //     {
        //       name: 'Placeholder',
        //       type: 'bar',
        //       stack: 'Total',
        //       silent: true,
        //       itemStyle: {
        //         borderColor: 'transparent',
        //         color: 'transparent'
        //       },
        //       emphasis: {
        //         itemStyle: {
        //           borderColor: 'transparent',
        //           color: 'transparent'
        //         }
        //       },
        //       data: lastYearPi
        //     },
        //     {
        //       name: '去年同期',
        //       type: 'bar',
        //       stack: 'Total',
        //       label: {
        //         show: true,
        //         position: 'top'
        //       },
        //       data: lastYearPi
        //     },
        //     {
        //       name: '预算',
        //       type: 'bar',
        //       stack: 'Total',
        //       label: {
        //         show: true,
        //         position: 'top'
        //       },
        //       data: lastYearPi
        //     },
        //     {
        //       name: '实际',
        //       type: 'bar',
        //       stack: 'Total',
        //       label: {
        //         show: true,
        //         position: 'bottom'
        //       },
        //       data: actuData
        //     }
        //   ]
        // }
        const posList = [
          'left',
          'right',
          'top',
          'bottom',
          'inside',
          'insideTop',
          'insideLeft',
          'insideRight',
          'insideBottom',
          'insideTopLeft',
          'insideTopRight',
          'insideBottomLeft',
          'insideBottomRight'
        ];
        app.configParameters = {
          rotate: {
            min: 180,
            max: 90
          },
          align: {
            options: {
              left: 'left',
              center: 'center',
              right: 'right'
            }
          },
          verticalAlign: {
            options: {
              top: 'top',
              middle: 'middle',
              bottom: 'bottom'
            }
          },
          position: {
            options: posList.reduce(function (map, pos) {
              map[pos] = pos;
              return map;
            }, {})
          },
          distance: {
            min: 0,
            max: 100
          }
        };
        app.config = {
          rotate: 390,
          align: 'left',
          verticalAlign: 'middle',
          position: 'insideBottom',
          distance: 15,
          onChange: function () {
            const labelOption = {
              rotate: app.config.rotate,
              align: app.config.align,
              verticalAlign: app.config.verticalAlign,
              position: app.config.position,
              distance: app.config.distance
            };
            myChart.setOption({
              series: [
                {
                  label: labelOption
                },
                {
                  label: labelOption
                },
                {
                  label: labelOption
                },
                {
                  label: labelOption
                }
              ]
            });
          }
        };
        const labelOption = {
          show: false,
          position: app.config.position,
          distance: app.config.distance,
          align: app.config.align,
          verticalAlign: app.config.verticalAlign,
          rotate: app.config.rotate,
          formatter: '{c}  {name|{a}}',
          fontSize: 16,
          rich: {
            name: {}
          }
        };
        let option = {
          title: {
            text: '利润表',
            subtext: '单位/元'
          },
          color: ['#ed7d31', '#a5a5a5', '#ffc000'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: ['实际数', '上年数', '预算数']
          },
          toolbox: {
            show: false,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
              mark: { show: false },
              dataView: { show: false, readOnly: false },
              magicType: { show: false, type: ['line', 'bar', 'stack'] },
              restore: { show: false },
              saveAsImage: { show: false }
            }
          },
          xAxis: [
            {
              type: 'category',
              axisTick: { show: false },
              data: ['营业收入', '营业成本', '毛利', '期间费用', '营业利润']
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '实际数',
              type: 'bar',
              barGap: 0,
              label: labelOption,
              emphasis: {
                focus: 'series'
              },
              data: [320, 332, 301, 334, 390]
            },
            {
              name: '上年数',
              type: 'bar',
              label: labelOption,
              emphasis: {
                focus: 'series'
              },
              data: [220, 182, 191, 234, 290]
            },
            {
              name: '预算数',
              type: 'bar',
              label: labelOption,
              emphasis: {
                focus: 'series'
              },
              data: [150, 232, 201, 154, 190]
            }
          ]
        };
        this.char.setOption(option)
      })
    },
    initChart2() {
      axios.get('form/monthlyreport').then(res => {

        let income = res.data.list[0].income
        let cost = res.data.list[0].cost
        let pureprofit = res.data.list[0].pureprofit
        let manageCost = res.data.list[0].manageCost
        let saleCost = res.data.list[0].saleCost
        let financeCost = res.data.list[0].financeCost
        let profit = res.data.list[0].profit
        this.char = echarts.init(document.querySelector('#main2'))
        let option = {
          title: {
            text: ''
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['收入', '成本', '毛利', '管理费用', '销售费用', '财务费用', '利润']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              // saveAsImage: {}
            }
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
              name: '收入',
              type: 'line',
              stack: 'Total',
              data: income
            },
            {
              name: '成本',
              type: 'line',
              stack: 'Total',
              data: cost
            },
            {
              name: '毛利',
              type: 'line',
              stack: 'Total',
              data: pureprofit
            },
            {
              name: '管理费用',
              type: 'line',
              stack: 'Total',
              data: manageCost
            },
            {
              name: '销售费用',
              type: 'line',
              stack: 'Total',
              data: saleCost
            },
            {
              name: '财务费用',
              type: 'line',
              stack: 'Total',
              data: financeCost
            },
            {
              name: '利润',
              type: 'line',
              stack: 'Total',
              data: profit
            },

          ]
        };
        this.char.setOption(option)

        console.log(286, income);


      })
    },

    async getecharts1Data() {
      let res = await getecharts1Data()
      console.log(198, res);
    },

    async getecharts2Data() {
      let res = await getecharts2Data()
      console.log(291, res);
    },
    async getIncomMonthTable() {
      let res = await getIncomMonthTable()
      console.log(225, res);
      this.data2 = res.data.list[0]
      console.log(270, res.data[0].list);
    },
    changeColor(buttonIndex) {
      this.buttonIndex = buttonIndex

    }
  },
  async created() {
    //获取echarts1数据
    this.getecharts1Data()


    this.getecharts2Data()

    //获取收入详情信息数据
    let res = await getIncomTable()
    console.log(246, res.data.list);
    this.data = res.data.list
    //获取月份表格数据
    this.getIncomMonthTable()

    this.initChart1()
  },
  mounted() {
    this.initChart2()
  },


}
</script>
<style lang="less" scoped>
.bgColor {
  background-color: #448fff;
}

.acu {
  margin-left: 25px;
}

.title {
  display: flex;
  align-items: center;
  font-size: 16px;

  .business {
    font-weight: 700;
    margin-right: 5px;
  }

  .right {
    margin-left: 5px;
  }
}

.navBox {
  height: 60px;
  background-color: #fff;
  display: flex;
  align-items: center;
  margin-top: 15px;

  .date {
    margin-left: 20px;

    .year {
      margin-left: 20px;
    }

    .month {
      margin-left: 25px;
    }
  }
}



.tableRow {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  .table1 {
    background-color: #fff;
    margin-right: 10px;
    overflow: scroll;
    height: 450px;

    .tableTitle1 {
      margin-left: 20px;
      margin-top: 20px;
      font-weight: 700;
      margin-bottom: 20px;
    }
  }

  .table2 {
    background-color: #fff;
    overflow: scroll;
    height: 450px;
    box-sizing: border-box;

    a-table>tr>td {
      padding: 16px 0px;
    }

    .tableTitle2 {
      margin-left: 20px;
      margin-top: 20px;
      font-weight: 700;
      margin-bottom: 20px;
    }
  }
}

.echartsRow {
  margin-top: 20px;
  height: 500px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;

  .echarts1 {
    height: 500px;
    width: 800px;

    .time {
      display: flex;
      align-items: center;
      font-weight: 700;
      height: 40px;

      .acumulateBtn {
        margin-left: 20px;
      }

      .MonthBtn {
        margin-left: 20px;
      }
    }

    .category {
      margin-top: 15px;
      align-items: center;
      font-weight: 700;

      .manageBtn {
        margin-left: 20px;
      }

      .sellBtn {
        margin-left: 20px;
      }

      .financeBtn {
        margin-left: 20px;
      }
    }

    .unit {
      margin-top: 15px;
    }

    .ico {
      display: flex;
      align-items: center;
      margin-top: 60px;
      margin-left: 13px;

      .actulIcon {
        width: 10px;
        height: 10px;
        margin-right: 15px;
        background-color: #5470c6;
      }

      .actulText {
        margin-right: 20px;
      }

      .caculateIcon {
        width: 10px;
        height: 10px;
        background-color: #91cc75;
      }

      .caculateText {
        margin-left: 15px;
      }

      .lastYearIcon {
        width: 10px;
        height: 10px;
        margin-left: 20px;
        background-color: #fac858;
      }

      .lastYearText {
        margin-left: 15px;
      }
    }

    #main {
      height: 400px;
      width: 800px;
      margin-top: 40px;
    }

  }

  .echarts2 {
    height: 500px;
    width: 800px;

    .time {
      display: flex;
      align-items: center;
      height: 40px;
    }

    .ico {
      display: flex;

      .actulIcon {
        width: 20px;
        height: 20px;
        background-color: red;
      }

      .caculateIcon {
        width: 20px;
        height: 20px;
        background-color: green;
      }

      .lastYearIcon {
        width: 20px;
        height: 20px;
        background-color: yellow;
      }
    }

    #main2 {
      height: 400px;
      width: 600px;
    }

  }

}
</style>
