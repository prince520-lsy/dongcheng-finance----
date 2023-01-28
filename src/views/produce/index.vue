<!-- 生产 -->
<template>
  <div>
    <a-spin :spinning="loading">
      <a-row :gutter="[16,16]" type="flex">
      <template v-for="(item,index) in cols">
          <a-col :xs="24" :sm="24" :md="item.col" :key="index">
              <a-card :bodyStyle="cardStyle" :title="null">
                <echart-wrap :isParentH='true'>
                  <star-title slot="title" :title="item.nameCn" v-if="item.selectType" :selectList="titSelect" :type="item.selectType" @change="onChange"></star-title>
                  <star-title slot="title" :title="item.nameCn" v-else></star-title>
                  <template  v-if="item.chart =='table'">
                    <TableTop :tableList="item.data"  :isLoop='item.data.list.length>5'/>
                  </template>
                  <template v-else-if="item.chart =='order'">
                    <OrderComplete :oneList="item.data" :unitList="unit" :isLoop="true"/>
                  </template>
                  <template  v-else-if="item.chart =='circle'">
                    <CircleEcharts :piedatalist="item.data" />
                  </template>
                  <template v-else-if="item.chart =='bar' ">
                    <ColumnEcharts :bardatalist="item.data" />
                  </template>
                </echart-wrap>
              </a-card>
            </a-col>
          </template>
        </a-row>
        <!-- <a-card :bodyStyle="cardStyle" :title="null" style="margin-top:16px">
           <star-title  title="料工费组成累计情况/年累计"></star-title>
            <a-row :gutter="[16,16]" type="flex" style="height:calc(100% - 60px)" >
                <a-col :xs="24" :sm="24" :md="8" v-for="(item,index) in costMakePercentList" :key="index">
                  <echart-wrap  :isParentH='true'>
                    <CircleEcharts :piedatalist="item" />
                  </echart-wrap>
                </a-col>
            </a-row>
        </a-card> -->
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
  import {
    costAnalysis,
    costPercent,
    priceAnalysis,
    productTop,
    productAnalysis,
    costMakePercent,
    unitProduct
  } from '@/api/produce'
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
        cardStyle:{
　　　　　　height:'',
           padding:0
　　　　},
        params:{ search: {department_id: [],product_id: []},date: []}, //全局筛选入参
        titSelect: [{ // 标题右侧筛选
          id: '1',
          name: ' 金额'
        }, {
          id: '2',
          name: '数量'
        }],
        unit:['元','元','元','元','元','元','%',],
        loading: false,
        cols: [],
        bodyData:[
        {url:'productTopList',name:'产品产量排行',data:productTop,chart:'table',seat:0},
        {url:'costAnalysisList',name:'料工费变化趋势',data:costAnalysis,chart:'bar',seat:1},
        {url:'costPercentList',name:'料工费分别占比',data:costPercent,chart:'circle',seat:2},
        {url:'priceAnalysisList',name:'单位生产成本趋势',data:priceAnalysis,chart:'bar',seat:3},
        {url:'productAnalysisList',name:'产品生产情况',data:productAnalysis,chart:'bar',seat:4,selectType:1},
        // {url:'costMakePercentList',name:'料工费组成累计情况',data:costMakePercent,chart:'circle'},
        {url:'unitProductList',name:'单位生产表',data:unitProduct,chart:'order',seat:5},
        {url:'costMakePercentList',name:'料工费组成累计情况/年累计',data:costMakePercent,chart:'circle',seat:6,type:1},
        {url:'costMakePercentList',name:'料工费组成累计情况/上年同期累计',data:costMakePercent,chart:'circle',seat:7,type:2},
        {url:'costMakePercentList',name:'料工费组成累计情况/月累计',data:costMakePercent,chart:'circle',seat:8,type:3}],
        originData:[],
        costMakePercentList:null,
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
        if(e && e.search || e.startDate){
          this.params = {
            search: {
              department_id:e.search.department_id,
              product_id:e.search.product_id,
            },
            date:e.startDate?[e.startDate,e.endDate]:[],
            date_key:e.date_key,
          }
          this.loadData()
        }
      })
    },
    methods: {
      getHeight(){
      let height = window.innerHeight - 32 - 118;
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
        this.bodyData.map((item,index)=>{
          let par = item.type? {...this.params,type:item.type} :this.params

            item.data(par).then((res) => {
                let data = null;
              if (res.code == 1) {
                if(item.chart =='circle'){
                  data = getPieOption(res.data.list, true)
                }else{
                  data = res.data
                }
              }
                let subdata = [{
                  name:item.url,
                  data,
                  nameCn:item.name,
                  chart:item.chart,
                  selectType:item.selectType?item.selectType:null,
                  col:item.col?item.col:8,
                  size: 'small',
                  seat:item.seat
                  // kgb:item.kgb?item.kgb:60
                }]
                let list =  this.originData.concat(subdata)
                this.originData =  list.sort((x,y)=> x.seat - y.seat)
                this.calcCols()
            })
        })
        // this.costMakePercent()

      },
      // 选择事件回调
      onChange(e, type) {
        const that = this
        const t = parseInt(type)
        switch (t) {
          case 1:
            that.filterData('productAnalysisList',e.key)
            break
          default:
            break
        }
      },
      // 标题右边筛选
      filterData(url,type){
        let params = {...this.params,type}
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
      },
      // costMakePercent() {
      //   let type = [1,2,3]
      //   let list = []
      //   type.map((item,index)=>{
      //     let params = {...this.params,type:item}
      //     costMakePercent(params).then((res) => {
      //       if(res.code ==1){
      //         list.push(getPieOption(res.data.list, true))
      //       }
      //     })
      //   })
      //   this.costMakePercentList = list
      // },
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