<template>
  <div class="box-content">
      <div class="box-table" v-if="tableList">
        <div class="flex justify-between title subRow line-bottom">
          <div v-for="(item,index) in tableList.header" :key="index">{{item}}</div>
        </div>
        
        <template v-if="isLoop">
          <vue-seamless-scroll :data="tableList.list" class="seamless-warp" :class-option="classOption.option">
            <div v-for="(item,index) in tableList.list" :key="index" class="flex justify-between subRow line-bottom">
              <div v-for="(a,b) in item" :key="b">{{a}}</div>
            </div>
          </vue-seamless-scroll>
        </template>

        <template v-else>
          <div v-for="(item,index) in tableList.list" :key="index" class="flex justify-between subRow line-bottom">
              <template v-if="isHighlight">
                <div v-for="(a,b) in item" :key="b" :class="isBurden(a)?'line-text':''">{{a}}</div>
              </template>
              <template v-else>
                <div v-for="(a,b) in item" :key="b" >{{a}}</div>
              </template>
          </div>
        </template>
      </div>
  </div>
</template>
<script>
 import vueSeamlessScroll from 'vue-seamless-scroll'
import { OptionTable } from '@/components/echarts/options.js'
export default {
  props: {
      tableList: {
        type: [Object, Array],
        default: OptionTable
      },
      isLoop:{ //是否滚动
        type:Boolean,
        default:false
      },
      isHighlight:{ //是否高亮，目前只有资产存货有
        type:Boolean,
        default:false
      }
    },
    data() {
      return {
        tableData:null
      }
    },
    computed: {
      classOption () {
        return {
          option:{
            step: 0.2, // 数值越大速度滚动越快
            limitMoveNum: this.tableList.list.length, // 开始无缝滚动的数据量 this.dataList.length
            hoverStop: true, // 是否开启鼠标悬停stop
            direction: 1, // 0向下 1向上 2向左 3向右
            openWatch: true, // 开启数据实时监控刷新dom
            singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
            singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
            waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
          }
        }
      }
    },
    components: {
      vueSeamlessScroll
    },
    methods: {
      // 值是否为负数
      isBurden(key){
        let value = false
        if(typeof key== 'number' && key < 0){
          value =  true
        }
        return value
      }
    }
}
</script>
<style lang="less" scoped>
.seamless-warp{
  height: calc(100% - 31px);
  overflow: hidden;
}
.box-table{
  border:1px solid #707070;
  text-align: center;
  overflow: hidden;
  line-height: 30px;
  font-size: 12px;
  .one{
    width: 30px;
    flex: 1;
  }
  
 .line-bottom {
    border-bottom: 1px solid var(--cardTitbg);
  }
  .line-bottom:last-child{
    border-bottom: none;
  }

  .line-bottom:nth-child(2n){
    background:rgba(204,204,204, 0.5);
  }

  .line-bottom-highlight {
    border-bottom: 1px solid var(--cardTitbg);
  }
  .line-bottom-highlight:last-child{
    border-bottom: none;
  }

  .line-bottom-highlight:nth-child(2n){
    color: rgb(68, 143, 255);
    background:rgba(68, 143, 255, 0.2);
    // background:rgba(204,204,204, 0.5);
  }
  .line-text{
    color: rgb(68, 143, 255);
  }

  .subRow{
    &>div{
      flex: 2;
    }
  }

}
  
.box-content {
    color: var(--startit);
    height: 91%;
    padding: 15px 18px 0;
    // background: rgba(255, 255, 255, 0.1);
    // border: 1px solid rgba(255, 255, 255, 0.3);
  }
  .progress {
    height: 16px;
    margin: 5px 0;

    .percent {
      height: 100%;
      border-radius: 8px;
      background: linear-gradient(90deg, #6269F2 0%, #444BD2 0%, #5B90FA 0%, #5AFFF9 100%);
    }
  }

  .list-tip {
    width: 3px;
    height: 13px;
    margin-right: 4px;
    background: var(--cardTitbg);
  }

   .progress-left {
    width: 60px;
  }

  .progress-right {
    width: 100px;
  }
</style>
