<!-- 指标分析 -->
<template>
  <div>
    <a-spin :spinning="loading">
      <div class="switch-style"><a-switch @change="changMode" checked-children="已执行新收入准则" :checked="checked" un-checked-children="未执行新收入准则" /></div>
      <a-row :gutter="[16,16]" type="flex">
        <template v-for="(item,index) in echartData">
          <a-col :xs="24" :sm="24" :md="item.col" :key="index">
            <a-card :bodyStyle="cardStyle" :title="null">
              <echart-wrap  :isParentH='true'>
                <star-title slot="title" :title="item.name"></star-title>
                <ColumnEcharts :bardatalist="item.data" />
              </echart-wrap>
            </a-card>
          </a-col>
          </template>
      </a-row>
    </a-spin>
  </div>
</template>
<script>
  import echartWrap from '@/components/EchartWrap/Index.vue'
  import ColumnEcharts from '@/components/echarts/ColumnEcharts.vue'
  import CircleEcharts from '@/components/echarts/CircleEcharts.vue'
  import MapEcharts from '@/components/echarts/MapEcharts.vue'
  import ChinaEcharts from '@/components/echarts/ChinaEcharts.vue'
  import starTitle from '../components/star-title.vue'
  import PercentMax from '../components/PercentMax.vue'
  import TableTop from '../components/TableTop.vue'
  import OrderComplete from '../components/OrderComplete.vue'
  import { getPieOption } from '@/components/echarts/options.js'
import { indicatorAnalysis } from '@/api/finance'

   let echartData = {
        legendData:['支出', '收入'],
        xAxisData:['7月21日','7月22日','7月23日'],
        yAxis:{type: 'value'},
        series: [
          {
              name: '辅助',
              type: 'bar',
              stack: '收',
              itemStyle: {
                  barBorderColor: 'rgba(0,0,0,0)',
                  color: 'rgba(0,0,0,0)'
              },
              data: [0, 860, 1005]
          },
          {
              name: '收入',
              type: 'bar',
              stack: '收',
              label: {
                  show: true,
                  position: 'top'
              },
              data: [900,345, 100]
          },
          {
              name: '辅助',
              type: 'bar',
              stack: '支',
              itemStyle: {
                  barBorderColor: 'rgba(0,0,0,0)',
                  color: 'rgba(0,0,0,0)'
              },
              data: [860,1005, 605]
          },
          {
              name: '支出',
              type: 'bar',
              stack: '支',
              label: {
                  show: true,
                  position: 'bottom'
              },
              data: [40, 200,500]
          }
        ]
      }

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
      OrderComplete
    },
    data() {
      return {
        params: { // 全局筛选入参
          // search: {
          //   level_id: [],
          //   date_id: [],
          // },
          date:[],
          date_key:0,
        },
        cardStyle:{
　　　　　　height:'',
           padding:0
　　　　},
        echartData:[],
        checked:false,
        loading:false,
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
        this.params = {
            date:e.startDate?[e.startDate,e.endDate]:[],
            date_key:e.date_key,
          }
        this.loadData()
      })
      
      
    },
    methods: {
      getHeight(){
        let height = window.innerHeight - 50 - 16 - 118;
        this.cardStyle.height = height/2 +'px'
      },
      loadData() {
        this.echartData = []
        this.loading = true
        let list = [
          {name:'偿债能力分析',seat:1,col:12},
          {name:'营运能力分析',seat:2,col:12},
          {name:'获利能力分析',seat:3},
          {name:'现金流量分析',seat:4},
          {name:'发展能力分析',seat:5}
        ]
        
        list.map((item,index)=>{
          let params = {
            is_executed:this.checked?1:2,
            type:item.seat,
            ...this.params
          }
          indicatorAnalysis(params).then(res=>{
            let subdata = [{
                  name:item.name,
                  data:res.data,
                  col:item.col?item.col:8,
                  seat:item.seat
                }]
            let listtwo = this.echartData.concat(subdata)
            this.echartData = listtwo.sort((x,y)=> x.seat - y.seat)
          })
        })
        
        let that = this
        setTimeout(()=>{
          that.loading = false
        },800)
        
      },
      changMode(e){
        this.checked = e
        this.echartData = []
        this.loadData()
      }

    },
}
</script>
<style lang="less" scoped>
.switch-style{
  height: 50px;
}
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