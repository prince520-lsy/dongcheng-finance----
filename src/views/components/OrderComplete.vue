<template>
  <div class="box-content padding-lr20" v-if="oneList">

    <template v-if="isLoop">
      <vue-seamless-scroll :data="oneList.list" class="seamless-warp" :class-option="classOption.option">
        <div class="line-bottom flex justify-between margin-bottom10"  v-for="(item,index) in oneList.list[0]" :key="index">
          <div class="flex align-center padding-bottom5"><div class="list-tip"></div>{{oneList.header[index]}}</div>
          <div>{{item}}　/　{{unitList[index]}}</div>
        </div>
      </vue-seamless-scroll>
    </template>

    <template v-else>
      <div class="line-bottom flex justify-between margin-bottom10"  v-for="(item,index) in oneList.list[0]" :key="index">
        <div class="flex align-center padding-bottom5"><div class="list-tip"></div>{{oneList.header[index]}}</div>
        <div>{{item}}　/　{{unitList[index]}}</div>
      </div>
    </template>

  </div>
</template>

<script>
  import vueSeamlessScroll from 'vue-seamless-scroll'
export default {
    props: {
      oneList: {
        type: [Object, Array],
        default: () => {
          return null
        }
      },
      isLoop:{ //是否滚动
        type:Boolean,
        default:false
      },
      unitList: {
        type: [Object, Array],
        default: () => {
          return ['单','单','元','元','%',]
        }
      }
    },
  data () {
    return {
    }
  },
    computed: {
      classOption () {
        return {
          option:{
            step: 0.2, // 数值越大速度滚动越快
            limitMoveNum: this.oneList.list.length, // 开始无缝滚动的数据量 this.dataList.length
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
  mounted () {
  },
}
</script>

<style lang="less" scoped> 
.box-content{
  overflow-x: hidden;
  overflow-y: scroll;
  height: 100%;
}
 .line-bottom {
    border-bottom: 1px solid #5A6064;
  }
  .list-tip {
    width: 3px;
    height: 13px;
    margin-right: 4px;
    background: #5A6064;
  }
</style>
