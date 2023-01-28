<template>
  <div class="box-content" v-if="percentList.list">
    
      <div class="flex justify-between align-center" v-for="(item,index) in percentList.list" :key="index">
        <div class="flex-grow-0 progress-left">{{item.name}}</div>
        <div class="progress flex-grow-1">
          <div class="percent" :style="{'width':`${item.percent}%`}"></div>
        </div>
          <div class="flex-grow-0 progress-right text-right">{{item.money}}元</div>
      </div>
    <!-- <vue-seamless-scroll :data="percentList" class="seamless-warp" :class-option="classOption.option">
    </vue-seamless-scroll> -->

  </div>
</template>
<script>
  import vueSeamlessScroll from 'vue-seamless-scroll'

export default {
  props: {
      percentList: {
        type: [Object, Array],
        default: () => {
          return {}
        }
      }
    },
    data() {
      return {}
    },
    computed: {
      classOption () {
        return {
          option:{
            step: 0.2, // 数值越大速度滚动越快
            limitMoveNum: this.percentList.length, // 开始无缝滚动的数据量 this.dataList.length
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
}
</script>
<style lang="less" scoped>
// .seamless-warp{
//   height: calc(100% - 31px);
//   overflow: hidden;
// }
.box-table{
  border:1px solid #707070;
  text-align: center;
  overflow: hidden;
  line-height: 30px;
  .one{
    width: 10%;
  }
  .two{
    width: 15%;
  }
  .three{
    width: 25%;
  }
  .four{
    width: 25%;
  }
  .five{
    width: 25%;
  }
  
  .line-bottom:last-child{
    border-bottom: none;
  }

  .line-bottom:nth-child(2n){
    background:rgba(204,204,204, 0.5);
  }

}
.line-bottom {
    border-bottom: 1px solid var(--cardTitbg);
  }
  
.box-content {
    color: var(--startit);
    height: 91%;
    padding: 15px 26px 0;
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
