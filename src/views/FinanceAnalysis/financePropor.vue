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
        <span style="visibility: hidden;">col-12</span>


        <a-tabs defaultActiveKey="2" @change='callback'>
          <a-tab-pane key="1" tab="营运资本">Content of Tab Pane 1</a-tab-pane>

          <a-tab-pane key="2" tab="流动比率" force-render>
            <shortTerm />
          </a-tab-pane>
          <a-tab-pane key="3" tab="速动比率">Content of Tab Pane 3</a-tab-pane>
          <a-tab-pane key="4" tab="现金比率">Content of Tab Pane 4</a-tab-pane>
          <a-tab-pane key="5" tab="现金流量比率">Content of Tab Pane 5</a-tab-pane>

        </a-tabs>
      </a-col>
      <a-col :span="12">
        <span style="visibility: hidden;">col-12</span>
        <a-tabs defaultActiveKey="2" @change='callback1'>
          <a-tab-pane key="1" tab="资产负债率">Content of Tab Pane 1</a-tab-pane>

          <a-tab-pane key="2" tab="产权比率" force-render>
            <longTerm />
          </a-tab-pane>
          <a-tab-pane key="3" tab="权益乘数">Content of Tab Pane 3</a-tab-pane>
          <a-tab-pane key="4" tab="长期资本负债率">Content of Tab Pane 4</a-tab-pane>
          <a-tab-pane key="5" tab="利息保障倍数">Content of Tab Pane 5</a-tab-pane>

        </a-tabs>


      </a-col>
    </a-row>

    <a-row>
      <a-col :span="12">
        <span style="visibility: hidden;">col-12</span>

        <a-tabs defaultActiveKey="2" @change='callback2'>
          <a-tab-pane key="1" tab="应收账款周转率">Content of Tab Pane 1</a-tab-pane>

          <a-tab-pane key="2" tab="存货周转率" force-render>
            <operationCapibilityVue />
          </a-tab-pane>
          <a-tab-pane key="3" tab="流动资产周转率">Content of Tab Pane 3</a-tab-pane>
          <a-tab-pane key="4" tab="营运资本周转率">Content of Tab Pane 4</a-tab-pane>
          <a-tab-pane key="5" tab="非流动资产周转率">Content of Tab Pane 5</a-tab-pane>

        </a-tabs>

      </a-col>
      <a-col :span="12">
        <span style="visibility: hidden;">col-12</span>

        <a-tabs defaultActiveKey="2" @change='callback3'>
          <a-tab-pane key="1" tab="销售净利率">Content of Tab Pane 1</a-tab-pane>

          <a-tab-pane key="2" tab="总资产净利率ROA" force-render>
            <profitEchart />

          </a-tab-pane>
          <a-tab-pane key="3" tab="权益净利率">Content of Tab Pane 3</a-tab-pane>
          <!-- <a-tab-pane key="4" tab="现金比率">Content of Tab Pane 4</a-tab-pane>
          <a-tab-pane key="5" tab="现金流量比率">Content of Tab Pane 5</a-tab-pane> -->

        </a-tabs>
      </a-col>
    </a-row>

    <a-row>

      <a-col :span="12">
        <span style="visibility: hidden;">col-12</span>

        <a-table :columns="columns" :data-source="data" :pagination='false' class="NameIndex">
          <template #title><span style="font-weight: 700; font-size: 18px;">财务预警</span></template>
          <a slot="name" slot-scope="text">{{ text }}</a>
          <span slot="customTitle">指标名称</span>
          <span slot="tags" slot-scope="tags">
            <a-tag v-for="tag in tags" :key="tag" :color="tag === '安全' ? 'green' : 'red'">
              {{ tag }}
            </a-tag>
          </span>

        </a-table>
      </a-col>


      <a-col :span="12">
        <span style="visibility: hidden;">col-12</span>
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

const columns = [
  {
    dataIndex: 'name',
    key: 'name',
    slots: { title: 'customTitle' },
    scopedSlots: { customRender: 'name' },
  },
  {
    title: '数值',
    dataIndex: 'rate',
    key: 'rate',
  },

  {
    title: '标签',
    key: 'tags',
    dataIndex: 'tags',
    scopedSlots: { customRender: 'tags' },
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
    callback(key) {
      console.log('key', key);
    },
    callback1(key) {
      console.log('key1', key);
    },
    callback2(key) {
      console.log('key2', key);
    },
    callback3(key) {
      console.log('key3', key);
    },

    changeColor(buttonIndex) {
      this.buttonIndex = buttonIndex
    }
  },
}
</script>
<style lang="less" scoped>
.NameIndex {
  width: 850px;
  height: 400px;
  background-color: #fff;
}



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