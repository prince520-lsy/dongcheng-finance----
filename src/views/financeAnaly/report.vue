<!-- 财务分析>历年报表 -->
<template>
  <div :style="{'height':tableheight+'px'}" class=" mid-bg">
    <a-spin :spinning="loading">
    <div class="flex justify-between">
      <div class="tree-box-left flex-grow-0 line-r" :style="{'height':tableheight+'px'}">
         <a-tree
              v-if="levelData"
              checkable
              :tree-data="levelData"
              class="right-tree"
              :expandedKeys.sync="defaultLevelIds"
              @check="onCheckLeve"
            >
          <template slot="custom" slot-scope="item" >
            <p class="tree-title" :title="item.name">{{ item.name }}</p>
          </template>
        </a-tree>
      </div>
      <div class="flex-grow-1" v-if="data" >
      <a-table :columns="columns" :data-source="data" :pagination="false"  :defaultExpandedRowKeys="defaultTableIds" :scroll="{  y: tableheight-163 }"   :bordered="theme!='dark'"></a-table>
        
      </div>
      <div class="tree-box flex-grow-0 line-l" :style="{'height':tableheight+'px'}">
        <!-- <div class="tit">会计期间</div> -->
        <a-tree
          v-if="timeData"
          checkable
          :tree-data="timeData"
          class="right-tree"
          :default-expanded-keys="defaultTimeIds"
          @check="onCheckTime"
        >
          <template slot="custom" slot-scope="item" >
            <p class="tree-title" :title="item.name">{{ item.name }}</p>
          </template>
        </a-tree>
      </div>
    </div>
    </a-spin>
  </div>
</template>
<script>

import {mapState} from 'vuex'
import ColumnEcharts from '@/components/echarts/ColumnEcharts.vue'
import echartWrap from '@/components/EchartWrap/Index.vue'
import { allStatements, getFinancialAnalysisLevel,getFinancialAnalysisTime } from '@/api/finance';
/**
 * 数组转树形结构
 * @param list 源数组
 * @param tree 树
 * @param parentId 父ID
 * @param type 类型，树选择or表格
 */
const listToTree = (list, tree, pid,type) => {
    list.forEach(item => {
        if (item.pid === pid) {
          if(type&&type =='table'){
            var child = {
                ...item,
                key:item.id,
                children: []
            }
            listToTree(list, child.children, item.id,type)
          }else{
            var child = {
                title: item.name,
                name:item.name,
                key:item.id, //item.name +'-'+ item.id   + Math.random()*100,
                dataIndex:'value'+item.name,
                scopedSlots: {title: 'custom'},
                children: [],
            }
            listToTree(list, child.children, item.id)
          }
            if (child.children.length === 0) {
                delete child.children
              
            }
            tree.push(child)
        }
    })
}
/**
 * 数组取id
 * @param Original 源数组
 * @param data id数组
 * @param curids 新数组
 * @param type 类型
 */
const listToIds = (data,Original,curids,type) =>{
  data.map(item =>{
    // let id = item.split('-')[1]
    let list = Original.filter(a => a.id == item)
    if(type == 'level'){curids.push(list[0].id)}
    if(type == 'time'){curids.push(list[0].value)}
  })
}
export default {
    name: 'debt',
    components: {
      ColumnEcharts,
      echartWrap
    },
    data() {
      return {
        tableheight:0,
        params: { // 全局筛选入参
          search: {
            level_id: [],
            date_id: [],
          },
          type: 1,
        },
        timeData:null, // 时间树结构数据
        timeOriginal:[], // 时间原始数据
        levelData:[],
        levelOriginal:[],
        data:null, //表格内容数据
        columns:[], //表格头
        loading:false,
        headerOne:{title:'年度',children:[{title:'年-季',children:[{title:'历年报表',dataIndex:'name',key:'name'}]}]},
        checked:false,
        defaultTimeIds:[], //默认展开时间的id
        defaultLevelIds:[], //默认展开分类的id
        defaultTableIds:[], //默认展开表格的id
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
    computed: {
      ...mapState({
        theme:state=>state.app.theme
      }),
    },
    mounted() {
      this.loadData()
      // this.$eventBus.$off('changGlobalParms')
      // this.$eventBus.$on('changGlobalParms',(e)=>{
      //   console.log('全局参数改变',e)
      // })
    },
    methods: {
      getHeight(){
      let height = window.innerHeight;
      this.tableheight = height - 120
    },
      loadData() {
        // 财务分析分类
        getFinancialAnalysisLevel({type:-1}).then((res) => {
          if(res.code ==1){
            this.levelOriginal = res.data.list
            let treeData1 = []
            listToTree( res.data.list,treeData1,0)
            this.levelData = treeData1
            console.log(treeData1)

            // 取出所有ID,展开所有的节点 
            let ids = []
            res.data.list.map(item=>{
              ids.push(item.id)
            })
            this.defaultLevelIds = ids.slice(0,12)
          }
        })
        // 财务分析时间
        getFinancialAnalysisTime({type:-1}).then((res) => {
          if(res.code ==1){
            this.timeOriginal = res.data.list
            let treeData1 = []
            listToTree( res.data.list,treeData1,0)
            this.timeData = treeData1
            this.columns = [...this.timeData]
            this.columns.unshift(this.headerOne)

            // 取出所有ID,展开所有的节点 
            let ids = []
            let values = []
            res.data.list.map(item=>{
              ids.push(item.id)
              values.push(item.value)
            })
            this.defaultTimeIds = ids
            this.params.search.date_id = values
            this.dataList()
          }
        })
      },
      // 数据
      dataList(){
        this.loading = true
        let params = {...this.params,type:this.checked?1:2}
        allStatements(params).then((res) => {
          if(res.code ==1){
            this.echartData = res.data.chart
            
            let treeData1 = []
            listToTree( res.data.table.list,treeData1,0,'table')
            this.data = treeData1
            // 取出所有ID,展开所有的节点 
            let ids = []
            res.data.table.list.map(item=>{
              ids.push(item.id)
            })
            this.defaultTableIds = ids.slice(0,10)
          }
        })
        let that = this
        setTimeout(()=>{
          that.loading = false
        },800)
      },
      // 类别选择
      onCheckLeve(checkedKeys, info) {
        console.log('onCheckLeve', checkedKeys, info);
        let cur = []
        listToIds(checkedKeys,this.levelOriginal,cur,'level')
        this.params.search.level_id = cur
        console.log('类别选择',cur)
        this.dataList()
      },
      // 时间选择
      onCheckTime(checkedKeys, info) {
        console.log('onCheckTime', checkedKeys, info);
        if(checkedKeys.length ==0){ // 未选中时间节点时
          this.params.search.date_id = []

          let treeData1 = []
          listToTree( this.timeOriginal,treeData1,0)
          this.columns = treeData1
          this.columns.unshift(this.headerOne)
        }else{
          let cur = []
          listToIds(checkedKeys,this.timeOriginal,cur,'time')
          this.params.search.date_id = cur

          // 取出选中节点原始数据
          let list = []
          checkedKeys.map(item=>{
            this.timeOriginal.map(a=>{
              if(a.id == item){
                list.push(a)
                if(a.pid != 0){ // 有父级时
                  let father = this.timeOriginal.filter(b => b.id == a.pid)
                  if(father[0].pid !=0){
                    let ff = this.timeOriginal.filter(b => b.id == father[0].pid)
                    list.push(ff[0])
                  }
                  list.push(father[0])
                }
              }
            })
          })
          
          list = list.flat(Infinity)
          let obj = {};
          list = list.reduce((current,next) => {
              obj[next.id] ? "" : obj[next.id] = true && current.push(next);
              return current;
          },[]) //去重
          console.log(list)

          //选中的节点转换成树结构
          let treeData1 = []
          listToTree( list,treeData1,0)
          this.columns = treeData1
          this.columns.unshift(this.headerOne)
        }
        this.dataList()

      },
       handleNodeClick(data) {
        console.log(data);
      },
      changMode(e){
        this.checked = e
        this.echartData = []
        this.dataList()
      }
    }
}
</script>
<style lang="less" scoped>
@import './finance.less';

</style>