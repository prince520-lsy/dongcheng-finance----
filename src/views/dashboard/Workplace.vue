<template>
  <div class="contanier">

    <div class="main">
      <img class="banner" src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3884414043,830642545&fm=26&gp=0.jpg" >


      <div class="flex">
        <router-link class="card" tag="div" to="/" v-if="menu.indexOf('数据大屏')!=-1">
          <img src="http://ax.xyduo.com/0bbbf9fd284ccb77/1.0/images/%E9%A6%96%E9%A1%B5/p8.png" alt="">
          <span>数据大屏</span>
        </router-link>
        <router-link class="card" tag="div" to="/monitor/mapcenter" v-if="menu.indexOf('监测中心')!=-1">
          <img src="http://ax.xyduo.com/0bbbf9fd284ccb77/1.0/images/%E9%A6%96%E9%A1%B5/p9.png" alt="">
          <span>监测中心</span>
        </router-link>
        <router-link class="card" tag="div" to="/diagnosis/expertDiagnosis" v-if="menu.indexOf('诊断中心')!=-1">
          <img src="http://ax.xyduo.com/0bbbf9fd284ccb77/1.0/images/%E9%A6%96%E9%A1%B5/p10.png" alt="">
          <span>诊断中心</span>
        </router-link>
        <router-link class="card" tag="div" to="/dataCenter/query" v-if="menu.indexOf('数据中心')!=-1">
          <img src="http://ax.xyduo.com/0bbbf9fd284ccb77/1.0/images/%E9%A6%96%E9%A1%B5/p11.png" alt="">
          <span>数据中心</span>
        </router-link>
        <router-link class="card" tag="div" to="/service/organization" v-if="menu.indexOf('维护中心')!=-1">
          <img src="http://ax.xyduo.com/0bbbf9fd284ccb77/1.0/images/%E9%A6%96%E9%A1%B5/p12.png" alt="">
          <span>维护中心</span>
        </router-link>
         <router-link class="card" tag="div" to="/configCenter/configDiagnosis" v-if="menu.indexOf('配置中心')!=-1">
          <img src="http://ax.xyduo.com/0bbbf9fd284ccb77/1.0/images/%E9%A6%96%E9%A1%B5/p13.png" alt="">
          <span>配置中心</span>
        </router-link>
         <router-link class="card" tag="div" to="/userManger" v-if="menu.indexOf('用户管理')!=-1">
          <img src="http://ax.xyduo.com/0bbbf9fd284ccb77/1.0/images/%E9%A6%96%E9%A1%B5/p14.png" alt="">
          <span>用户管理</span>
        </router-link>
      </div>



      <div class="flex" style="margin-top:20px">
        <div class="flex-sub">
           <a-card title="通知">
              <!-- <a slot="extra"  @click="toNotic">更多</a> -->

              <vue-seamless-scroll :data="list" class="seamless-warp" :class-option="classOption.option">
                <ul style="margin:0">
                  <li class="flex justify-between notic-item" v-for="(item,index) in list" :key="index" >
                    <div class="DataList_left">{{item.content}}</div>
                    <div class="DataList_left">{{item.createTime}}</div>
                  </li>
                </ul>
              </vue-seamless-scroll>



             
            </a-card>
        </div>
        <div class="flex-sub" style="margin-left:20px">
           <a-card title="告警通知">
            <!-- <a slot="extra" @click="toAlarm">更多</a> -->
              <vue-seamless-scroll :data="list2" class="seamless-warp" :class-option="classOption.option2">
                <ul style="margin:0">
                  <li class="flex justify-between  notic-item" v-for="(item,index) in list2" :key="index" >
                    <div class="DataList_left">{{item.notice}}</div>
                    <div class="DataList_left">{{(item.areaName||'--')+' '}}{{(item.tankName||'--')+' '}}{{item.alertTime}}</div>
                  </li>
                </ul>
              </vue-seamless-scroll>

            </a-card>
        </div>

      </div>


    </div>
    

    
  </div>
</template>

<script>
import vueSeamlessScroll from 'vue-seamless-scroll'
import {NoticeList,WarningList,HomeSelectCatalog} from '@/api/tank/dashboard'
export default {
  name: 'Workplace',

  data () {
    return {
      list:[],
			list2:[],
			menu:[]
    }
  },
  computed: {
    classOption () {
      return {
				option:{
					step: 0.2, // 数值越大速度滚动越快
					limitMoveNum: this.list.length, // 开始无缝滚动的数据量 this.dataList.length
					hoverStop: true, // 是否开启鼠标悬停stop
					direction: 1, // 0向下 1向上 2向左 3向右
					openWatch: true, // 开启数据实时监控刷新dom
					singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
					singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
					waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
				},
				option2:{
					step: 0.2, // 数值越大速度滚动越快
					limitMoveNum: this.list2.length, // 开始无缝滚动的数据量 this.dataList.length
					hoverStop: true, // 是否开启鼠标悬停stop
					direction: 1, // 0向下 1向上 2向左 3向右
					openWatch: true, // 开启数据实时监控刷新dom
					singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
					singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
					waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
				},
        
      }
    }
  },
  components: {    //组件
      vueSeamlessScroll
  },

  mounted () {
		this.getNoticeList()
		this.getWarningList()
		this.getMenuList()
  },
  methods: {
		// 获取通知列表
		getNoticeList(){
			NoticeList().then(res=>{
				if(res.code==200){
					this.list = res.data.records
				}
			})
		},
		// 获取警告列表
		getWarningList(){
			WarningList().then(res=>{
				if(res.code==200){
					this.list2 = res.data.records
				}
			})
		},
		// 获取首页目录列表
		getMenuList(){
			HomeSelectCatalog().then(res=>{
				if(res.code==200){
					this.menu= res.data.map(item=>item.name)
				}
			})
		},
    toNotic(){
      this.$router.push({path:'/userManger/noticeManger'})
    },
    toAlarm(){
      this.$router.push({path:'/alarm'})
     
    }

  }
}
</script>

<style lang="less" scoped>
 .contanier{
   min-height: 100vh;padding: 60px 0;box-sizing:border-box;
   display: flex;flex-direction: column;justify-content: center;width: 100vw;align-items: center;
   background: #f0f2f5 url(~@/assets/background.svg) no-repeat 50%; background-size: 100%;
 }
 .main{width: 1200px;}
 .banner{width: 100%;height: 300px;margin-bottom: 20px;}
 .card{width: 158px;height: 118px;border: 1px solid #E1E1E1;display: flex;flex-direction: column;justify-content: center;align-items: center;background: #fff;margin-right: 10px;
  img{width: 42px;height: 42px;margin-bottom: 10px;}
 }
.seamless-warp{
  height: 300px;overflow: hidden;
}
.notic-item{
  height: 30px;align-items: center;font-size: 14px;
}
</style>
