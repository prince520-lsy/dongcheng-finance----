<template>
  <div class="wrap" :style="styles">
    <div class="abs">
      <div  class="title">
         <slot name="title"></slot>
      </div>
      <div class="con">
        <slot></slot>
      </div>
    </div>

    <div class="l-t"></div>
    <div class="l-r"></div>
    <div class="l-b"></div>
    <div class="r-b"></div>
  </div>
</template>

<script>
export default {
  props: {
    height: { //固定宽高比
      type: Number,
      default: 50
    },
    isParentH:{ //跟随父容器高度
      type: Boolean,
      default: false
    }
  },
  computed:{
    styles(){
      if(this.isParentH){
        return {height:'100%'}
      }else{
        return {paddingTop:this.height+'%'}
      }
    }
  },
  data() {
    return {

    }
  },
}
</script>

<style lang="less" scoped>
 .wrap{
     width: 100%;
     min-width:100px;
     box-sizing: border-box;
     position: relative;
    //  overflow: hidden;
 }
 .title{height: 38px;}
 .abs{
   position: absolute;left: 0;top: 0;
   width: 100%;height: 100%;
 }
 .con{
   height: calc(100% - 38px);
 }

  .wrap:hover .l-t {
    display: block;
  }
  .wrap:hover .l-r {
    display: block;
  }
  .wrap:hover .l-b {
    display: block;
  }
  .wrap:hover .r-b {
    display: block;
  }

 .l-t,.l-r,.l-b,.r-b{
   border-color: #D2D2D2;position: absolute;width: 10px;height: 10px;z-index: 99;display: none;
 }
 .l-t{
   left: 0;top: 0;
   border-top: 1px solid;
   border-left: 1px solid;
 }
 .l-r{
    right: 0;top: 0;
    border-top: 1px solid;
    border-right: 1px solid;
 }
 .l-b{
    left: 0;bottom: 0;
    border-left: 1px solid;
    border-bottom: 1px solid;
 }
 .r-b{
    right: 0;bottom: 0;
    border-right: 1px solid;
    border-bottom: 1px solid;
 }

</style>
