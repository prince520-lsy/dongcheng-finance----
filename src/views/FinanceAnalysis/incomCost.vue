<template>
  <div>
    <div class="YearTable">
      <h2 style="font-weight: 700; margin-left: 16px;">某某公司2023年：财务风险（绩效评价）分析报告：</h2>
      <div class="TabBar"><span>财务指标</span><span>企业分值</span><span>指标分值</span>
        <span>优秀值</span>
        <span>良好值</span><span>临界值</span><span>较低值</span><span>较差值</span>
        <span>计算公式</span>
      </div>
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
      <p>1、盈利能力分析:指企业赚取利润的能力，这类指标的值越高越积极，该企业分值在(83)分，表明该企业盈利能力(较强)。</p>
      <p> 1.1该企业净资产收益率(8.5%)，得分(90)分，该指标是综合性最强盈利能力表征指标:判断其优劣的依据与同行业比较，属于(优秀)。</p>
      <p>
        1.2该企业总资产报酬率(3.8%)，得分(80)分，该指标与净资产收益率同为重要盈利性指标，华中体理资产运用效率和资金利用效果之间的关系。在企业资产总额一定的情况下，利用总资产收益率指标可以分析企业盈利的稳定性和持久性，确定企业所面临的风险，与同行业比较。属干(一般)。
      </p>

      <p> 1.3该企业销售利润率(11.6%)，得分(80)分，该指标衡量企业经营效率，反映了企业管理者通过产品经营获取利润的能力。与同行业比较，属于(良好)。</p>
      <p>1.4该企业成本费用利润率6.5%，得分80分，表明每付出一元成本费用可获得多少利润，体现了经营耗费所带来的经营成果。该项指标越高，利润就越大，反映企业的经济效益越好，与同行
        业比较，属于良好。</p>
      <hr>
      <p>2、运营能力分析:指企业营运资产的效率与效益能力，这类指标越高越反映企业的资产周转速度快。该企业分值在(87)分，表明该企业运营能力(较强)。</p>
      <p>2.1该企业应收账款周转率(6)次，存货周转率(10)次，营业周期(96)天，营业周期的长短说明企业资本从供应商开始直道最后将产品卖出去并收回货款需要的总时间反映资产流转速度。与同行业比较，属于(优秀)。</p>

      <p> 2.2该企业总资产周转率(1.2)次，超过一年周转一次，反映企业所有资产的运转速度。与同行业比较，属于(优秀)。</p>
      <p>2.3该企业流动资产周转率3.6次，反映了企业流动资产的周转速度，是从企业全部资产中流动性最强的流动资产角度对企业资产的利用效率进行分析，以进一步揭示影响企业资产质量的主
        要因素。与同行业比较，属于优秀。</p>
      <hr>
      <p> 3.偿债能力分析:企业有无支付现金的能力和偿还债务能力，是企业能否生存和健康发展的关键，该企业分值在(77)分。表明该企业偿债能力(一般)。</p>

      <p> 3.1该企业资产负债率(65%)，得分(70)分，负债占总资产的比重，反映债权人利益保护程度，比值越小，债权人保障程度越高;和同行业比，偿债能力(较低)</p>
      <p> 3.2该企业已获利息倍数为(4)倍，得分(90)分，比值越高说明偿付利息的能力越强。公司在目前盈利水平下可以支付当下(4)倍的债务利息。</p>
      <p> 3.3该企业的速动比率(78%)，得分(70)分，它表明企业的每1元流动负债就有1元易于变现的速动资产来抵偿，短期偿债能力有可靠的保证。与同行业比较，短期偿债能
        力(一般)</p>
      <p>3.4该企业的现金流动负债比率4.5%，得分70分，反映本期经营活动所产生的现金净流量足以抵付流动负债的倍数。与同行业比较，偿债能力一般。</p>
      <hr>
      <p> 4、成长能力分析，是指企业未来发展趋势与发展速度，包括企业规模的扩大，利润和所有者权益的增加。该企业分值在(73)分，表明该企业成长能力(一股)。</p>
      <p> 4.1该企业销售收入增长率(15%)，得分(80)分，是分析企业成长状况和发展能力的基本指标，与同行业比较，属于(良好)。</p>
      <p> 4.2该企业销售利润增长率(18%)，得分(80)分，反映企业营业利润的增减变动情况。一般和销售收入增长半成正增长，此处高于它，与同行业比较属于(良好)。</p>
      <p> 4.3该企业资本保值增值率(95%)，得分(60)分，反映了投资者对企业资本投资的安全性和成长性，与同行业比较属于成长能力(很低)。</p>
      <p>4.4该企业总资产增长率10%，得分90分，总资产增长率越高，表明企业一定时期内资产经营规模扩张的速度越快。与同行业比较属于优秀。</p>
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
      dataSource: [],
      dataSource1: [],
      dataSource2: [],
      dataSource3: [],

      conclusion: '',
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
      let financialVal = res.data.financial[0].value
      let financialVal1 = res.data.financial[1].value
      let financialVal2 = res.data.financial[2].value
      let financialVal3 = res.data.financial[3].value

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

.TabBar {
  display: flex;
  justify-content: flex-start;
  border: 1px solid #e8e8e8;

  span {
    margin-left: 16px;
  }

  span:nth-child(2) {
    margin-left: 106px;
  }

  span:nth-child(3) {
    margin-left: 108px;
  }

  span:nth-child(4) {
    margin-left: 108px;
  }

  span:nth-child(5) {
    margin-left: 128px;
  }

  span:nth-child(6) {
    margin-left: 127px;
  }

  span:nth-child(7) {
    margin-left: 130px;
  }

  span:nth-child(8) {
    margin-left: 129px;
  }

  span:nth-child(9) {
    margin-left: 144px;
  }

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
</style>