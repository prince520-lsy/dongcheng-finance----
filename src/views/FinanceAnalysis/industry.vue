<template>
  <div>

    <!-- 资产质量 -->
    <div>
    <a-table :columns="columns" :data-source="data" :pagination="false" bordered>
    <template slot="name" slot-scope="text">
      <a>{{ text }}</a>
    </template>
    <template slot="title" slot-scope="currentPageData">
      资产质量
    </template>

  </a-table>
    </div>

    <!-- 债务风险 -->
    <div>
    <a-table :columns="columns1" :data-source="data1" :pagination="false" bordered>
    <template slot="name" slot-scope="text">
      <a>{{ text }}</a>
    </template>
    <template slot="title" slot-scope="currentPageData">
      债务风险
    </template>

  </a-table>
    </div>
    <div>
    <a-table :columns="columns" :data-source="data" :pagination="false" bordered>
    <template slot="name" slot-scope="text">
      <a>{{ text }}</a>
    </template>
    <template slot="title" slot-scope="currentPageData">
      Header
    </template>

  </a-table>
    </div>
    <div>
    <a-table :columns="columns" :data-source="data" :pagination="false" bordered>
    <template slot="name" slot-scope="text">
      <a>{{ text }}</a>
    </template>
    <template slot="title" slot-scope="currentPageData">
      Header
    </template>

  </a-table>
    </div>
    <div>
    <a-table :columns="columns" :data-source="data" :pagination="false" bordered>
    <template slot="name" slot-scope="text">
      <a>{{ text }}</a>
    </template>
    <template slot="title" slot-scope="currentPageData">
      Header
    </template>

  </a-table>
    </div>
    <div>
    <a-table :columns="columns" :data-source="data" :pagination="false" bordered>
    <template slot="name" slot-scope="text">
      <a>{{ text }}</a>
    </template>
    <template slot="title" slot-scope="currentPageData">
      资产质量
    </template>

  </a-table>
    </div>
  </div>
</template>
<script>
const columns = [
  {
    title: '指标点',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' },
  },
  {
    title: '实际',
    className: 'column-money',
    dataIndex: 'money',
  },
  {
    title: '行业指标',
    dataIndex: 'address',
  },
  {
    title: '说明',
    dataIndex: 'address',
  },
  
];
const columns1 = [
  {
    title: '指标点',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' },
  },
  {
    title: '实际',
    className: 'column-money',
    dataIndex: 'money',
  },
  {
    title: '行业指标',
    dataIndex: 'address',
  },
  {
    title: '说明',
    dataIndex: 'address',
  },
  
];
const data = [
  {
    key: '1',
    name: '总资产周转率（%）',
    money: '主营业务收入，平均资产总额',
    address: '---',
  },
  {
    key: '2',
    name: '应收账周转率（%）',
    money: '主营业务收入=应收帐平均余额',
    address: '---',
  },
  {
    key: '3',
    name: '不良资产比率（%）',
    money: '[年末不良资产总额-（资产总额+资产减值准备余额）]*100%',
    address: '---',
  },
  {
    key: '4',
    name: '流动资产周转率（%）',
    money: '主营业务-平均流动资产总额',
    address: '---',
  },
  {
    key: '5',
    name: '不良资产比率（%）',
    money: '经营现金净流量，平均资产总额*100%',
    address: '---',
  },
];
const data1 = [
  {
    key: '1',
    name: '资产负债率（%）',
    money: '(负债总额-资产总额)*100%',
    address: '---',
  },
  {
    key: '2',
    name: '已获取利息倍数',
    money: '（利润总额+利息支出）=利息支出',
    address: '---',
  },
  {
    key: '3',
    name: '速度比率（%）',
    money: '（速度资产流动负债）*100%',
    address: '---',
  },
  {
    key: '4',
    name: '带息负债比率（%）',
    money: '[(短期借款+长期借款+应付债券+应付利息)-负债总额]*100%',
    address: '---',
  },
  {
    key: '5',
    name: '或有负债比率（%）',
    money: '（或有负债余额-所有者权益）*100%',
    address: '---',
  },
];
export default {
    data() {
      return {
        data,
        data1,
        

        columns,
        columns1,
        

      }
  },
    methods: {
      
  },
    
  
}
</script>