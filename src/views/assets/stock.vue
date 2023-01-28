<!-- 资产 > 存货 -->
<template>
  <div>
    <a-spin :spinning="loading">
      <a-row :gutter="[16,16]" type="flex" v-if="cols.length>0">
        <template v-for="item in cols">
          <a-col :xs="24" :sm="24" :md="item.col">
            <a-card :bodyStyle="cardStyle" :title="null">
              <echart-wrap  :isParentH='true'>
                <star-title slot="title" :title="item.nameCn" v-if="item.selectType" :selectList="titSelect" :type="item.selectType" @change="onChange"></star-title>
                <star-title slot="title" :title="item.nameCn" v-else></star-title>
                <template v-if="item.chart =='table'">
                  <TableTop :tableList="item.data" :isHighlight="true" :isLoop="item.data.list.length > 5"/>
                </template>
                <template v-else-if="item.chart =='circle'">
                  <CircleEcharts :piedatalist="item.data" />
                </template>
                <template v-else-if="item.chart =='bar' ">
                  <ColumnEcharts :bardatalist="item.data" />
                </template>
                <template v-else-if="item.chart =='cand'">
                  <CandlestickEcharts :canddatalist="item.data" />
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
  import MapEcharts from '@/components/echarts/MapEcharts.vue'
  import ChinaEcharts from '@/components/echarts/ChinaEcharts.vue'
  import CandlestickEcharts from '@/components/echarts/CandlestickEcharts.vue'
  import starTitle from '../components/star-title.vue'
  import PercentMax from '../components/PercentMax.vue'
  import TableTop from '../components/TableTop.vue'
  import OrderComplete from '../components/OrderComplete.vue'
  import { getPieOption } from '@/components/echarts/options.js'
  import {
  stockCategoryAnalysis,
  stockCategoryMoneyPercent,
  stockMoneyAnalysis,
  stockMoneyChange,
  stockAnalysis,
  stockReminder,
  stockMoneyPercent
} from '@/api/assets'
  export default {
    name: 'stock',
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
        // params: { // 全局筛选入参
        //   search:{
        //     category_id: [], // 选择的类别id数组
        //     warehouse_id:[], // 选择的仓库id数组
        //   },
        //   date: [],
        //   sign:0,
        //   date_key:0,
        // },
        params:{ search: {department_id: [],product_id: []},date: []}, //全局筛选入参
        loading: false,
        originData:[],
        cols:[],
        cardStyle:{
　　　　　　height:'',
           padding:0
　　　　},
      titSelect: [{ // 标题右侧筛选
          id: '1',
          name: ' 金额'
        }, {
          id: '2',
          name: '数量'
        }],
      bodyData:[
        {url:'capitalReminderList',name:'安全库位示警',data:stockReminder,chart:'table',seat:0},
        {url:'capitalMoneyPercentList',name:'存货类别情况',data:stockCategoryAnalysis,chart:'bar',seat:1,selectType:1},
        {url:'capitalChangeAnalysisList',name:'存货类别金额占比',data:stockCategoryMoneyPercent,seat:2,chart:'circle'},
        {url:'capitalMoneyAnalysisList',name:'存货价值金额趋势',data:stockMoneyAnalysis,seat:3,chart:'bar'},
        // {url:'capitalOutList',name:'库存价值库龄占比',data:stockMoneyPercent,seat:4,chart:'circle'},
        {url:'capitalInList',name:'存货资金变动趋势',data:stockMoneyChange,seat:5,chart:'cand'},
        {url:'capitalOutList',name:'存货情况',data:stockAnalysis,seat:6,chart:'bar'},] //,col:24
      }
    },
    created() {
      this.$store.dispatch('getOptions',this.$route.path)
      window.addEventListener('resize', this.getHeight);
      this.getHeight()
    },
    destroyed() {
      window.removeEventListener('resize', this.getHeight)
    },
    mounted() {
      this.loadData()
      this.$eventBus.$off('changGlobalParms')
      this.$eventBus.$on('changGlobalParms',(e)=>{
        console.log('全局参数改变',e)
        if (e && e.search || e.startDate) {
          this.params = {
            search: {
              category_id:e.search.category_id,
              warehouse_id:e.search.warehouse_id
            },
            // sign:e.sign,
            date:e.startDate?[e.startDate,e.endDate]:[],
            date_key:e.date_key,
          }
          this.loadData()
        }
      })
    },
    methods: {
      getHeight() {
        let height = window.innerHeight - 16 - 118;
        this.cardStyle.height = height/2 +'px'
      },
      
      calcCols() {
        this.loading = true
        if (this.timer != null) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => { // 多次触发后在5秒后执行最后一次触发
          let cols = []
          const list = this.originData.sort((x,y)=> x.seat - y.seat)//.filter(a => a.data)
          const bigs = list.filter(a => a.size == 'big')
          const small = list.filter(a => a.size == 'small')
          const smallLen = small.length

          function changColSmall(arr) {
            let baseYs = 2
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
              }
            }
            return arr
          }

          cols = changColSmall(small)
          
          this.$nextTick(() => {
            this.cols = cols
          })
          this.loading = false
          console.log(cols)
       }, 1000)
      },
      loadData() {
        this.originData =[]
          this.bodyData.map((item,index)=>{
        console.log('params===',this.params)
            item.data(this.params).then((res) => {
                let data = null;
              if (res.code == 1) {
                if (item.chart =='circle') {
                  data = getPieOption(res.data.list, true)
                } else {
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
                seat:item.seat,
                // kgb:item.kgb?item.kgb:60
              }]
              this.originData = this.originData.concat(subdata)
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
            that.filterData('capitalMoneyPercentList',e.key)
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
      }
    }
  }
</script>
<style lang="less" scoped>
.box-content {
    overflow: hidden;
  }
</style>