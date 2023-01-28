<template>
  <a-drawer
    title="角色信息"
    :maskClosable="false"
    width="650"
    placement="right"
    :closable="true"
    @close="close"
    :visible="roleInfoVisiable"
    class="boxStyle"
    style="height: calc(100% - 55px);overflow: auto;padding-bottom: 53px;">
    <p style="margin-top:20px"><a-icon type="smile" class="m-r-10" />角色名称：<span class="info-display">{{ roleInfoData.name }}</span></p>
    <p><a-icon type="crown" class="m-r-10" />角色编码：<span class="info-display">{{ roleInfoData.code }}</span></p>
    <p><a-icon type="sort-ascending" class="m-r-10" />角色排序：<span class="info-display">{{ roleInfoData.sort }}</span></p>
    <p><a-icon type="book" class="m-r-10" />角色描述：<span class="info-display">{{ roleInfoData.remark }}</span></p>
    <p><a-icon type="clock-circle" class="m-r-10" />创建时间：<span class="info-display">{{ roleInfoData.createTime }}</span></p>
    <p><a-icon type="clock-circle" class="m-r-10" />修改时间：<span class="info-display">{{ roleInfoData.updateTime? roleInfoData.updateTime : '暂未修改' }}</span></p>
    <p><a-icon type="trophy" class="m-r-10" />所拥有的权限：
      {{roleNames}}
    </p>
  </a-drawer>
</template>
<script>
import { functionTree } from '@/api/system/function'
import { getRoleFunctions, updateRole, getByRole } from '@/api/system/role'

export default {
  name: 'RoleInfo',
  props: {
    roleInfoVisiable: {
      require: true,
      type: Boolean,
      default: false
    },
    roleInfoData: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      key: +new Date(),
      loading: true,
      checkedKeys: [],
      menuTreeData: [],
      roleNames:[]
    }
  },
  created(){
    // this.queryParam.type = this.$route.query.id
  },
  methods: {
    close () {
      this.$emit('close')
      this.checkedKeys = []
    }
  },
  watch: {
    roleInfoVisiable () {
      if (this.roleInfoVisiable) {
        getByRole(this.roleInfoData.id).then(res => {
          let name = []
          if (res.code == 200) {
            res.data && res.data.map(item=> {
              name.push(item.name)
            })
          this.roleNames =  name.length > 0 ? name.toString() :'无权限'
          }
        })
      }
    }
  }
}
</script>
<style scoped  lang='less'>
span.info-display{
 margin-left: 15px;
}
.boxStyle{
  .anticon{
    font-size: 18px;
  }
  p{
    margin-bottom: 26px;
  }
}
.m-r-10{
  margin-right: 10px;
}
</style>
