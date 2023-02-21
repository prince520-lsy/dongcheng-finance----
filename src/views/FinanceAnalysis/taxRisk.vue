<template>
  <div id="app">
    <a-table :columns="columns" :data-source="data" :pagination='false'>
      <template #title><span
          style="font-size: 18px; font-weight: 800; text-align: center;">税负风险控制表（行业分析）</span></template>
    </a-table>

    <a-table :columns="columns1" :data-source="data1" :pagination='false'>
      <template #title><span
          style="font-size: 18px; font-weight: 800; text-align: center;">税负风险控制表（比较分析）</span></template>
    </a-table>


    <a-table :columns="columns2" :data-source="data2" :pagination='false'>
      <template #title><span style="font-size: 18px; font-weight: 800; text-align: center;">小税种纳税比较表</span></template>
    </a-table>


  </div>
</template>
<script>
import { getTaskRisk } from '@/api/task';
import { ref, reactive } from '@vue/composition-api'
import StackedEchart from './components/StackedEchart.vue';
import { defineComponent } from '@vue/composition-api'
const columns = [
  {
    title: '增值税税负率',
    dataIndex: 'time',
    width: 400,
    children: [
      {
        title: '公司实际（%）',
        dataIndex: 'companyActully4',
        key: 'companyActully4',
        width: 200,
      },

      {
        title: '行业平均（%）',
        dataIndex: 'companyActully5',
        key: 'companyActully5',
        width: 200,
      },

      {
        title: '税负率小于同行业税负率30%预警',
        dataIndex: 'companyActully6',
        key: 'companyActully6',
        width: 200,
      },

    ]
  },

  {
    title: '企业所得税',
    dataIndex: 'time',
    width: 400,
    children: [
      {
        title: '公司实际（%）',
        dataIndex: 'companyActully3',
        key: 'companyActully3',
        width: 200,
      },

      {
        title: '行业平均（%）',
        dataIndex: 'companyActully1',
        key: 'companyActully1',
        width: 200,
      },

      {
        title: '税负率小于同行业税负率30%预警',
        dataIndex: 'companyActully2',
        key: 'companyActully2',
        width: 200,
      },

    ]
  },

];
const data = [
  {
    key: Date.now(),
    companyActully1: '32',
    companyActully2: '32',
    companyActully3: '32',
    companyActully4: '32',
    companyActully5: '32',
    companyActully6: '32',
  }
]

const columns1 = [
  {
    title: '收入',
    dataIndex: 'income',
    width: 150,
    children: [
      {
        title: '本期',
        dataIndex: 'bq',
        width: 75
      },
      {
        title: '上期',
        dataIndex: 'sq',
        width: 75
      },

    ]
  },

  {
    title: '实缴增值税',
    dataIndex: 'income',
    width: 300,
    children: [
      {
        title: '本期',
        dataIndex: 'bq',
        width: 75
      },
      {
        title: '上期',
        dataIndex: 'sq',
        width: 75
      },
      {
        title: '增值税税负变动率',
        dataIndex: 'sql',
        width: 75
      },
      {
        title: '纳税人同期税负变动率小于-30%预警',
        dataIndex: 'sqle',
        width: 75
      },

    ]
  },

  {
    title: '实缴企业所得税',
    dataIndex: 'income',
    width: 300,
    children: [
      {
        title: '本期',
        dataIndex: 'bq',
        width: 75
      },
      {
        title: '上期',
        dataIndex: 'sq',
        width: 75
      },
      {
        title: '所得税税额变动率',
        dataIndex: 'sql',
        width: 75
      },

      {
        title: '所得税税额变动率>50%或<-50%预警',
        dataIndex: 'sqle',
        width: 75
      },

    ]
  },

]
const data1 = [
  {
    bq: '21',
    sq: '21',
    sql: '21',
    sqle: '21',


  }
]

const columns2 = [
  {
    title: '名称',
    dataIndex: 'income',
    width: 150,
  },
  {
    title: '收入',
    dataIndex: 'income',
    width: 150,
  },
  {
    title: '本期纳税额',
    dataIndex: 'income',
    width: 150,
  },
  {
    title: '上期纳税额',
    dataIndex: 'income',
    width: 150,
  },
  {
    title: '本期占收入比',
    dataIndex: 'income',
    width: 150,
  },
  {
    title: '本期比上期增减额',
    dataIndex: 'income',
    width: 150,
  },
  {
    title: '增减比率',
    dataIndex: 'income',
    width: 150,
  },
]
const data2 = [
  {
    income: '10000'
  }
]
export default defineComponent({
  setup() {
    return {
      data,
      columns,
      data1,
      columns1,
      data2,
      columns2
    }
  }
})

</script>
<style lang="less" scoped>
#app {
  background-color: #fff;
  text-align: center;
}

.stackedEcherts {
  width: 1240px;
  height: 340px;
  margin-top: 80px;
}

.incomTax {
  margin-top: 130px;
}
</style>