import storage from 'store'
import { loadLanguageAsync } from '@/locales'
import EventBus from "@/utils/eventBus"
import {getDepartment,getCustomer,getProduct,getRegion} from '@/api/app'
import {getSupplier, getCategory} from '@/api/stock'
import {getWarehouse, getTaxation, getExpense} from '@/api/assets'
const app = {
  state: {
    topSelect:{
      department:[],
      customer:[],
      product:[],
      region:[],
      supplier:[],
      category:[],
      warehouse:[],
      taxation:[],
      expense:[]
    },
    salesList:[],
    defaultType:'region',//默认筛选类型，
    globalParams:{ //全局的请求参数
      startDate:'',
      endDate:'',
      search:{},
      sign:0, // 最后选择的条件标识
      date_key:null, // 时间跨度
    },
    timeSales:false, //时间筛选是否显示
    timeSalesKey:true, //年、季度、月是否显示
  },
  mutations: {
    setTopSelect(state,arg){
      // state.topSelect[arg.type] = arg.list
      let ids = []
      arg.list.map(item=>{
        ids.push(item.id)
      })
      state.topSelect[arg.type] = ids
    },
    setSelect(state,arg){
      console.log(arg)
      if(!arg){
        state.salesList.splice(0)
        return
      }
      let list = [{
          value:arg.value,
          title:arg.title,
          key:arg.value,
          seat:arg.seat,
          children:arg.list
      }]
      let sl = state.salesList.concat(list)
      state.salesList = sl.sort((x,y)=> x.seat - y.seat)
    },
    setGlobalParams(state,arg){
      state.globalParams.search = arg.search
      state.globalParams.startDate= arg.startDate;
      state.globalParams.endDate= arg.endDate;
      state.globalParams.sign = arg.sign;
      state.globalParams.date_key= arg.date_key;
  
      EventBus.$emit('changGlobalParms',state.globalParams)
    },
    setDefaultType(state,path){
      state.defaultType = path
    },
    setSign(state,path){
      state.globalParams.sign = path
    },
    setTimeSelect(state,arg){
      state.timeSales = arg.timeSales
      state.timeSalesKey = arg.timeSalesKey
      console.log('dataKey==',arg)
    },
    setTimeKey(state,type){
      state.globalParams.date_key = type
    }
  },
  actions: {
    getOptions({ commit }, arg){
       
      function handerOption(name, list){
        let temp = list.map(item=>{
         return { 
           title:item.name,
           value:`${name}|${item.id}`,
           key: `${name}|${item.id}`,
           id:item.id
          }
        })
        return temp
      }
      
      let dataUrl = null
      let dataName = null
      commit('setSelect',null)
      commit('setTimeSelect',{timeSales:false,timeSalesKey:false})
      commit('setGlobalParams',{date_key:0})

      if(arg === '/sales'){ //销售
        dataUrl = [getDepartment({type:1}),getProduct(),getCustomer(),getRegion()]
        dataName = [{name:'部门',value:'department',seat:0},{name:'产品',value:'product',seat:1},{name:'客户',value:'customer',seat:2},{name:'区域',value:'region',seat:3}]
        commit('setTimeSelect',{timeSales:true,timeSalesKey:true})
      }
      if(arg === '/purchase'){ // 采购
        dataUrl = [getSupplier(),getDepartment({type:2}),getCategory()]
        dataName = [{name:'供应商',value:'supplier',seat:0},{name:'部门',value:'department',seat:1},{name:'类别',value:'category',seat:2}]
        commit('setTimeSelect',{timeSales:true,timeSalesKey:true})
      }
      if(arg === '/produce'){ // 生产
        dataUrl = [getDepartment({type:4}),getProduct()]
        dataName = [{name:'部门',value:'department',seat:0},{name:'产品',value:'product',seat:1}]
        commit('setTimeSelect',{timeSales:true,timeSalesKey:true})
      }

      if(arg === '/assets'){ // 资金
        commit('setTimeSelect',{timeSales:true,timeSalesKey:true})
      }

      if(arg === '/assets/stock'){ // 存货
        dataUrl = [getCategory()]
        dataName = [{name:'类别',value:'category',seat:1}]
        commit('setTimeSelect',{timeSales:true,timeSalesKey:true})
      }

      if(arg === '/assets/other'){ // 资金/其它
        commit('setTimeSelect',{timeSales:true,timeSalesKey:true})
      }

      if(arg === '/operate'){ // 经营
        dataUrl = [getTaxation()]
        // dataName = [{name:'税种',value:'taxation'}]
        commit('setTimeSelect',{timeSales:true,timeSalesKey:true})
      }

      if(arg === '/operate/expenses'){ // 经营
        dataUrl = [getExpense(),getDepartment({type:5})]
        dataName = [{name:'费用',value:'expense',seat:0},{name:'部门',value:'department',seat:1}]
        commit('setTimeSelect',{timeSales:true,timeSalesKey:true})
      }

      if(arg === '/duPontAnaly'){ // 杜邦分析
        commit('setTimeSelect',{timeSales:true,timeSalesKey:false})
      }

      if(arg === '/indexAnaly'){ // 指标分析
        commit('setTimeSelect',{timeSales:true,timeSalesKey:true})
      }

      dataUrl && dataUrl.map((item,index)=>{
        item.then((res) => {
          let list = handerOption(dataName[index].value,res.data.list||[])
            commit('setSelect',{
              value:dataName[index].value,
              title:dataName[index].name,
              seat:dataName[index].seat,
              list
            })
            commit('setTopSelect',{
              type:dataName[index].value,
              list
            })
        })
      })

    },
  }
}

export default app
