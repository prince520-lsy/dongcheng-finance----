<template>
  <div>
    <a-table :columns="columns" :data-source="data" :pagination="{ pageSize: 6 }">
      <template #title>税员监控表</template>
    </a-table>

    <!-- stackedEcherts -->
    <div class="stackedEcherts">
      <StackedEchart />
    </div>

    <a-table :columns="columns2" :data-source="data2" :pagination='true' class="incomTax">
      <a slot="name" slot-scope="text">{{ text }}</a>
      <template #title>所得税</template>
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

import StackedEchart from './components/StackedEchart.vue';
const columns = [
  {
    title: '月份',
    dataIndex: 'name',
    width: 150,
  },
  {
    title: '收入',
    dataIndex: 'age',
    width: 150,
  },
  {
    title: '材料成本',
    dataIndex: 'address',
  },
  {
    title: '本期进项',
    dataIndex: 'address',
  },
  {
    title: '本期销项',
    dataIndex: 'address',
  },
  {
    title: '本期纳税',
    dataIndex: 'address',
  },
  {
    title: '行业平均',
    dataIndex: 'address',
  },
  {
    title: '附加',
    dataIndex: 'address',
  },
  {
    title: '其他',
    dataIndex: 'address',
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
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}
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
};

</script>
<style lang="less" scoped>
.stackedEcherts {
  width: 1240px;
  height: 340px;
}

.incomTax {
  margin-top: 130px;
}
</style>