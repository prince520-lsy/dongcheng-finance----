<template>
  <div class="star-tit">
    <div class="flex">
      <div class="tit">{{ title }}</div>
      <img src="../../assets/tit/arrow.png" class="arrow" >
    </div>

    <a-dropdown v-if="selectList.length >0">
      <a-menu slot="overlay">
        <a-menu-item v-for="(item,index) in selectList" :key="item.id" @click="(e)=>selectChange(e,index)">
          {{ item.name }}
        </a-menu-item>
      </a-menu>
      <div class="flex">
        <img src="../../assets/tit/arrow-small-l.png" class="arrow-s" >
        <div class="select">{{curr?curr:selectList[0].name}}</div>
        <img src="../../assets/tit/arrow-small.png" class="arrow-s" >
      </div>
    </a-dropdown>

  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      type: {
        type: [String, Number],
        default: ''
      },
      selectList: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    data() {
      return {
        curr:null
      }
    },
    methods: {
      selectChange(e,index) {
        this.curr = this.selectList[index].name
          this.$emit('change', e, this.type)
        },
    }
  }
</script>

<style lang="less" scoped="scoped">
  .star-tit {
    height: 30px;
    font-family: Source Han Sans CN;
    font-weight: 800;
    color: var(--startit) !important;
    margin-bottom: 8px;
    display: flex;justify-content: space-between;
    align-items: center;
    background: url('../../assets/tit/border.png') left bottom repeat-x;
    .tit {
      height: 22px;
      line-height: 22px;
      font-size: 12px;
      padding: 0 10px;
      text-indent: 10px;
      background: url('../../assets/tit/bg.png') repeat;
      // transform: scale(0.5);
    }
    .arrow{
      height: 22px;width: auto;
    }
    .arrow-s{
      height: 22px;width: auto;
      }
    .select {
      padding:0 10px;
      line-height: 22px;
      font-size: 12px;
      background: url('../../assets/tit/bg.png') repeat;
      background-size: cover;
    }
  }
</style>
