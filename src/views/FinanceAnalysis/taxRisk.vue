<template>
  <div id="app">
    <a-table :columns="columns" :data-source="data" :pagination='false'>
      <template #title><span
          style="font-size: 18px; font-weight: 800; text-align: center;">税负风险控制表（行业分析）</span></template>
    </a-table>

    <!-- stackedEcherts -->
    <div class="stackedEcherts">
      <StackedEchart />
    </div>

    <a-table :columns="columns2" :data-source="data2" class="incomTax">
      <a slot="name" slot-scope="text">{{ text }}</a>
      <template #title><span style="font-size: 18px; font-weight: 700;">所得税</span></template>
      <span slot="customTitle">序号</span>
      <span slot="tags" slot-scope="tags">
        <a-tag v-for="tag in tags" :key="tag" :color="tag === '安全' ? 'green' : 'red'">
          {{ tag }}
        </a-tag>
      </span>

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
const data2 = [
  {
    key: '1',
    name: '运营资本比例',
    rate: '81.00%',
    tags: ['安全'],
  },
  {
    key: '1',
    name: '留档收益比例',
    rate: '44.00%',
    tags: ['危险'],
  },
  {
    key: '1',
    name: '息税前收益资产',
    rate: '53.00%',
    tags: ['危险'],
  },
  {
    key: '1',
    name: '权益收入资产比',
    rate: '86.00%',
    tags: ['安全'],
  },
  {
    key: '1',
    name: '销售收入资产比',
    rate: '52.00%',
    tags: ['安全'],
  },
];
export default defineComponent({
  setup() {
    return {
      data,
      columns
    }
  }
})

</script>
<style lang="less" scoped>
#app {
  background-color: #fff;
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