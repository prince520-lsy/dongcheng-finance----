<!-- 资产 > 资金 -->
<template>
  <div>
    <a-spin :spinning="loading">
    <a-row :gutter="[16,16]" type="flex" v-if="originData.length>5">
      <a-col :xs="24" :sm="24" :md="8" v-for="(item,index) in originData" :key="index">
        <a-card :bodyStyle="cardStyle" :title="null">
          <echart-wrap :isParentH='true'>
            <star-title slot="title" :title="item.nameCn"></star-title>
            <template v-if="item.name =='capitalReminderList'">
              <TableTop  :tableList="item.data"  :isLoop='item.data.list.length>5'/>
            </template>
            <template v-else-if="item.name =='capitalMoneyPercentList'">
              <CircleEcharts  :piedatalist="item.data" />
            </template>
            <template v-else-if="item.name =='capitalChangeAnalysisList'">
              <CandlestickEcharts  :canddatalist="item.data" />
            </template>
            <template v-else-if="item.name == 'capitalMoneyAnalysisList'
            || item.name == 'capitalInList'
            || item.name == 'capitalOutList'
            ">
              <ColumnEcharts :bardatalist="item.data?item.data:null" />
            </template>
          </echart-wrap>
        </a-card>
      </a-col>
    </a-row>
    </a-spin>
  </div>
</template>
<script>
  import echartWrap from '@/components/EchartWrap/Index.vue'
  import ColumnEcharts from '@/components/echarts/ColumnEcharts.vue'
  import CircleEcharts from '@/components/echarts/CircleEcharts.vue'
  import CandlestickEcharts from '@/components/echarts/CandlestickEcharts.vue'
  import MapEcharts from '@/components/echarts/MapEcharts.vue'
  import ChinaEcharts from '@/components/echarts/ChinaEcharts.vue'
  import starTitle from '../components/star-title.vue'
  import PercentMax from '../components/PercentMax.vue'
  import TableTop from '../components/TableTop.vue'
  import OrderComplete from '../components/OrderComplete.vue'
  import { getPieOption, OptionFlow } from '@/components/echarts/options.js'
  import {
  capitalMoneyPercent,
  capitalChangeAnalysis,
  capitalMoneyAnalysis,
  capitalIn,
  capitalOut,
  capitalReminder
} from '@/api/assets'
export default {
    name: 'purchase',
    components: {
      starTitle,
      echartWrap,
      CircleEcharts,
      ColumnEcharts,
      MapEcharts,
      ChinaEcharts,
      PercentMax,
      TableTop,
      OrderComplete,
      CandlestickEcharts
    },
    data() {
      return {
        params: { // 全局筛选入参
          date: [],
          date_key:0,
        },
        loading: false,
        originData:[],
        cardStyle:{
　　　　　　height:'',
           padding:0
　　　　},
      }
    },
    created(){
        this.$store.dispatch('getOptions',this.$route.path)
        window.addEventListener('resize', this.getHeight);
        this.getHeight()
    },
    destroyed(){
      window.removeEventListener('resize', this.getHeight)
    },
    mounted() {
      this.loadData()
      this.$eventBus.$off('changGlobalParms')
      this.$eventBus.$on('changGlobalParms',(e)=>{
        console.log('全局参数改变',e)
        if(e){
          this.params = {
            date_key:e.date_key,
            date: e.startDate ? [e.startDate, e.endDate] : []
          }
          this.loadData()
        }
      })
    },
    methods: {
      getHeight(){
        let height = window.innerHeight - 16 - 118;
        this.cardStyle.height = height/2 +'px'
      },
      loadData() {
      this.originData = []
      this.loading = true
        // 默认图表
        let name = [
          {url:'capitalReminderList',name:'贷款提示表',data:capitalReminder,chart:'table',seat:0},
          {url:'capitalChangeAnalysisList',name:'资金变动趋势',data:capitalChangeAnalysis,chart:'bar',seat:1},
          {url:'capitalMoneyPercentList',name:'资金存款占比',data:capitalMoneyPercent,chart:'circle',seat:2},
          {url:'capitalMoneyAnalysisList',name:'收支趋势',data:capitalMoneyAnalysis,chart:'bar',seat:3},
          {url:'capitalInList',name:'资金流入情况',data:capitalIn,chart:'bar',seat:4},
          {url:'capitalOutList',name:'资金流出情况',data:capitalOut,chart:'bar',seat:5},
          ]
        name.map((item,index)=>{
          item.data(this.params).then((res) => {
            let data = null;
            if (res.code == 1) {
              if(item.chart =='circle' && res.data.list.length>0){
                data = getPieOption(res.data.list, true)
              }else{
                
                
                if(item.seat ==1){
                  data = res.data
                  // console.log('zhichuData',zhichuData)
                  // console.log('shouruData',shouruData)
                  // console.log('fuzhuData',fuzhuData)
                  //   let add ={name: '辅助',type: 'bar',stack: 'stack',itemStyle: {barBorderColor: 'rgba(0,0,0,0)', color: 'rgba(0,0,0,0)'},data: num(fuzhuData)}
                  //   let shou = {...newdata[0],stack: 'stack',label: {show: true, position: 'top'},data: shouruData}
                  //   let zhi = {...newdata[1],stack: 'stack',label: {show: true, position: 'bottom'},data: zhichuData}
                  //   seriesdata =[add,shou,zhi]
                  //   data = {...res.data,series:seriesdata}
                  //  console.log('seriesdata',seriesdata)
                 

                  // data = {
                  //     legendData: ["流入", "流出"],
                  //     xAxisData: ["2020年第一季度", "2020年第二季度", "2020年第三季度","3333"],
                  //     yAxis:{type: "value", name: "金额（元）"},
                  //     series: [
                  //       {
                  //           name: '辅助',
                  //           type: 'bar',
                  //           stack: '收',
                  //           itemStyle: {
                  //               barBorderColor: 'rgba(0,0,0,0)',
                  //               color: 'rgba(0,0,0,0)'
                  //           },
                  //           data: [0, '-','-',2000]
                  //       },
                  //       {
                  //           name: '流入',
                  //           type: 'bar',
                  //           stack: '收',
                  //           label: {
                  //               show: true,
                  //               position: 'top'
                  //           },
                  //           data:[3000, '-', '-', 8000]//[15000, 0, 11000, 25000]  //
                  //       },
                  //       {
                  //           name: '流出',
                  //           type: 'bar',
                  //           stack: '支',
                  //           label: {
                  //               show: true,
                  //               position: 'bottom'
                  //           },
                  //           data: ['-', '-', -1000, '-']//[12000, 0, 15000, 16000]
                  //       }
                  //     ]
                  //   }
                }else{
                  data = res.data
                }

                

              }

            }
            let subdata = [{
              name:item.url,
              data,
              nameCn:item.name,
              seat:item.seat
            }]
            let list = this.originData.concat(subdata)
            this.originData = list.sort((x,y)=> x.seat - y.seat)
            if(this.originData.length ==6){
              this.loading = false
            }
            // console.log('originData',this.originData)
          })
        })

      }
    }
}
</script>
<style lang="less" scoped>
  /deep/ .ant-card-head-title {
    padding: 0;
  }

  /deep/ .ant-card-head {
    min-height: 32px;
  }

  /deep/ .ant-card-extra {
    padding: 0;
  }

  
.ant-col{
    box-sizing:border-box
}
 

  .box-content {
    color: var(--cardTitbg);
    height: 94%;
    overflow: hidden;
    // background: rgba(255, 255, 255, 0.1);
    // border: 1px solid rgba(255, 255, 255, 0.3);
  }
/deep/ .slick-slide {
  text-align: center;
  height: 160px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}

/deep/  .slick-slide h3 {
  color: #fff;
}


  .ant-select-selection {
    background-color: transparent !important;
    border: none !important;
  }

// 
  body::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
  body {
    scrollbar-width: none;
  }
  body {
  -ms-overflow-style:none;
}

  
</style>