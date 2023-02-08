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
        <operationCapibilityVue />
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
export default {
  components: { shortTerm, longTerm, operationCapibilityVue, profitEchart, InvestmentPayback },
  data() {
    return {
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