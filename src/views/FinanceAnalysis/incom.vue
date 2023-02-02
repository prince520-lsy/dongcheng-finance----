<template>
  <div>

    <div class="navBox">

      <div class="date">选择日期
        <a-button class="year">
          年
        </a-button>
        <a-button type="primary" class="month">月</a-button>
        <a-button class="month">累计</a-button>

      </div>
    </div>

    <div class="tableRow">
      <div class="table1">

        <div class="tableTitle1">收入成本预算费用表</div>
        <a-table :columns="columns" :data-source="data" :pagination="false">
          <a slot="name" slot-scope="text">{{}}</a>
        </a-table>
      </div>

      <div class="table2">
        <div class="tableTitle2">收入成本预算费用表</div>
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
        <div id="main"></div>
      </div>

      <div class="echarts2">
        <div class="time">

        </div>
        <div class="category">

        </div>


        <!-- echarts2 -->

        <echatLine />
        <div id="main"></div>
      </div>

    </div>





  </div>
</template>
<script>
const data = []
// const columns = [{ title: '项目', ellipsis: true },]
const columns = [
  {
    title: '项目',

  },
  {
    title: '当月',

  },
  {
    title: '去年同期',

  },
  {
    title: '累计',

  },
  {
    title: '去年同期累计',

    ellipsis: true,
  },

];
const columns2 = [
  {
    title: '月份',
    dataIndex: 'name',
    key: 'name',
    scopedSlots: { customRender: 'name' },
  },
  {
    title: '成本',
    dataIndex: 'age',
    key: 'age',
    width: 80,
  },
  {
    title: '毛利',
    dataIndex: 'address',
    key: 'address 1',
    ellipsis: true,
  },
  {
    title: '管理费用',
    dataIndex: 'address',
    key: 'address 2',
    ellipsis: true,
  },
  {
    title: '销售费用',
    dataIndex: 'address',
    key: 'address 3',
    ellipsis: true,
  },
  {
    title: '财务费用',
    dataIndex: 'address',
    key: 'address 4',
    ellipsis: true,
  },
  {
    title: '利润',
    dataIndex: 'address',
    key: 'address 5',
    ellipsis: true,
  },
];



//   {
//     key: '2',
//     name: '毛利',
//     age: 42,
//     address: '42',
//     tags: ['loser'],
//   },
//   // {
//   //   key: '3',
//   //   name: '管理费用',
//   //   age: 32,
//   //   address: '32',
//   //   tags: ['cool', 'teacher'],
//   // },
//   // {
//   //   key: '4',
//   //   name: '销售费用',
//   //   age: 32,
//   //   address: '32',
//   //   tags: ['cool', 'teacher'],
//   // },
//   // {
//   //   key: '5',
//   //   name: '财务费用',
//   //   age: 32,
//   //   address: '32',
//   //   tags: ['cool', 'teacher'],
//   // },
//   // {
//   //   key: '6',
//   //   name: '利润',
//   //   age: 32,
//   //   address: '32',
//   //   tags: ['cool', 'teacher'],
//   // },
// ];
const data2 = [
  {
    key: '1',
    name: '1',
    age: 32,
    address: '23',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: '2',
    age: 42,
    address: '42',
    tags: ['loser'],
  },
  {
    key: '3',
    name: '3',
    age: 32,
    address: '32',
    tags: ['cool', 'teacher'],
  },
  {
    key: '4',
    name: '4',
    age: 32,
    address: '32',
    tags: ['cool', 'teacher'],
  },
  {
    key: '5',
    name: '5',
    age: 32,
    address: '32',
    tags: ['cool', 'teacher'],
  }, {
    key: '6',
    name: '6',
    age: 32,
    address: '32',
    tags: ['cool', 'teacher'],
  },
];
import * as echarts from 'echarts';
import echatLine from './components/echatLine.vue';
import { getIncomTable } from '@/api/incom'
export default {
  components: { echatLine },
  data() {
    return {
      data,
      data2,
      columns,
      columns2
    };
  },
  methods: {
    reder() {

    }
  },
  async created() {
    let res = await getIncomTable()
    console.log(246, res);

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
          data: ['1月', '2月', '3月', '4月', '5月', '6月']
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

    .tableTitle1 {
      margin-left: 20px;
      margin-top: 20px;
      font-weight: 700;
      margin-bottom: 20px;
    }
  }

  .table2 {
    background-color: #fff;

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
  height: 400px;
  display: flex;
  justify-content: space-between;

  // background-color: green;
  .echarts1 {
    height: 500px;
    // display: flex;
    width: 800px;
    background-color: #fff;

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
      margin-top: 15px;

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
      background-color: #fff;
    }

  }

  .echarts2 {
    height: 500px;
    // display: flex;
    width: 800px;
    background-color: #fff;

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
      background-color: #fff;
    }

  }

}
</style>
