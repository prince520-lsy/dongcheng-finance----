<template>
  <div>
    <div class="navBox">
      <div class="date">选择日期
        <a-button class="year" @click="changeColor(1)" :class="buttonIndex==1?'bgColor':''">
          年
        </a-button>
        <a-button class="month" @click="changeColor(2)" :class="buttonIndex == 2 ? 'bgColor' : ''">月</a-button>

      </div>
    </div>

    <a-row>
      <a-col :span="12">
        col-12
        <shortTerm />
      </a-col>
      <a-col :span="12">
        col-12
        <longTerm />
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="12">
        col-12
        <operationCapibilityVue />
      </a-col>
      <a-col :span="12">
        col-12
        <profitEchart />
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="12">
        col-12
        <a-table :columns="columns" :data-source="data" :pagination='false'>
          <a slot="name" slot-scope="text">{{ text }}</a>
          <span slot="customTitle"><a-icon type="smile-o" /> Name</span>
          <span slot="tags" slot-scope="tags">
            <a-tag v-for="tag in tags" :key="tag"
              :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'">
              {{ tag.toUpperCase() }}
            </a-tag>
          </span>
          <span slot="action" slot-scope="text, record">
            <a>Invite 一 {{ record.name }}</a>
            <a-divider type="vertical" />
            <a>Delete</a>
            <a-divider type="vertical" />
            <a class="ant-dropdown-link"> More actions <a-icon type="down" /> </a>
          </span>
        </a-table>
      </a-col>
      <a-col :span="12">
        col-12
        <InvestmentPayback />
      </a-col>
    </a-row>


  </div>
</template>
<script>
import shortTerm from './components/shortTerm.vue';
import longTerm from './components/longTerm.vue';
import operationCapibilityVue from './components/operationCapibility.vue.vue';
import profitEchart from './components/profitEchart.vue';
import investmentPayback from './components/investmentPayback.vue';
import InvestmentPayback from './components/investmentPayback.vue';

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

const columns = [
  {
    dataIndex: 'name',
    key: 'name',
    slots: { title: 'customTitle' },
    scopedSlots: { customRender: 'name' },
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    scopedSlots: { customRender: 'tags' },
  },
  {
    title: 'Action',
    key: 'action',
    scopedSlots: { customRender: 'action' },
  },
];
export default {
  components: { shortTerm, longTerm, operationCapibilityVue, profitEchart, InvestmentPayback },
  data() {
    return {

      data,
      columns,
      buttonIndex: 2

    }
  },
  methods: {
    changeColor(buttonIndex) {
      this.buttonIndex = buttonIndex
    }
  },
}
</script>
<style lang="less" scoped>
.term {
  display: flex;
  justify-content: space-between;
}

.shortTerm {
  width: 800px;
  height: 400px;
  background-color: #fff;
  margin-top: 20px;
}

.longTerm {
  width: 800px;
  height: 400px;
  background-color: #fff;
  margin-top: 20px;
  margin-left: 900px;
}

.bgColor {
  background-color: #396fff;
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
</style>