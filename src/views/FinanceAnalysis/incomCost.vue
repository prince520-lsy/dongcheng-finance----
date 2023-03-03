<template>
  <div>
    <div class="YearTable">
      <h2 style="font-weight: 700; margin-left: 16px;">{{ companyname }}公司{{ day }}年：财务风险（绩效评价）分析报告：</h2>
      <!-- <div class="TabBar">
        <table border="1px solid #e8e8e8" cellspacing=10>
          <tr>
            <td>财务指标</td>
            <td>企业分值</td>
            <td>指标分值</td>
            <td>优秀值</td>
            <td>良好值</td>
            <td>临界值</td>
            <td>较低值</td>
            <td>较差值</td>
            <td>计算公式</td>
          </tr>
        </table>

      </div> -->

      <a-table :columns="columns0" :pagination="false" :scroll="{ x: 1200 }" bordered="true" />
      <a-table :dataSource="dataSource" :columns="columns" :pagination="false" :scroll="{ x: 1200 }" bordered="true" />

      <a-table :dataSource="dataSource1" :columns="columns1" :pagination="false" :scroll="{ x: 1200 }" bordered='true' />

      <a-table :dataSource="dataSource2" :columns="columns2" :pagination="false" :scroll="{ x: 1200 }" bordered="true" />

      <a-table :dataSource="dataSource3" :columns="columns3" :pagination="false" :scroll="{ x: 1200 }" bordered="true" />



    </div>


    <div class="singleIndex">

      <h2 style="font-weight: 700;"> 一、单项指标得分规则:</h2>
      <p>
        分别从盈力能力、运营能力、偿债能力、成长能力四个维度，每项三个指标，共计有代表性的12个财务指标，当Cx>Ex时,单项指标:得分100:当Fx&lt;Cx&lt;Ex时，得分90;当Fx&lt;Cx&lt;Gx时,得分80;当Gx&lt;Cx&lt;Hx时,得分70;当Ix&lt;Cx&lt;Hx时,得分60;当Cx&lt;Ix时,得分0;
      </p>


    </div>
    <a-row>
      <a-col :span="24">
        <span style="visibility: hidden;">col-12</span>
        <singleIndexBar />
      </a-col>
    </a-row>



    <div class="fourIndex">

      <h2 style="font-weight: 700;"> 二、四大能力指标分析</h2>
      <h2 style="font-weight: 700;"> 得分规则:</h2>
      <p> 1、盈利能力分析:三个指标平均分60分以下为盈利能力很低，61分-70分为盈利能力较低，71-80分为盈利能力一般，81到90分为盈利较强，91分到100分为盈利强，100分以上为盈利能力高过行业优秀值。</p>

      <hr>
      <p> 2、运营能力分析:三个指标平均分60分以下为运营能力很低，61分-70分为运营能力较低，71-80分为运营能力一般，81到90分为运营能力软强，91分到100分为运营能力强，100分以上为运营能力高过行业优秀值。</p>

      <hr>
      <p> 3、偿债能力分析:三个指标平均分60分以下为偿债能力很低，61分-70分为偿债能力较低，71-80分为偿债能力一般，81到90分为偿债能力较强，91分到100分为偿债能力强，100分以上为偿债能力高过行业优秀值。</p>

      <hr>
      <p> 4、成长能力分析;三个指标平均分60分以下为成长能力很低，61分-70分为成长能力较低，71-80分为成长能力一般，81到90分为成长能力较强，91分到100分为成长能力强，100分以上为成长能力高过行业优秀值。</p>

    </div>

    <a-row>
      <a-col :span="12">
        <span style="visibility: hidden;">col-12</span>
        <fourAbilityBar />
      </a-col>
      <a-col :span="12">
        <span style="visibility: hidden;">col-12</span>
        <!-- <echartPie4 /> -->
      </a-col>
    </a-row>

    <div class="evaluation">

      <h2>评价:</h2>
      <p>{{ profitability }}</p>
      <p> {{ profitability1 }}</p>
      <p>
        {{ profitability2 }}
      </p>
      <p>
        {{ profitability3 }}
      </p>
      <p>
        {{ profitability4 }}
      </p>
      <p>
        {{ profitability5 }}
      </p>

      <hr>
      <p>{{ operational }}</p>
      <p>{{ operational1 }}</p>
      <p>{{ operational2 }}</p>
      <p>{{ operational3 }}</p>

      <hr>

      <p>{{ solvency }}</p>
      <p>{{ solvency1 }}</p>
      <p>{{ solvency2 }}</p>
      <p>{{ solvency3 }}</p>
      <p>{{ solvency4 }}</p>

      <hr>

      <p>{{ ability }}</p>
      <p>{{ ability1 }}</p>
      <p>{{ ability2 }}</p>
      <p>{{ ability3 }}</p>
      <p>{{ ability4 }}</p>

    </div>

    <div class="taxRisk">
      <h2>三、财务风险(绩效评价)分析</h2>
      <hr>
      <h2>得分规则:</h2>
      <hr>
      <p>财务风险(绩效评价)由四大能力指标综合得分，通过对企业盈利能力、运营能力、偿债能力及发展能力的综合分析
        打分。四大能力结综合得分的平均值。低于60分，表明该企业财务风险(绩效评价)较差，出现财务风险严重问题，
        评分在61-70分较低,出现财务风险问题，评分在71分-80分绩效评价较好，81-90分绩效评价良好，91分-100分绩效评
        价优秀，100分以上高于行业优秀值。</p>
      <hr>
      <h2>结论:</h2>
      <hr>
      <!-- <p>该企业财务风险(绩效评价)分值在81分，表明该企业绩效评价良好，目前暂未出现财务风险问题。</p> -->
      <p>{{ conclusion }}</p>
    </div>


    <a-row class="yiBiaoPan3">
      <h2 class="grade1">较差</h2>
      <h2 class="grade2">较低</h2>
      <h2 class="grade3">平均</h2>
      <h2 class="grade4">良好</h2>
      <h2 class="grade5">优秀</h2>
      <a-col :span="24">
        <span style="visibility: hidden;">col-12</span>
        <yiBiaoPan3 />

      </a-col>
    </a-row>
  </div>
</template>
<script>
import * as echarts from 'echarts';
import { axios } from '@/utils/request';
import echartPie1 from './components/echartPie1.vue';
import echartPie2 from './components/echartPie2.vue';
import echartPie3 from './components/echartPie3.vue';
import echartPie4 from './components/echartPie4.vue';
import echartPie5 from './components/echartPie5.vue';
import yiBiaoPan from './components/yiBiaoPan.vue';
import yiBiaoPan2 from './components/yiBiaoPan2.vue';
import singleIndexBar from './components/singleIndexBar.vue';
import fourAbilityBar from './components/fourAbilityBar.vue'
import yiBiaoPan3 from './components/yiBiaoPan3.vue';
import { initTaxRiskTable } from '@/api/incomeCost'

export default {

  components: {
    echartPie1, echartPie2, echartPie3, echartPie4, echartPie5,
    yiBiaoPan, yiBiaoPan2,
    singleIndexBar, fourAbilityBar,
    yiBiaoPan3
  },
  data() {
    return {
      // dataSource0: [],
      dataSource: [],
      dataSource1: [],
      dataSource2: [],
      dataSource3: [],

      conclusion: '',
      companyname: '',
      day: '',
      profitability: '',
      profitability1: '',
      profitability2: '',
      profitability3: '',
      profitability4: '',
      profitability5: 'null',

      ability: '',
      ability1: '',
      ability2: '',
      ability3: '',
      ability4: '',

      operational: '',
      operational1: '',
      operational2: '',
      operational3: '',

      solvency: '',
      solvency1: '',
      solvency2: '',
      solvency3: '',
      solvency4: '',

      columns0: [

        {
          title: '财务指标',


        },
        {
          title: '企业分值',

        },
        {
          title: '指标分值',

        },
        {
          title: '优秀值',

        },
        {
          title: '良好值',

        },
        {
          title: '临界值',

        },
        {
          title: '较低值',

        },
        {
          title: '较差值',

        },
        {
          title: '计算公式',

        },
      ],
      columns: [

        {
          title: '盈利能力分析',
          dataIndex: 'title',
          key: 'title',

        },
        {
          title: '82',
          dataIndex: 'enterprise',
          key: 'enterprise',
        },
        {
          title: '',
          dataIndex: 'netscore',
          key: 'netscore',
        },
        {
          title: '',
          dataIndex: 'excellencevalue',
          key: 'excellencevalue',
        },
        {
          title: '',
          dataIndex: 'goodvalue',
          key: 'goodvalue',
        },
        {
          title: '',
          dataIndex: 'critical',
          key: 'critical',
        },
        {
          title: '',
          dataIndex: 'lowervalue',
          key: 'lowervalue',
        },
        {
          title: '',
          dataIndex: 'poorvalue',
          key: 'poorvalue',
        },
        {
          title: '',
          dataIndex: 'formula',
          key: 'formula',
        },
      ],
      columns1: [
        {
          title: '运营能力分析',
          dataIndex: 'title',
          key: 'title',
        },
        {
          title: '82',
          dataIndex: 'enterprise',
          key: 'enterprise',
        },
        {
          title: '',
          dataIndex: 'netscore',
          key: 'netscore',
        },
        {
          title: '',
          dataIndex: 'excellencevalue',
          key: 'excellencevalue',
        },
        {
          title: '',
          dataIndex: 'goodvalue',
          key: 'goodvalue',
        },
        {
          title: '',
          dataIndex: 'critical',
          key: 'critical',
        },
        {
          title: '',
          dataIndex: 'lowervalue',
          key: 'lowervalue',
        },
        {
          title: '',
          dataIndex: 'poorvalue',
          key: 'poorvalue',
        },
        {
          title: '',
          dataIndex: 'formula',
          key: 'formula',
        },
      ],
      columns2: [
        {
          title: '偿债能力分析',
          dataIndex: 'title',
          key: 'title',
        },
        {
          title: '82',
          dataIndex: 'enterprise',
          key: 'enterprise',
        },
        {
          title: '',
          dataIndex: 'netscore',
          key: 'netscore',
        },
        {
          title: '',
          dataIndex: 'excellencevalue',
          key: 'excellencevalue',
        },
        {
          title: '',
          dataIndex: 'goodvalue',
          key: 'goodvalue',
        },
        {
          title: '',
          dataIndex: 'critical',
          key: 'critical',
        },
        {
          title: '',
          dataIndex: 'lowervalue',
          key: 'lowervalue',
        },
        {
          title: '',
          dataIndex: 'poorvalue',
          key: 'poorvalue',
        },
        {
          title: '',
          dataIndex: 'formula',
          key: 'formula',
        },
      ],
      columns3: [
        {
          title: '成长能力分析',
          dataIndex: 'title',
          key: 'title',
        },
        {
          title: '82',
          dataIndex: 'enterprise',
          key: 'enterprise',
        },
        {
          title: '',
          dataIndex: 'netscore',
          key: 'netscore',
        },
        {
          title: '',
          dataIndex: 'excellencevalue',
          key: 'excellencevalue',
        },
        {
          title: '',
          dataIndex: 'goodvalue',
          key: 'goodvalue',
        },
        {
          title: '',
          dataIndex: 'critical',
          key: 'critical',
        },
        {
          title: '',
          dataIndex: 'lowervalue',
          key: 'lowervalue',
        },
        {
          title: '',
          dataIndex: 'poorvalue',
          key: 'poorvalue',
        },
        {
          title: '',
          dataIndex: 'formula',
          key: 'formula',
        },
      ],

    };
  },


  methods: {
    async initTaxRiskTable() {
      let res = await initTaxRiskTable()
      console.log("res", res);
      let Tab1Value = res.data.financial[0].values
      let Tab2Value = res.data.financial[1].values
      let Tab3Value = res.data.financial[2].values
      let Tab4Value = res.data.financial[3].values
      console.log("Tab1Value", Tab1Value);
      let conclusion = res.data.conclusion
      console.log("conclusion", conclusion);
      this.conclusion = conclusion

      let companyname = res.data.companyname
      this.companyname = companyname
      let day = res.data.day
      this.day = day
      let financialVal = res.data.financial[0].value
      let financialVal1 = res.data.financial[1].value
      let financialVal2 = res.data.financial[2].value
      let financialVal3 = res.data.financial[3].value
      let profitability = res.data.profitability[0]
      let profitability1 = res.data.profitability[1]
      let profitability2 = res.data.profitability[2]
      let profitability3 = res.data.profitability[3]
      let profitability4 = res.data.profitability[4]
      let profitability5 = res.data.profitability[5]
      console.log("profitability5", profitability5);
      this.profitability5 = profitability5

      this.profitability = profitability
      this.profitability1 = profitability1
      this.profitability2 = profitability2
      this.profitability3 = profitability3
      this.profitability4 = profitability4
      let operational = res.data.operational[0]
      let operational1 = res.data.operational[1]
      let operational2 = res.data.operational[2]
      let operational3 = res.data.operational[3]
      this.operational = operational
      this.operational1 = operational1
      this.operational2 = operational2
      this.operational3 = operational3
      let solvency = res.data.solvency[0]
      let solvency1 = res.data.solvency[1]
      let solvency2 = res.data.solvency[2]
      let solvency3 = res.data.solvency[3]
      let solvency4 = res.data.solvency[4]
      this.solvency = solvency
      this.solvency1 = solvency1
      this.solvency2 = solvency2
      this.solvency3 = solvency3
      this.solvency4 = solvency4
      let ability = res.data.ability[0]
      let ability1 = res.data.ability[1]
      let ability2 = res.data.ability[2]
      let ability3 = res.data.ability[3]
      let ability4 = res.data.ability[4]

      this.ability = ability
      this.ability1 = ability1
      this.ability2 = ability2
      this.ability3 = ability3
      this.ability4 = ability4
      this.columns[1].title = financialVal
      this.columns1[1].title = financialVal1
      this.columns2[1].title = financialVal2
      this.columns3[1].title = financialVal3
      this.dataSource = Tab1Value
      this.dataSource1 = Tab2Value
      this.dataSource2 = Tab3Value
      this.dataSource3 = Tab4Value
    }
  },

  created() {
    this.initTaxRiskTable()
  },

}
</script>
<style lang="less" scoped>
.yiBiaoPan3 {
  position: relative;
}

.ant-table-tbody>tr>td {
  text-align: center;
}

.TabBar {
  display: flex;
  justify-content: space-around;
  border: 1px solid #e8e8e8;
  height: 54px;
  line-height: 54px;

  table tr td {
    border-spacing: 15px 10px;
  }


  div {}

  div:nth-child(2) {}

  div:nth-child(3) {}

  div:nth-child(4) {
    margin-left: 108px;
  }

  div:nth-child(5) {}

  div:nth-child(6) {}

  div:nth-child(7) {}

  div:nth-child(8) {}

  div:nth-child(9) {}

}

.grade1 {
  position: absolute;
  top: 259px;
  left: 520px;
}

.grade2 {
  position: absolute;
  top: 130px;
  left: 564px;
}

.grade3 {
  position: absolute;
  top: 27px;
  left: 687px;
}

.grade4 {
  position: absolute;
  top: -7px;
  left: 832px;
}

.grade5 {
  position: absolute;
  top: 132px;
  left: 1115px;
}

.singleIndex {
  border: 1px solid black;
  padding-left: 16px;
}

.taxRisk {
  border: 1px solid black;
  padding-left: 16px;
}

.evaluation {
  border: 1px solid black;
  padding-left: 16px;
}

.fourIndex {
  border: 1px solid black;
  padding-left: 16px;
}

#main {
  width: 700px;
  height: 400px;

}

/deep/ .ant-table-placeholder {
  height: 100px;
  display: none;
}

/deep/ .ant-empty {
  display: none;
}
</style>