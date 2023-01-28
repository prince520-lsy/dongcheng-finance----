<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    :maskClosable="false"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭"
  >
    <a-spin :spinning="confirmLoading">
          <k-form-build
            :value="jsonData"
            ref="KFB"
            />
    </a-spin>
  </a-modal>
</template>

<script>

import { addDictData, putDictData } from '@/api/system/dict'
import { string } from '@/lib/k-form-design-mini.common'
const validatorCodeTimer = null

export default {
  name: 'JobModal',
  props:{
    type:{
      type:[String,Number],
      default:''
    }
  },
  data() {
    return {
      title: '操作',
      visible: false,
      model: {},
      id:null,
      jsonData:{"list":[{"type":"input","label":"名称","options":{"type":"text","width":"100%","defaultValue":"","placeholder":"请输入名称","clearable":false,"maxLength":null,"hidden":false,"disabled":false},"model":"name","key":"input_1615628583345","rules":[{"required":true,"message":"请输入名称"}]},{"type":"number","label":"排序值","options":{"width":"100%","defaultValue":null,"min":0,"max":null,"precision":null,"step":1,"hidden":false,"disabled":false,"placeholder":"请输入排序值"},"model":"sort","key":"number_1615628650899","rules":[{"required":true,"message":"主输入排序值"}]},{"type":"textarea","label":"描述","options":{"width":"100%","minRows":4,"maxRows":6,"maxLength":null,"defaultValue":"","clearable":false,"hidden":false,"disabled":false,"placeholder":"请输入描述"},"model":"val","key":"textarea_1615798063701","rules":[{"required":true,"message":"必填项"}]}],"config":{"layout":"horizontal","labelCol":{"xs":4,"sm":4,"md":4,"lg":4,"xl":4,"xxl":4},"wrapperCol":{"xs":18,"sm":18,"md":18,"lg":18,"xl":18,"xxl":18},"hideRequiredMark":false,"customStyle":""}},
      confirmLoading: false,
      isadd:true,
    }
  },
  methods: {
    add(id) {
      this.id = id
      this.visible = true
      this.isadd = true
      this.$nextTick(() => {
          let formParam = {
            type:parseInt(id)
          }
          this.$refs.KFB.setData(formParam)
        })
    },
    edit(record) {
      this.id = record.id
      this.visible = true
      this.isadd = false
      this.$nextTick(() => {
          this.$refs.KFB.setData(record)
      })
    },
    close() {
      this.$emit('close')
      this.visible = false
      this.$refs.KFB.reset()
    },
    handleOk() {
      // 通过函数获取数据
      let that = this
       this.$refs.KFB.getData().then(res => {
           
         // 获取数据成功
        let Action = [addDictData,putDictData]
        let index = that.isadd?0:1
        Action[index]({...res,id:that.id,type:this.type}).then(ret=>{
          if(ret.code==200){
             that.$message.success('操作成功')
             that.close()
            that.$emit('ok')
          }
        })
       })
         .catch(err => {
           console.log(err, '校验失败')
         }) 
    },
    handleCancel() {
      this.close()
    },
  },
}
</script>
