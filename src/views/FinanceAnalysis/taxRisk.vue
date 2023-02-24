<template>
  <div id="app">
    <a-table :columns="columns" :data-source="data" :pagination='false' bordered="{true}">
      <template #title><span
          style="font-size: 18px; font-weight: 800; text-align: center;">税负风险控制表（行业分析）</span></template>
    </a-table>

    <a-table :columns="columns1" :data-source="data1" :pagination='false' bordered="{true}">
      <template #title><span
          style="font-size: 18px; font-weight: 800; text-align: center;">税负风险控制表（比较分析）</span></template>
    </a-table>


    <a-table :columns="columns2" :data-source="data2" :pagination='false' bordered="true">
      <template #title><span style="font-size: 18px; font-weight: 800; text-align: center;">小税种纳税比较表</span></template>
    </a-table>


    <a-row>
      <a-col :span="12">
        <span style="visibility: hidden;">col-12</span>


        <percentBarChart />
      </a-col>
      <a-col :span="12">
        <span style="visibility: hidden;">col-12</span>
        <StackedEchart />


      </a-col>
    </a-row>

  </div>
</template>
<script>
import { getTaskRisk } from '@/api/task';

import StackedEchart from './components/StackedEchart.vue';
import { defineComponent, defineAsyncComponent } from '@vue/composition-api'
import percentBarChart from './components/percentBarChart.vue'

const columns = [
  {
    title: '增值税税负率',
    // dataIndex: 'time',
    width: 400,
    children: [
      {
        title: '公司实际（%）',
        dataIndex: 'reality',
        key: 'reality',
        width: 200,
      },

      {
        title: '行业平均（%）',
        dataIndex: 'actualvat',
        key: 'actualvat',
        width: 200,
      },

      {
        title: '增值税负率小于同行业的30%预警',
        dataIndex: 'tags',
        key: 'tags',
        width: 200,
      },

    ]
  },

  {
    title: '企业所得税贡献率',
    // dataIndex: 'time',
    width: 400,
    children: [
      {
        title: '公司实际（%）',
        dataIndex: 'taxreality',
        key: 'taxreality',
        width: 200,
      },

      {
        title: '行业平均（%）',
        dataIndex: 'actualtax',
        key: 'actualtax',
        width: 200,
      },

      {
        title: '所得税贡献率小于同行业的-20%预警',
        dataIndex: 'tag',
        key: 'tag',
        width: 200,
      },

    ]
  },

];
const data = [
  // {
  //   // key: Date.now(),
  //   reality: '32',
  //   actualvat: '32',
  //   tags: '32',
  //   taxreality: '32',
  //   actualtax: '32',
  //   tag: '32',
  // }
]

const columns1 = [
  {
    title: '收入',
    dataIndex: 'income',
    width: 150,
    children: [
      {
        title: '本期',
        dataIndex: 'income',
        width: 75
      },
      {
        title: '上期',
        dataIndex: 'lastincome',
        width: 75
      },

    ]
  },

  {
    title: '实缴增值税',
    dataIndex: 'unpaidvat',
    width: 300,
    children: [
      {
        title: '本期',
        dataIndex: 'unpaidvat',
        width: 75
      },
      {
        title: '上期',
        dataIndex: 'lastunpaidvat',
        width: 75
      },
      {
        title: '增值税税负变动率',
        dataIndex: 'vatburden',
        width: 75
      },
      {
        title: '纳税人同期税负变动率小于-30%预警',
        dataIndex: 'text',
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
        dataIndex: 'money',
        width: 75
      },
      {
        title: '上期',
        dataIndex: 'lastmoney',
        width: 75
      },
      {
        title: '所得税税额变动率',
        dataIndex: 'rateofincome',
        width: 75
      },

      {
        title: '所得税税额变动率>50%或<-50%预警',
        dataIndex: 'tags',
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
    dataIndex: 'name',
    width: 150,
  },
  {
    title: '收入',
    dataIndex: 'income',
    width: 150,
  },
  {
    title: '本期纳税额',
    dataIndex: 'taxamount',
    width: 150,
  },
  {
    title: '上期纳税额',
    dataIndex: 'periodamount',
    width: 150,
  },
  {
    title: '本期占收入比',
    dataIndex: 'proportion',
    width: 150,
  },
  {
    title: '本期比上期增减额',
    dataIndex: 'decrease',
    width: 150,
  },
  {
    title: '增减比率',
    dataIndex: 'decreaseratio',
    width: 150,
  },
]
const data2 = [

]

export default defineComponent({
  components: { StackedEchart, percentBarChart },


  setup() {
    return {
      data,
      columns,
      data1,
      columns1,
      data2,
      columns2
    }
  },
  data() {
    return {
      data,
      columns,
      data1,
      columns1,
      data2,
      columns2
    }
  },
  methods: {
    async getTaskRisk() {
      let res = await getTaskRisk()
      console.log('res', res);
      let table1 = res.data.list.analysis
      console.log('table1', table1);
      this.data = [table1]

      //smallTax
      let smalltaxes = res.data.list.smalltaxes
      console.log('smalltaxes', smalltaxes);
      this.data2 = smalltaxes

      //taxrisk
      let taxrisk = res.data.list.taxrisk
      console.log("taxrisk", taxrisk);
      this.data1 = [taxrisk]
    }
  },
  created() {
    this.getTaskRisk()
  },
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