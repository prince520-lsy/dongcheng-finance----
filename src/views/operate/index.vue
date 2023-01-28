<!-- 经营 -->
<template>
  <div>
    <a-row :gutter="[16,16]" type="flex" v-if="originData.length>0">
      <template v-for="item in originData">
        <a-col :xs="24" :sm="24" :md="item.col">
          <a-card :bodyStyle="cardStyle" :title="null">
            <echart-wrap :isParentH='true'>
                <star-title slot="title" :title="item.nameCn" v-if="item.selectType" :selectList="subSelectList" :type="item.selectType" @change="onChange"></star-title>
                <star-title slot="title" :title="item.nameCn" v-else></star-title>
                <template v-if="item.chart =='table'">
                  <TableTop :tableList="item.data"  :isLoop='item.data.list.length>5'/>
                </template>
                <template v-else-if="item.chart =='circle'">
                  <CircleEcharts :piedatalist="item.data" />
                </template>
                <template v-else-if="item.chart =='bar' ">
                  <ColumnEcharts :bardatalist="item.data" />
              </template>
            </echart-wrap>
          </a-card>
        </a-col>
      </template>
      <!-- <a-col :xs="24" :sm="24" :md="24">
        <a-card :bodyStyle="cardStyle" :title="null">
          <echart-wrap  :isParentH='true'>
            <star-title slot="title" title="费用金额情况"></star-title>
            <CircleEcharts v-if="titleType==0" />
            <ColumnEcharts v-else />
          </echart-wrap>
        </a-card>
      </a-col> -->
    </a-row>
  </div>
</template>
<script>
  import echartWrap from '@/components/EchartWrap/Index.vue'
  import ColumnEcharts from '@/components/echarts/ColumnEcharts.vue'
  import CircleEcharts from '@/components/echarts/CircleEcharts.vue'
  import starTitle from '../components/star-title.vue'
  import TableTop from '../components/TableTop.vue'
  import { getPieOption } from '@/components/echarts/options.js'
  import {
  moneyAnalysis,
  taxesAnalysis,
  taxesPercent,
  taxesExpensePercent,
  taxesMoneyAnalysis,
  taxesBudgetMoneyAnalysis
} from '@/api/operate'
export default {
    name: 'purchase',
    components: {
      starTitle,
      echartWrap,
      CircleEcharts,
      ColumnEcharts,
      TableTop
    },
    data() {
      return {
        params: { // 全局筛选入参
          taxation_id:[],
          date: []
        },
        subSelectList: [{ // 筛选
          id: '1',
          name: '管理费用'
        }, {
          id: '2',
          name: '销售费用'
        }, {
          id: '3',
          name: '财务费用'
        },{
          id: '4',
          name: '制造费用'
        }], // 1=管理费用,2=销售费用,3=财务费用,4=制造费用
        titleType:1, //标题右边筛选，后期可去
        cardStyle:{
　　　　　　height:'',
           padding:0
　　　　},
       originData:[],
       bodyData:[
        {url:'moneyAnalysisList',name:'收入费用情况',data:moneyAnalysis,chart:'bar',seat:0,selectType:1},
        {url:'taxesPercentList',name:'各类税占比',data:taxesPercent,chart:'circle',seat:1},
        {url:'taxesAnalysisList',name:'税负率',data:taxesAnalysis,chart:'bar',seat:2,col:24},
        ] //,col:24
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
            // taxation_id:e.search.taxation_id,
            date:e.startDate?[e.startDate,e.endDate]:[],
            date_key:e.date_key,
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
      loadData(){
          this.bodyData.map((item,index)=>{
            item.data(this.params).then((res) => {
                let data = null;
              if (res.code == 1) {
                if(item.chart =='circle'){
                  data = getPieOption(res.data.list, true)
                }else{
                  data = res.data
                }
              }
              console.log('loadDataloadDataloadData')
                let subdata = [{
                  name:item.url,
                  data,
                  nameCn:item.name,
                  chart:item.chart,
                  selectType:item.selectType?item.selectType:null,
                  col:item.col?item.col:12,
                  seat:item.seat
                  // kgb:item.kgb?item.kgb:60
                }]
                let list = this.originData.concat(subdata)
                this.originData = list.sort((x,y)=> x.seat - y.seat)
            })
        })

      },
      // 选择事件回调
      onChange(e, type) {
        this.titleType = parseInt(e.key)
        console.log(e, type)
        console.log('-----------标题右侧选择事件-----------')
        const t = parseInt(type)
        const that = this
        switch (t) {
          case 1:
            that.filterData('moneyAnalysisList',e.key)
            break

          default:
            break
        }
      },
      // 标题右边筛选
      filterData(url,type){
        let params = {...this.params,type:parseInt(type)}
        let i = this.originData.findIndex(a => a.name == url)
        let bodyi = this.bodyData.findIndex(a => a.url == url)

        this.bodyData[bodyi].data(params).then((res) => {
            if (res.code == 1) {
              let data = null;
              if(this.bodyData[bodyi].chart =='circle'){
                data = getPieOption(res.data.list, true)
              }else{
                data = res.data
              }
              this.originData[i].data = data
            }
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