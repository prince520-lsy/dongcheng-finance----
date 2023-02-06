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
        <div class="ico">
          <div class="actulIcon"></div>
          <span class="actulText">实际</span>
          <div class="caculateIcon"></div>
          <span class="caculateText">预算</span>
          <div class="lastYearIcon"></div>
          <span class="lastYearText">去年同期</span>
        </div>

        <!-- echarts1 -->
        <fareEcharts />
        <!-- <div id="main"></div> -->
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


      <a-row :gutter="[8, 8]" type="flex">
        <a-col :span="12" class="echart3"></a-col>
        <a-row :span="12" class="echart4"></a-row>
      </a-row>
    </div>





  </div>
</template>
<script>
// const data = [
//   { project: '收入', month: '3223', qntq: '323', lj: '3223', qntqlj: '3233' },
//   { project: '利润', month: '3223', qntq: '323', lj: '3223', qntqlj: '3233' },
//   { project: '成本', month: '3223', qntq: '323', lj: '3223', qntqlj: '3233' },
//   { project: '营业费用', month: '3223', qntq: '323', lj: '3223', qntqlj: '666' },
//   { project: '管理费用', month: '3223', qntq: '323', lj: '3223', qntqlj: '3233' },
//   { project: '财务费用', month: '3223', qntq: '323', lj: '3223', qntqlj: '33' }
// ]
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
// const data2 = []
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
// const data2 = [
//   {
//     // key: '1',

//     incom: '422324',
//     cost: '23',
//     manageCost: '423',
//     saleCost: '123',
//     financeCost: '324',
//     profit: '424',
//     month: '212'
//     // tags: ['nice', 'developer'],
//   },
//   {
//     // key: '2',
//     month: '2',
//     incom: 42,
//     cost: '23',
//     manageCost: '423',
//     saleCost: '123',
//     financeCost: '324',
//     profit: '424',
//     // tags: ['loser'],
//   },
//   {
//     // key: '3',
//     month: '3',
//     incom: 32,
//     cost: '23',
//     manageCost: '423',
//     saleCost: '123',
//     financeCost: '324',
//     profit: '424',
//     // tags: ['cool', 'teacher'],
//   },
//   {
//     // key: '4',
//     month: '4',
//     incom: 32,
//     cost: '23',
//     manageCost: '423',
//     saleCost: '123',
//     financeCost: '324',
//     profit: '424',
//     // tags: ['cool', 'teacher'],
//   },
//   {
//     // key: '5',
//     month: '5',
//     incom: 32,
//     cost: '23',
//     manageCost: '423',
//     saleCost: '123',

//     financeCost: '324',
//     profit: '424',
//     // tags: ['cool', 'teacher'],
//   }, {
//     // key: '6',
//     month: '6',
//     incom: 32,
//     cost: '23',
//     manageCost: '423',
//     saleCost: '123',
//     financeCost: '324',
//     profit: '424',

//     // tags: ['cool', 'teacher'],
//   },
// ];
import * as echarts from 'echarts';
import echartWrap from '@/components/EchartWrap/Index.vue'
import fareEcharts from './components/fareEcharts.vue';
import echatLine from './components/echatLine.vue';
import { getIncomTable, getIncomMonthTable } from '@/api/incom'
export default {
  components: { echatLine, echartWrap, fareEcharts },
  data() {
    return {
      data,
      data2,
      columns,
      columns2,
      buttonIndex: 1
    };
  },
  methods: {
    async getIncomMonthTable() {
      let res = await getIncomMonthTable()
      console.log(225, res);
      this.data2 = res.data.list[0]
      console.log(270, res.data[0].list);
    },
    changeColor(buttonIndex) {
      this.buttonIndex = buttonIndex
      // let YearBtn = document.querySelector('.year');
      // console.log(270, YearBtn);
      // YearBtn.style.backgroundColor = 'blue'
    }
  },
  async created() {

    //获取收入详情信息数据
    let res = await getIncomTable()
    console.log(246, res.data.list);
    this.data = res.data.list
    //获取月份表格数据
    this.getIncomMonthTable()
  },
  mounted() {
    var app = {};
    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom);
    var option;
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
      rotate: 90,
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
    option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: ['Forest', 'Steppe', 'Desert', 'Wetland']
      },
      toolbox: {
        show: false,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar', 'stack'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      xAxis: [
        {
          type: 'category',
          axisTick: { show: false },
          data: ['收入', '成本', '毛利', '营业费用', '管理费用', '财务费用', '利润']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '实际',
          type: 'bar',
          barGap: 0,
          label: labelOption,
          emphasis: {
            focus: 'series'
          },
          data: [320, 332, 301, 334, 390, 500]
        },
        {
          name: '预算',
          type: 'bar',
          label: labelOption,
          emphasis: {
            focus: 'series'
          },
          data: [220, 182, 191, 234, 290, 43]
        },
        {
          name: '去年同期',
          type: 'bar',
          label: labelOption,
          emphasis: {
            focus: 'series'
          },
          data: [150, 232, 201, 154, 190, 321]
        }
      ]
    };
    option && myChart.setOption(option);
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
