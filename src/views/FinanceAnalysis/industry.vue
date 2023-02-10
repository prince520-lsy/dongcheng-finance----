<template>
  <div class="box">

    <!-- 盈利分析 -->
    <div>
      <a-table :columns="columns" :data-source="data0" :pagination="false" bordered>
        <template slot="name" slot-scope="text">
          <a>{{ text }}</a>
        </template>
        <template slot="title" slot-scope="currentPageData">
          <span class="title">盈利分析 </span>
        </template>

      </a-table>
    </div>

    <!-- 资产质量 -->
    <div>
      <a-table :columns="columns" :data-source="data" :pagination="false" bordered>
        <template slot="name" slot-scope="text">
          <a>{{ text }}</a>
        </template>
        <template slot="title" slot-scope="currentPageData" class="title">
          <span class="title">资产质量分析</span>
        </template>

      </a-table>
    </div>

    <!-- 债务风险 -->
    <div>
      <a-table :columns="columns" :data-source="data1" :pagination="false" bordered>
        <template slot="name" slot-scope="text">
          <a>{{ text }}</a>
        </template>
        <template slot="title" slot-scope="currentPageData">
          <span class="title">债务风险状况</span>
        </template>

      </a-table>
    </div>

    <!-- 经营增长 -->
    <div>
      <a-table :columns="columns" :data-source="data2" :pagination="false" bordered>
        <template slot="name" slot-scope="text">
          <a>{{ text }}</a>
        </template>
        <template slot="title" slot-scope="currentPageData">
          <span class="title">经营增长状况</span>
        </template>

      </a-table>
    </div>

    <!-- 补充 -->
    <div>
      <a-table :columns="columns" :data-source="data3" :pagination="false" bordered>
        <template slot="name" slot-scope="text">
          <a>{{ text }}</a>
        </template>
        <template slot="title" slot-scope="currentPageData">
          <span class="title">补充资料</span>
        </template>

      </a-table>
    </div>


  </div>
</template>
<script>


const columns = [
  {
    title: '项目',
    dataIndex: 'project',
    scopedSlots: { customRender: 'project' },
  },
  {
    title: '实际',
    className: 'column-money',
    dataIndex: 'actually',
  },
  {
    title: '行业指标',
    dataIndex: 'industryIndex',
  },
  {
    title: '说明',
    dataIndex: 'explain',
  },

];


const data0 = []
const data = []
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
const data2 = [
  {
    key: '1',
    name: '销售（营业）增长率（%）',
    money: '(本土主营业务收入增长额-上年主营业务收入)*100%',
    address: '---',
  },
  {
    key: '2',
    name: '资本保值增值率（%）',
    money: '（扣除客观因素后的年末所有者权益-年初所有者权益）*100%',
    address: '---',
  },
  {
    key: '3',
    name: '销售（营业）利润增长率（%）',
    money: '（本年主营业务利润增长额/上年主营业务利润）*100%',
    address: '---',
  },
  {
    key: '4',
    name: '总额增长率（%）',
    money: '(经营现金净流量-流动负债)*100%',
    address: '---',
  },
  {
    key: '5',
    name: '技术投入比率（%）',
    money: '（本年科技支出合计-主营业务收入）*100%',
    address: '---',
  },
];
const data3 = [
  {
    key: '1',
    name: '存贷周转率（%）',
    money: '主营业务成本/存货平均余额',
    address: '---',
  },
  {
    key: '2',
    name: '三年销售平均增长率（%）',
    money: '[(当年主营业务收入-三年前主营业务收入)开3次方-1]*100%',
    address: '---',
  },
  {
    key: '3',
    name: '成本费用占主营收入比（%）',
    money: '（成本费用总额-主营业务收入）*100%',
    address: '---',
  },
  {
    key: '4',
    name: '经济增加值率（%）',
    money: '(经济增加值-调整后资本)*100%',
    address: '---',
  },
  {
    key: '5',
    name: 'EBITDA（%）',
    money: '（净利润+所得税+利息支出+固定资产+无形资产）/主营业务收入*100%',
    address: '---',
  },
  {
    key: '6',
    name: '资本累计率（%）',
    money: '（年末所有者权益-年初所有者权益）-年初所有者权益*100%',
    address: '---',
  },
];

import { getIndustryTable1Data } from '@/api/industry';
export default {
  data() {
    return {
      data0,
      data,
      data1,
      data2,
      data3,
      columns,
    }
  },
  methods: {
    async getIndustryTable1Data() {
      let res = await getIndustryTable1Data()
      let firstInfo = res.data.data[0].list
      console.log(377, res.data.data);

      //盈利分析
      this.data0 = firstInfo

      //assets quality
      let assetsQuality = res.data.data[1].list
      console.log(388, assetsQuality);
      this.data = assetsQuality

      //debt risk
      let debtRisk = res.data.data[2].list
      this.data1 = debtRisk

      //经营增长状况
      let operationIncrease = res.data.data[3].list
      this.data2 = operationIncrease

      //further infomation
      let furtherInfo = res.data.data[4].list
      this.data3 = firstInfo
    }
  },
  created() {
    this.getIndustryTable1Data()
  },


}
</script>
<style lang="less" scoped>
.title {
  font-size: 18px;
  font-weight: 700;
}

.ant-table-tbody>tr>td {

  width: 585px;

}
</style>