<!-- 杜邦分析 -->
<template>
  <div>
    <!-- <img v-if="theme =='dark'" style="max-width:100%" src="../../assets/images/duban1.png"/>
        <img v-else style="max-width:100%" src="../../assets/images/duban2.png"/> -->
    <a-row :gutter="[16,16]" type="flex">
      <a-col :xs="24" :sm="24" :md="18" style="padding-right:40px">
        <img v-if="theme =='dark'" style="max-width:100%" src="../../assets/images/duban1.png"/>
        <img v-else style="max-width:100%" src="../../assets/images/duban2.png"/>
      </a-col>
      <a-col :xs="24" :sm="24" :md="6">
        <a-table :columns="columns" :data-source="list" :pagination="false" :scroll="{  y: 700 }"  :bordered="theme!='dark'"></a-table>
        <!-- <div class="list-box" :style="{'height': `${maxHeight}px`}">
          <div class="flex justify-between list" v-for="(item,index) in list" :key="index">
            <div>{{item.name}}</div>
            <div>{{item.value}}</div>
          </div>
        </div> -->
        
      </a-col>
    </a-row>
  </div>
</template>
<script>
const columns = [
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: '数值',
    dataIndex: 'value',
  },
];

import { USER_INFO, TOGGLE_NAV_THEME } from '@/store/mutation-types'
import {mapState} from 'vuex'
import { financialAnalysis } from '@/api/finance'
export default {
    name: 'purchase',
    components: {
    },
    data() {
      return {
        // params:null, //全局筛选入参
        params:{
          s_time:'', //开始时间
          e_time:'', //结束时间
        }, //全局筛选入参
        list:[
          {name:'净资产收益率',value:'200'}
        ],
        names:['财务费用','管理费用','营业费用','主营业务税金及附加','主营业务成本','非流动资产','流动资产','长期负债流动负债','所得税','其他利润','成本总额','主营业务收入净额','资产总额','负债总额','资产平均总额','主营业务收入净额','主营业务收入净额','净利润','资产负债率','总资产周转率','销售净利率','权益乘数','总资产净利率','净资产收益率',],//
        isdark:false,
        maxHeight:0,
        columns
      }
    },
    computed: {
      ...mapState({
        // 动态主路由
        theme: state => state.app.theme,
      })
    },
    mounted() {
      this.loadData()
      this.$eventBus.$off('changGlobalParms')
      this.$eventBus.$on('changGlobalParms',(e)=>{
        console.log('duPontAnaly全局参数改变',e)
        if(e && e.search || e.startDate){
          this.params = {
            // search: {
            //   department_id:e.search.department_id,
            //   product_id:e.search.product_id,
            // },
            // date:e.startDate?[e.startDate,e.endDate]:[],
            s_time:e.startDate?e.startDate:'',
            e_time:e.endDate?e.endDate:''
            // date_key:e.date_key,
          }
          this.loadData()
        }
      })
    },
    created(){
        this.$store.dispatch('getOptions',this.$route.path)
        window.addEventListener('resize', this.getHeight);
        this.getHeight()
    },
    destroyed(){
      window.removeEventListener('resize', this.getHeight)
    },
    computed: {
      ...mapState({
        theme:state=>state.app.theme
      }),
    },
    methods: {
      getHeight(){
        let height = window.innerHeight - 32 - 118;
        this.maxHeight = height
      },
      loadData() {
        financialAnalysis(this.params).then((res) => {
          if(res.code ==1){
            // let list = []
              // console.log(res.data)
            // this.names.map((item,index)=>{
            //   list.push({name:item,value:res.data[index]})
            // })
            // console.log(list)
            this.list = res.data
          }
        })
      }
    }
    
}
</script>
<style lang="less" scoped>
.list-box{
  overflow-x: hidden;
  overflow-y: scroll;
  padding-right: 20px;
  padding-left: 30px;
  .list{
    font-size: 16px;
    &>div{
      padding: 5px 0;
    }
    color: var(--startit);
  }

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