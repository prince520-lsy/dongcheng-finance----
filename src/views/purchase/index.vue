<!-- 采购 -->
<template>
  <div>
    <a-spin :spinning="loading">
        <a-row :gutter="[16,16]" type="flex">
      <template v-for="(item,index) in cols" ::key="index">
          <a-col :xs="24" :sm="24" :md="item.col">
              <a-card :bodyStyle="cardStyle" :title="null">
                <echart-wrap :isParentH='true'>
                  <star-title slot="title" :title="item.nameCn" v-if="item.selectType" :selectList="titSelect" :type="item.selectType" @change="onChange"></star-title>
                  <star-title slot="title" :title="item.nameCn" v-else></star-title>
                  <template v-if="item.chart =='circle'">
                    <CircleEcharts :piedatalist="item.data" />
                  </template>
                  <template v-else-if="item.chart =='bar'">
                    <ColumnEcharts :bardatalist="item.data" />
                  </template>
                  <template v-else-if="item.chart =='table'">
                    <TableTop :tableList="item.data"  :isLoop='item.data.list.length>5'/>
                  </template>
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
  import starTitle from '../components/star-title.vue'
  import PercentMax from '../components/PercentMax.vue'
  import TableTop from '../components/TableTop.vue'
  import { getPieOption } from '@/components/echarts/options.js'
  import {
    supplierAnalysis,
    purchaseComplete,
    purchaseAnalysis,
    supplierTop,
    collectionAnalysis,
    collectionPercent,
    purchaseCategory,
    purchasePriceNum,
    categoryPriceAnalysis,
    categoryMaterialSupplyPeriod,
    categoryPercent,
    categoryPurchasePercent,
    categoryPrice,
    categoryMoneyCompare,
    categoryPurchaseTop,
    categoryMaterialAnalysis
  } from '@/api/stock'
export default {
    name: 'purchase',
    components: {
      starTitle,
      echartWrap,
      CircleEcharts,
      ColumnEcharts,
      PercentMax,
      TableTop,
    },
    data() {
      return {
        cardStyle:{
　　　　　　height:'',
           padding:0
　　　　},
        params:{ search: {department_id: [],supplier_id: [],category_id: [],},date: [],date_key:0,}, //全局筛选入参
        titSelect: [{ // 标题右侧筛选
          id: '1',
          name: '采购金额'
        }, {
          id: '2',
          name: '采购数量'
        }],
        
        loading: false,
        cols: [],
        originData:[],
        bodyData:[]
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
        if(e && e.search || e.startDate){
          this.params = {
            search: {
              department_id: e.search.department_id,
              supplier_id: e.search.supplier_id,
              category_id: e.search.category_id
            },
            sign:e.sign==1?2:e.sign==5?1:0, // 转换下，部门1，供应商5
            date_key:e.date_key,
            date:e.startDate?[e.startDate,e.endDate]:[]
          }
          this.loadData()
        }
      })
    },
    methods: {
      getHeight(){
      let height = window.innerHeight  -32 -  118;
      this.cardStyle.height = height/3 +'px'
    },
      calcCols() {
        this.loading = true
        if (this.timer != null) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => { // 多次触发后在5秒后执行最后一次触发
          let cols = []
          const list = this.originData//.filter(a => a.data)
          const bigs = list.filter(a => a.size == 'big')
          const small = list.filter(a => a.size == 'small')
          const smallLen = small.length

          function changColSmall(arr) {
            let baseYs = 3
            const ys3 = arr.length % 3
            const ys2 = arr.length % 4
            if (ys3 < ys2) {
              baseYs = 3
            }
            if (arr.length % baseYs == 0) {
              arr.forEach(a => {
                a.col = 24 / baseYs
              })
              console.log(0)
            } else if (arr.length % baseYs != 0) {
              const ys = arr.length % baseYs
              const col = 24 / ys
              arr.forEach(a => {
                a.col = 24 / baseYs
              })

              for (let i = arr.length - ys; i < arr.length; i++) {
                arr[i].col = col
                if (ys == 1 && arr.length > 1||smallLen>1) {
                  arr[i].kgb = 30
                }
              }
            }
            return arr
          }

          if (bigs.length == 0) { // 如果没有大图
            cols = changColSmall(small)
          } else {
            const blen = bigs.length
            const slen = small.length
            if (blen == 1) {
              if (slen >= 4) {
                const a = small.splice(0, 1)[0]
                a.isParentH = true
                a.col = 7
                a.style = {
                  height: '50%'
                }
                const b = small.splice(0, 1)[0]
                b.isParentH = true
                b.col = 7
                b.style = {
                  marginTop: '16PX',
                  height: 'calc(50% - 16px)'
                }
                cols[0] = {
                  col: 7,
                  childer: [a, b]
                }
                cols[1] = bigs.splice(0, 1)[0]
                cols[1].col = 10
                cols[1].kgb = 100
                const c = small.splice(0, 1)[0]
                c.isParentH = true
                c.style = {
                  height: '50%'
                }
                const d = small.splice(0, 1)[0]
                d.isParentH = true

                d.style = {
                  marginTop: '16PX',
                  height: 'calc(50% - 16px)'
                }
                cols[2] = {
                  col: 7,
                  childer: [c, d]
                }
                cols = cols.concat(changColSmall(small))
              } else {
                const h = 100 / slen
                cols[0] = bigs.splice(0, 1)[0]
                cols[0].col = 12
                cols[0].kgb = 100
                cols[1] = {
                  col: 12,
                  childer: []
                }
                small.forEach((a, i) => {
                  if (i == 0) {
                    a.style = { height: `${h}%` }
                  } else {
                    a.style = {
                      marginTop: '16PX',
                      height: `calc(${h}% - 16px)`
                    }
                  }
                  a.isParentH = true
                  cols[1].childer.push(a)
                })
              }
            } else if (blen == 2) {
              bigs.forEach(a => {
                a.col = 12
                a.kgb = 60
              })
              cols = [...bigs, ...changColSmall(small)]
            }
          }
          this.$nextTick(() => {
            this.cols = cols
          })
          this.loading = false
          console.log(cols)
       }, 1000)
      },
      loadData() {
        this.cols = []
        this.originData = []

        // 默认图表
         if(this.params.search.category_id.length ==0){

          this.bodyData = [
            {url:'supplierTopList',name:'供应商排行',data:supplierTop,chart:'table',seat:0},
            {url:'collectionAnalysisList',name:'应付账款分析',data:collectionAnalysis,chart:'bar',seat:1},
            {url:'purchaseCompleteList',name:'采购完成情况',data:purchaseComplete,chart:'table',seat:2},
            {url:'collectionPercentList',name:'应付账款账龄情况',data:collectionPercent,chart:'circle',seat:3},
            {url:'purchaseCategoryList',name:'采购类别支出占比',data:purchaseCategory,chart:'circle',seat:4}, //
            {url:'supplierAnalysisList',name:'供应商采购分析(供应商)',data:supplierAnalysis,chart:'bar',seat:5,selectType: 1},
            {url:'supplierAnalysisListTime',name:'供应商采购分析(时间)',data:supplierAnalysis,chart:'bar',seat:6,selectType: 4},
            {url:'purchasePriceNumList',name:'采购金额变动',data:purchasePriceNum,chart:'bar',seat:7},
            {url:'purchaseAnalysisList',name:'采购完成分析',data:purchaseAnalysis,chart:'bar',seat:8},
            ]
          
         }else{

          this.bodyData = [
          {url:'categoryPurchaseTopList',name:'各类别采购总额排行',data:categoryPurchaseTop,chart:'table',seat:0},
          {url:'categoryPercentList',name:'类别占比',data:categoryPercent,chart:'circle',seat:1},
          // {url:'categoryMaterialSupplyPeriodList',name:'供货周期表',data:categoryMaterialSupplyPeriod,chart:'table',seat:2},
          {url:'categoryMaterialAnalysisListTime',name:'材料采购分析(时间)',data:categoryMaterialAnalysis,chart:'bar',seat:3,selectType: 3},
          {url:'categoryMaterialAnalysisList',name:'材料采购分析(类别)',data:categoryMaterialAnalysis,chart:'bar',seat:4,selectType: 2}, //
          {url:'categoryPriceAnalysisList',name:'单价因数分析',data:categoryPriceAnalysis,chart:'bar',seat:5},
          {url:'categoryMoneyCompareList',name:'采购预算执行分析',data:categoryMoneyCompare,chart:'bar',seat:6},
          {url:'categoryPriceList',name:'平均单价变化',data:categoryPrice,chart:'bar',seat:7}, 
          {url:'categoryPurchasePercentList',name:'类别采购完成率',data:categoryPurchasePercent,chart:'bar',seat:8},
          ]

         }
         
        this.bodyData.map((item,index)=>{
          // 供应商采购分析 入参不一样 //1=供应商，2=时间
          let params = this.params
          if(item.url == 'supplierAnalysisList'){params = {...this.params,change:1}}
          if(item.url == 'supplierAnalysisListTime'){params = {...this.params,change:2}}
          // 材料采购分析 入参不一样 1=类别，2=时间
          if(item.url == 'categoryMaterialAnalysisList'){params = {...this.params,show:'1'}}
          if(item.url == 'categoryMaterialAnalysisListTime'){params = {...this.params,show:'2'}}


          item.data(params).then((res) => {
              let data = null;
              let chart = item.chart;
            if (res.code == 1) {

              if(item.chart =='circle'){
                if(item.url =='purchaseCategoryList' && res.data.header){ //采购类别支出占比 有header时是table，无header时是饼图
                  data = res.data
                  chart = 'table'
                }else{
                  data = getPieOption(res.data.list, true)
                }
              }else{
                data = res.data
              }
            }
            let subdata = [{
              name:item.url,
              data,
              nameCn:item.name,
              chart:chart,
              selectType:item.selectType?item.selectType:null,
              seat:item.seat,
              size: 'small',
            }]
            let list =  this.originData.concat(subdata)
            this.originData =  list.sort((x,y)=> x.seat - y.seat)
            this.calcCols()
          })
        })

      },
      
      // 选择事件回调
      onChange(e, type) {
        const that = this
        const t = parseInt(type)
        switch (t) {
          case 1:
            that.filterData('supplierAnalysisList',e.key)
            break
          case 2:
            that.filterData('categoryMaterialAnalysisList',e.key)
            break
          case 3:
            that.filterData('categoryMaterialAnalysisListTime',e.key)
            break
          case 4:
            that.filterData('supplierAnalysisListTime',e.key)
            break

          default:
            break
        }
      },
      // 标题右边筛选
      filterData(url,type){
        let i = this.originData.findIndex(a => a.name == url)
        let bodyi = this.bodyData.findIndex(a => a.url == url)

        // 供应商采购分析 入参不一样 //1=供应商，2=时间
        let params = {...this.params,type:parseInt(type)}
        if(this.bodyData[bodyi].url == 'supplierAnalysisList'){params = {...params,change:1}}
        if(this.bodyData[bodyi].url == 'supplierAnalysisListTime'){params = {...params,change:2}}
        // 材料采购分析 入参不一样 1=类别，2=时间
        if(this.bodyData[bodyi].url == 'categoryMaterialAnalysisList'){params = {...params,show:'1'}}
        if(this.bodyData[bodyi].url == 'categoryMaterialAnalysisListTime'){params = {...params,show:'2'}}

        this.loading = true
        this.bodyData[bodyi].data(params).then((res) => {
          
            let data = null;
            if (res.code == 1) {
              if(this.bodyData[bodyi].chart =='circle'){
                if(item.url =='purchaseCategoryList' && res.data.header){ //采购类别支出占比 有header时是table，无header时是饼图
                  data = res.data
                }else{
                  data = getPieOption(res.data.list, true)
                }
              }else{
                data = res.data
              }
            }
            this.originData[i].data = data
            let that = this
            setTimeout(()=>{
              that.loading = false
            },500)
          })
      },

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