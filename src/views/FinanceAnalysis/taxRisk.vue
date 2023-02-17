<template>
  <div id="app">
    <a-table :columns="columns" :data-source="data" :pagination='false'>
      <template #title><span style="font-size: 18px; font-weight: 800;">综合税负率</span></template>
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
import StackedEchart from './components/StackedEchart.vue';
const columns = [
  {
    title: '月份',
    dataIndex: 'time',
    width: 150,
  },
  {
    title: '收入',
    dataIndex: 'income',
    width: 150,
  },
  {
    title: '本期缴纳增值税',
    dataIndex: 'currentperiod',
  },
  {
    title: '本期缴纳消费税',
    dataIndex: 'consumption',
  },
  {
    title: '本期缴纳企业所得税',
    dataIndex: 'corporate',
  },
  {
    title: '增值税税负率',
    dataIndex: 'vatrate',
  },
  {
    title: '费税税负率',
    dataIndex: 'taxrate',
  },
  {
    title: '费税税负率',
    dataIndex: 'burdenrate',
  },
  {
    title: '费税税负率',
    dataIndex: 'Comprehensivetaxrate',
  },
  {
    title: '费税税负率',
    dataIndex: 'industryaverage',
  },
  {
    title: '附加',
    dataIndex: 'additional',
  },
  {
    title: '其他',
    dataIndex: 'other',
  },
];
const columns2 = [
  {
    dataIndex: 'name',
    key: 'name',
    slots: { title: 'customTitle' },
    scopedSlots: { customRender: 'name' },
  },
  {
    title: '收入',
    dataIndex: 'rate',
    key: 'rate',
  },

  {
    title: '成本',
    dataIndex: 'rate',
    key: 'rate',
  },
  {
    title: '费用',
    dataIndex: 'rate',
    key: 'rate',
  },
  {
    title: '所得税',
    dataIndex: 'rate',
    key: 'rate',
  },
  {
    title: '税负率',
    dataIndex: 'rate',
    key: 'rate',
  },
  {
    title: '行业参考值',
    dataIndex: 'rate',
    key: 'rate',
  },
  {
    title: '风险评判',
    key: 'tags',
    dataIndex: 'tags',
    scopedSlots: { customRender: 'tags' },
  },

];
const data = [];

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
export default {
  components: { StackedEchart },
  data() {
    return {
      data,
      data2,
      columns2,
      columns,
    };
  },
  methods: {
    async getTaskRisk() {
      let res = await getTaskRisk()
      console.log("taskTax", res);
      let Feb = res.data.list[0]
      this.data = Feb
    }
  },
  created() {
    this.getTaskRisk()
  },
};

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